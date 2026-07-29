import scorecard from '../data/creditRiskScorecard.json';

const familiesById = Object.fromEntries(scorecard.families.map((family) => [family.id, family]));

function inputError(ErrorType, field, message) {
  const error = new ErrorType(message);
  error.field = field;
  return error;
}

function optionFor(family, value) {
  if (value === null || value === undefined || value === '') {
    return family.missingCategory || null;
  }

  if (family.options) {
    const option = family.options.find(([category, , , values = [category]]) => values.some((candidate) => String(candidate) === String(value)));
    return option ? [option[0], option[1], option[2]] : null;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  const range = family.ranges.find(([, maximum]) => maximum === null || number <= maximum);
  return range ? [range[0], range[2], range[3]] : null;
}

function validationError(family, value) {
  if (value === null || value === undefined || value === '') {
    return family.missingCategory ? null : 'Select a value.';
  }

  if (!family.options) {
    const number = Number(value);
    if (!Number.isFinite(number) || (family.minimum !== undefined && number < family.minimum)) {
      return 'Enter a non-negative number.';
    }
    if (family.integer && !Number.isInteger(number)) return 'Enter a whole number.';
  }

  return optionFor(family, value) ? null : 'Enter a supported value.';
}

function categoryOptions(family) {
  const options = family.options
    ? family.options.map(([category, coefficient, points]) => [category, coefficient, points])
    : family.ranges.map(([category, , coefficient, points]) => [category, coefficient, points]);

  if (family.missingCategory && !options.some(([category]) => category === family.missingCategory[0])) {
    options.push(family.missingCategory);
  }
  return options;
}

function categoryId(family, category) {
  return `${family.id}:${category}`;
}

export function mapInputToCategory(familyId, value) {
  const family = familiesById[familyId];
  if (!family) return null;
  const option = optionFor(family, value);
  return option ? option[0] : null;
}

export function mapInputs(config, rawInputs) {
  if (!rawInputs || typeof rawInputs !== 'object' || Array.isArray(rawInputs)) {
    throw new TypeError('Inputs must be an object.');
  }

  return config.families.map((family) => {
    if (!Object.prototype.hasOwnProperty.call(rawInputs, family.id)) {
      throw inputError(TypeError, family.id, 'Input is required.');
    }

    const value = rawInputs[family.id];
    const error = validationError(family, value);
    if (error) {
      const ErrorType = value === null || value === undefined || value === '' || family.options ? TypeError : RangeError;
      throw inputError(ErrorType, family.id, error);
    }

    return categoryId(family, optionFor(family, value)[0]);
  });
}

export function scoreMappedInputs(config, mappedInputs) {
  if (!Array.isArray(mappedInputs) || mappedInputs.length !== config.families.length) {
    throw new TypeError(`Expected ${config.families.length} mapped categories.`);
  }

  const catalog = new Map();
  config.families.forEach((family) => {
    categoryOptions(family).forEach(([category, coefficient, points]) => {
      catalog.set(categoryId(family, category), { family: family.id, category, coefficient, points });
    });
  });

  const selected = new Map();
  mappedInputs.forEach((id) => {
    const option = catalog.get(id);
    if (!option) throw new TypeError(`Unknown mapped category: ${id}`);
    if (selected.has(option.family)) throw new TypeError(`Duplicate mapped family: ${option.family}`);
    selected.set(option.family, option);
  });

  const mappedCategories = config.families.map((family) => {
    const option = selected.get(family.id);
    if (!option) throw new TypeError(`Missing mapped family: ${family.id}`);
    return categoryId(family, option.category);
  });
  const contributions = [...selected.values()]
    .map((option) => ({
      ...option,
      direction: option.points > 0 ? 'raised' : option.points < 0 ? 'lowered' : 'unchanged',
    }))
    .sort((left, right) => Math.abs(right.points) - Math.abs(left.points));

  const logOdds = config.intercept.coefficient + contributions.reduce((sum, item) => sum + item.coefficient, 0);
  const pGood = 1 / (1 + Math.exp(-logOdds));
  const score = config.intercept.points + contributions.reduce((sum, item) => sum + item.points, 0);
  if (score < config.scoreRange.minimum || score > config.scoreRange.maximum) {
    throw new RangeError('Score falls outside the published range.');
  }

  return {
    artifactVersion: config.artifactVersion,
    logOdds,
    pGood,
    pd: 1 - pGood,
    score,
    relativeBand: config.relativeBands.find(([maximum]) => score <= maximum)[1],
    mappedCategories,
    contributions,
    strongestContributions: contributions.slice(0, 3),
  };
}

export function scoreApplicant(config, rawInputs) {
  return scoreMappedInputs(config, mapInputs(config, rawInputs));
}

export function scoreCreditRisk(inputs) {
  try {
    return { ...scoreApplicant(scorecard, inputs), errors: {} };
  } catch (error) {
    return { errors: { [error.field || '_form']: error.message } };
  }
}

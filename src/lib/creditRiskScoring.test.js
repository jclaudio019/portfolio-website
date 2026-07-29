import scorecard from '../data/creditRiskScorecard.json';
import {
  mapInputs,
  mapInputToCategory,
  scoreApplicant,
  scoreCreditRisk,
  scoreMappedInputs,
} from './creditRiskScoring';

const inputs = {
  grade: 'B',
  interestRate: 12.025,
  annualIncome: 85000,
  debtToIncome: 16.1,
  loanTerm: 36,
  employmentLength: 5,
  homeOwnership: 'MORTGAGE',
  inquiriesLast6Months: 2,
  state: 'NY',
  verificationStatus: 'Not Verified',
  purpose: 'credit_card',
  initialListStatus: 'w',
  monthsSinceIssue: 52,
  monthsSinceEarliestCreditLine: 352,
  accountsCurrentlyDelinquent: 0,
  monthsSinceLastDelinquency: null,
  monthsSinceLastPublicRecord: null,
};

test.each([
  ['interestRate', 9.548, '<9.548', 9.5481, '9.548-12.025'],
  ['annualIncome', 20000, '<=20K', 20000.01, '20K-30K'],
  ['debtToIncome', 1.4, '<=1.4', 1.4001, '1.4-3.5'],
  ['employmentLength', 1, '1', 2, '2-4'],
  ['inquiriesLast6Months', 2, '1-2', 3, '3-6'],
  ['monthsSinceIssue', 37, '<38', 38, '38-39'],
  ['monthsSinceEarliestCreditLine', 139, 'Missing_or_<140', 140, '140-164'],
  ['accountsCurrentlyDelinquent', 0, '0', 1, '>=1'],
  ['monthsSinceLastDelinquency', 3, '0-3', 4, '4-30'],
  ['monthsSinceLastPublicRecord', 2, '0-2', 3, '3-20'],
])('maps the %s boundary to exactly one adjacent category', (family, lower, lowerCategory, upper, upperCategory) => {
  expect(mapInputToCategory(family, lower)).toBe(lowerCategory);
  expect(mapInputToCategory(family, upper)).toBe(upperCategory);
});

test('maps documented missing values and native select strings', () => {
  expect(mapInputToCategory('monthsSinceEarliestCreditLine', null)).toBe('Missing_or_<140');
  expect(mapInputToCategory('monthsSinceLastDelinquency', null)).toBe('Missing');
  expect(mapInputToCategory('state', 'CA')).toBe('CA');
  expect(mapInputToCategory('loanTerm', '36')).toBe('36');
});

test('scores every feature family as P(good), PD, and illustrative points', () => {
  const mapped = mapInputs(scorecard, inputs);
  const result = scoreApplicant(scorecard, inputs);

  expect(mapped).toHaveLength(17);
  expect(scoreMappedInputs(scorecard, mapped)).toEqual(result);
  expect(result.artifactVersion).toBe('1.0.0');
  expect(result.logOdds).toBeCloseTo(2.9930489641289, 10);
  expect(result.pGood).toBeCloseTo(0.9522591125179006, 10);
  expect(result.pd).toBeCloseTo(0.04774088748209937, 10);
  expect(result.score).toBe(652);
  expect(result.relativeBand).toBe('Lower relative historical risk');
  expect(result.mappedCategories).toEqual(mapped);
  expect(result.contributions).toHaveLength(17);
  expect(result.contributions[0]).toMatchObject({
    family: 'grade',
    category: 'B',
    coefficient: 0.898446449401,
    points: 65,
    direction: 'raised',
  });
  expect(result.strongestContributions.map(({ family }) => family)).toEqual([
    'grade',
    'inquiriesLast6Months',
    'interestRate',
  ]);
});

test('reaches the published theoretical minimum and maximum profiles', () => {
  const minimum = {
    ...inputs,
    grade: 'G', interestRate: 21, annualIncome: 25000, debtToIncome: 36,
    loanTerm: 60, employmentLength: 0, homeOwnership: 'RENT', inquiriesLast6Months: 7,
    state: 'FL', verificationStatus: 'Source Verified', purpose: 'educational',
    initialListStatus: 'f', monthsSinceIssue: 65, monthsSinceEarliestCreditLine: 100,
    accountsCurrentlyDelinquent: 0, monthsSinceLastDelinquency: 0, monthsSinceLastPublicRecord: 0,
  };
  const maximum = {
    ...inputs,
    grade: 'A', interestRate: 9, annualIncome: 130000, debtToIncome: 2,
    loanTerm: 36, employmentLength: 2, homeOwnership: 'MORTGAGE', inquiriesLast6Months: 0,
    state: 'WV', verificationStatus: 'Not Verified', purpose: 'credit_card',
    initialListStatus: 'w', monthsSinceIssue: 20, monthsSinceEarliestCreditLine: 400,
    accountsCurrentlyDelinquent: 1, monthsSinceLastDelinquency: 31, monthsSinceLastPublicRecord: 40,
  };

  expect(scoreApplicant(scorecard, minimum).score).toBe(300);
  expect(scoreApplicant(scorecard, maximum).score).toBe(850);
});

test('rejects incomplete, missing, unsupported, duplicate, and unknown inputs', () => {
  const incomplete = { ...inputs };
  delete incomplete.grade;
  const missingKey = { ...inputs };
  delete missingKey.monthsSinceLastDelinquency;

  expect(() => mapInputs(scorecard, incomplete)).toThrow(TypeError);
  expect(() => mapInputs(scorecard, missingKey)).toThrow(TypeError);
  expect(() => mapInputs(scorecard, { ...inputs, grade: 'Z' })).toThrow(TypeError);
  expect(mapInputs(scorecard, { ...inputs, monthsSinceLastDelinquency: null })).toContain('monthsSinceLastDelinquency:Missing');
  expect(() => scoreMappedInputs(scorecard, Array(17).fill('grade:B'))).toThrow(TypeError);
  expect(() => scoreMappedInputs(scorecard, [...mapInputs(scorecard, inputs).slice(0, 16), 'grade:Z'])).toThrow(TypeError);
});

test('keeps UI-facing validation errors backward compatible', () => {
  expect(scoreCreditRisk({ ...inputs, interestRate: -0.01 }).errors).toEqual({
    interestRate: 'Enter a non-negative number.',
  });
});

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 2) {
  stop("Usage: Rscript scripts/generate_time_series_charts.R <final-project-directory> <output-json>")
}

final_project_dir <- normalizePath(args[[1]], mustWork = TRUE)
output_json <- args[[2]]

library(astsa)
library(jsonlite)
library(readxl)

brownian_bridge <- function(n = 500) {
  t <- seq(0, 1, length.out = n + 1)
  increments <- rnorm(n, mean = 0, sd = sqrt(diff(t)[1]))
  walk <- c(0, cumsum(increments))
  bridge <- walk - t * walk[length(walk)]
  bridge[c(1, length(bridge))] <- 0
  list(t = t, bridge = bridge)
}

set.seed(520)
bridge_x <- brownian_bridge()
bridge_y <- brownian_bridge()
bridge <- data.frame(
  step = 0:500,
  t = bridge_x$t,
  x = bridge_x$bridge,
  y = bridge_y$bridge
)

data(UnempRate)
unemp_fit <- arima(UnempRate, order = c(1, 1, 1))
unemp_pred <- predict(unemp_fit, n.ahead = 24)
unemp_time <- time(UnempRate)
keep <- unemp_time >= 2000
unemp_future_time <- as.numeric(tail(unemp_time, 1)) + seq_len(24) / 12

month_label <- function(value) {
  year <- floor(value)
  month <- round((value - year) * 12) + 1
  sprintf("%04d-%02d", year, month)
}

unemp_rows <- data.frame(
  index = seq_len(sum(keep) + 24),
  label = c(vapply(unemp_time[keep], month_label, character(1)), vapply(unemp_future_time, month_label, character(1))),
  observed = c(as.numeric(UnempRate[keep]), rep(NA_real_, 24)),
  forecast = c(rep(NA_real_, sum(keep)), as.numeric(unemp_pred$pred)),
  lower = c(rep(NA_real_, sum(keep)), as.numeric(unemp_pred$pred - 1.96 * unemp_pred$se)),
  upper = c(rep(NA_real_, sum(keep)), as.numeric(unemp_pred$pred + 1.96 * unemp_pred$se))
)

sp_values <- ts(read_excel(file.path(final_project_dir, "sp_m.xls"))[[1]], frequency = 12)
sp_fit <- arima(sp_values, order = c(1, 1, 1))
sp_pred <- predict(sp_fit, n.ahead = 24)
sp_rows <- data.frame(
  index = seq_len(length(sp_values) + 24),
  label = as.character(seq_len(length(sp_values) + 24)),
  observed = c(as.numeric(sp_values), rep(NA_real_, 24)),
  forecast = c(rep(NA_real_, length(sp_values)), as.numeric(sp_pred$pred)),
  lower = c(rep(NA_real_, length(sp_values)), as.numeric(sp_pred$pred - 1.96 * sp_pred$se)),
  upper = c(rep(NA_real_, length(sp_values)), as.numeric(sp_pred$pred + 1.96 * sp_pred$se))
)

payload <- list(
  bridge = bridge,
  forecasts = list(
    unemployment = list(
      title = "U.S. Unemployment",
      xLabel = "Month",
      yLabel = "Unemployment rate",
      boundary = sum(keep),
      rows = unemp_rows
    ),
    sp500 = list(
      title = "S&P 500",
      xLabel = "Monthly observation",
      yLabel = "Index value",
      boundary = length(sp_values),
      rows = sp_rows
    )
  )
)

write_json(payload, output_json, auto_unbox = TRUE, digits = 6, na = "null")

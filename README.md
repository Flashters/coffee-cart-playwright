# Coffee Cart Playwright Framework
- `src/pages`: Page Objects (all locators live here, never in tests)
- `src/fixtures`: setup/teardown and state (fresh context per test)
- `src/data`: test data, kept separate from test logic
- `tests`: specs, readable steps only

## Run
npm ci; npx playwright install chromium
npx playwright test            # headless
npx playwright test --ui       # debug mode
npx playwright show-report

## Contributing rules
1. No `waitForTimeout` or sleeps; use web-first `expect` assertions.
2. Prefer getByRole / getByLabel / getByTestId; never CSS chains or XPath.
3. New page = new class in `src/pages`; new data = `src/data`.
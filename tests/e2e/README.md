# End-to-End Tests for mui-flexy

This directory contains comprehensive Playwright end-to-end tests for the mui-flexy project, testing all three demo versions (MUI v5, v6, and v7).

## Test Structure

### Test Files

- `demo-base.ts` - Base page object model and shared test factory
- `demo-v5.spec.ts` - MUI v5 specific tests
- `demo-v6.spec.ts` - MUI v6 specific tests
- `demo-v7.spec.ts` - MUI v7 specific tests
- `demo-comparison.spec.ts` - Cross-version comparison tests

### Test Coverage

- **Functional Tests**: Demo loading, FlexBox rendering, responsive design
- **Visual Tests**: Full-page screenshots, responsive layouts, cross-browser compatibility
- **Performance Tests**: Page load times, DOM metrics, paint timing
- **Accessibility Tests**: ARIA compliance, keyboard navigation, screen reader support
- **Cross-Version Tests**: Consistency across MUI versions

## Running Tests

### Prerequisites

```bash
# Install dependencies
yarn install

# Install Playwright browsers
yarn test:e2e:install
```

### Test Commands

```bash
# Run all tests
yarn test:e2e

# Run tests with UI mode (interactive)
yarn test:e2e:ui

# Run tests in headed mode (see browser)
yarn test:e2e:headed

# Debug tests
yarn test:e2e:debug

# View test report
yarn test:e2e:report

# List all tests
npx playwright test --list
```

### Running Specific Tests

```bash
# Run only v5 tests
npx playwright test demo-v5

# Run only comparison tests
npx playwright test demo-comparison

# Run tests for specific browser
npx playwright test --project=chromium
```

## Configuration

The tests are configured in `playwright.config.ts` with:

- **Multi-browser support**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Automatic demo server startup**: All 3 versions (ports 3005, 3006, 3007)
- **Screenshots and videos**: Captured on failure
- **Test reports**: HTML, JSON, and list formats

## Test Results

Test results are stored in:

- `test-results/` - Screenshots, videos, traces
- `playwright-report/` - HTML test report
- `test-results/results.json` - JSON test results

## CI/CD Integration

The tests include a GitHub Actions workflow (`.github/workflows/e2e-tests.yml`) that:

- Runs on PR and push to main
- Tests across multiple OS (Ubuntu, Windows, macOS)
- Uploads test results and screenshots as artifacts
- Caches dependencies for faster runs

## Current Test Status

✅ **205 total tests** across 5 browsers

- Cross-Version Demo Comparison: 7 tests × 5 browsers = 35 tests
- Demo v5: 10 tests × 5 browsers = 50 tests
- Demo v6: 12 tests × 5 browsers = 60 tests
- Demo v7: 12 tests × 5 browsers = 60 tests

## Troubleshooting

### Common Issues

1. **Demo servers not starting**: Ensure all demo dependencies are installed
2. **Browser not found**: Run `yarn test:e2e:install`
3. **Port conflicts**: Check that ports 3005, 3006, 3007 are available
4. **Timeout errors**: Increase timeout in `playwright.config.ts` if needed

### Debug Mode

Use `yarn test:e2e:debug` to:

- Step through tests interactively
- Inspect page elements
- View network requests
- Debug failing assertions

## Adding New Tests

### For Version-Specific Features

Add tests to the appropriate `demo-v*.spec.ts` file:

```typescript
test("should test new feature", async () => {
  // Test implementation
});
```

### For Cross-Version Features

Add tests to `demo-comparison.spec.ts`:

```typescript
test("should work consistently across versions", async ({ browser }) => {
  // Test all versions
});
```

### Using the Base Page Object

```typescript
import { DemoBasePage } from "./demo-base";

const demoPage = new DemoBasePage(page, "5", 3005);
await demoPage.goto();
await demoPage.waitForLoad();
```

## Performance Monitoring

The tests include performance monitoring that tracks:

- Page load times
- DOM element counts
- Paint timing metrics
- Bundle size impact

Performance results are logged and can be used to detect regressions across versions.

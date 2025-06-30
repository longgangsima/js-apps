# Trading App Unit Tests

This project includes comprehensive unit tests for the trading application functionality.

## Test Files Created

1. **`app.test.js`** - Jest-based unit tests
2. **`package.json`** - Node.js project configuration with Jest
3. **`jest.setup.js`** - Jest configuration and mocks
4. **`test-runner.html`** - Browser-based test runner

## Running Tests

### Option 1: Node.js with Jest (Recommended)

1. Install dependencies:
```bash
npm install
```

2. Run all tests:
```bash
npm test
```

3. Run tests in watch mode:
```bash
npm run test:watch
```

4. Run tests with coverage report:
```bash
npm run test:coverage
```

### Option 2: Browser-based Testing

1. Open `test-runner.html` in your browser
2. Tests will run automatically
3. Click "Run All Tests" to re-run

## Test Coverage

The test suite covers:

### Core Functions
- ✅ `generateRandomOrder()` - Random order generation
- ✅ `postOrder()` - API simulation
- ✅ Order data management
- ✅ DOM element creation
- ✅ Number formatting

### Test Categories

#### **Unit Tests**
- Function input/output validation
- Data type checking
- Range validation
- Error handling

#### **Integration Tests**
- Complete order flow
- Data consistency
- API interaction

#### **Performance Tests**
- Large dataset handling
- Execution timing

#### **Edge Cases**
- Empty data handling
- Error scenarios
- Boundary values

## Test Examples

### Basic Function Test
```javascript
test('should generate order with correct structure', () => {
  const order = generateRandomOrder();
  
  expect(Array.isArray(order)).toBe(true);
  expect(order).toHaveLength(2);
  expect(typeof order[0]).toBe('number'); // quantity
  expect(typeof order[1]).toBe('number'); // price
});
```

### Range Validation Test
```javascript
test('should generate quantity between 0.1 and 10.1', () => {
  for (let i = 0; i < 100; i++) {
    const [quantity] = generateRandomOrder();
    expect(quantity).toBeGreaterThanOrEqual(0.1);
    expect(quantity).toBeLessThanOrEqual(10.1);
  }
});
```

### Async API Test
```javascript
test('should return success for valid order', async () => {
  const orderType = 'buy';
  const orderData = { quantity: 5.5, price: 100.25 };
  
  const result = await postOrder(orderType, orderData);
  
  expect(result.success).toBe(true);
  expect(result.data).toEqual(orderData);
});
```

## Coverage Goals

- **Lines**: 80%+
- **Functions**: 80%+
- **Branches**: 80%+
- **Statements**: 80%+

## Mock Setup

The tests include mocks for:
- DOM elements (`document`, `createElement`)
- Browser APIs (`fetch`, `setTimeout`)
- Console methods (`console.log`, `console.error`)
- Local storage
- Math.random (for predictable tests)

## Best Practices Demonstrated

1. **Isolated Tests** - Each test is independent
2. **Mocking** - External dependencies are mocked
3. **Edge Cases** - Testing boundary conditions
4. **Async Testing** - Proper handling of promises
5. **Performance** - Testing with large datasets
6. **Error Handling** - Testing failure scenarios

## Adding New Tests

To add new tests, follow this pattern:

```javascript
describe('New Feature', () => {
  test('should do something specific', () => {
    // Arrange
    const input = setupTestData();
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

## Continuous Integration

These tests can be integrated with CI/CD pipelines:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

// Jest setup file
// This file runs before each test file
import { jest, afterEach, beforeEach } from '@jest/globals';

// Mock console methods to avoid noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({
      buy: [[1.5, 100], [2.0, 95]],
      sell: [[1.0, 105], [3.0, 110]]
    }),
  })
);

// Mock timers for setTimeout/setInterval
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => store[key] = value.toString()),
    removeItem: jest.fn(key => delete store[key]),
    clear: jest.fn(() => store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

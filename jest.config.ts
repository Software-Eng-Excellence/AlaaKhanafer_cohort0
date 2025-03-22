import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',                    // Specifies that we are using ts-jest for TypeScript
  testEnvironment: 'node',              // Specifies the test environment (e.g., jsdom or node)
  roots: ['<rootDir>/tests'],                 // Specifies the root directory for Jest to look for test files
  testMatch: ['**/*.test.ts'],
  verbose: true,                        // Enables verbose output during testing
  collectCoverageFrom: ['src/**/*.ts'], // Specifies the files to collect coverage from
  collectCoverage: true,                // Enables code coverage collection
  coverageDirectory: 'coverage',        // Specifies the directory to output coverage files
  coverageThreshold: {                  // Specifies the code coverage thresholds
    global: { 
      functions: 85, 
      statements: 75 
    }
  },
};
export default config;
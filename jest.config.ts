import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'src/main.ts', // Exclude main.ts (app bootstrap)
    'src/.*\\.module\\.ts$', // Ignore all .module.ts files
    'src/.*/dto/.*\\.ts$', // Ignore all DTOs inside any subfolder
    'src/.*/entities/.*\\.ts$', // Ignore all entity files inside any subfolder
    'test/', // Exclude test folder
    'src/exception-filters/', // Exclude exception filters
  ],

  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;

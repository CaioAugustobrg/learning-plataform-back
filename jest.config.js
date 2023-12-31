module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
  testMatch: [
    '**/*.spec.js',
    '**/*.spec.ts'
  ]
}

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  clearMocks: true,
  silent: true,
  modulePathIgnorePatterns: ['<rootDir>/build'],
  setupFilesAfterEnv: ['<rootDir>/prisma/singleton.ts']
}

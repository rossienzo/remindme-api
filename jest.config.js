module.exports = {
    roots: ['<rootDir>/__tests__'],
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testPathIgnorePatterns: [ '/node_modules/', '/dist/', './__tests__/mock-connection.ts' ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/infra/db/**/migrations/*.ts',
        '!<rootDir>/src/infra/db/**/seeds/*.ts',
    ],
    preset: 'ts-jest',
    verbose: true,
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}
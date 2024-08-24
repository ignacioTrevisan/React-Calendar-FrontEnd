module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.cjs'],
    transformIgnorePatterns: [],

    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/test/mocks/styleMock.js',
    },
}
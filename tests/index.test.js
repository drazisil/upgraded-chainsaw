const upgradedChainsaw = require('../src/index')

test('that hello() returns "Hello, world"', () => {
  expect(upgradedChainsaw.hello()).toBe('Hello, world')
})

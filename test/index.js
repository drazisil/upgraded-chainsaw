import test from 'ava'
const upgradedChainsaw = require('../src/index')

test('foo', t => {
  t.is(upgradedChainsaw.hello(), 'Hello, world')
})

test('bar', async t => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
})

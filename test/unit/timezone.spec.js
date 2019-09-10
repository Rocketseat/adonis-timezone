const test = require('japa')
const Timezone = require('../../src/Timezone')

test.group('Timezone', (group) => {
  let timezone

  group.beforeEach(() => {
    const asyncHooks = { createHook: () => ({ enable: () => {} }) }
    timezone = new Timezone(asyncHooks)
  })

  test('should current context is empty', (assert) => {
    assert.deepEqual(timezone.current, {})
  })

  test('should change timezone value', (assert) => {
    timezone.activate('America/Sao_Paulo')

    assert.deepEqual(timezone.current, {
      activate: 'America/Sao_Paulo'
    })
  })

  test('should get timezone value', (assert) => {
    timezone.current = { activate: 'America/Sao_Paulo' }

    assert.equal(timezone.timezone(), 'America/Sao_Paulo')
  })
})

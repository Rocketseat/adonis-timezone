
const test = require('japa')
const Ioc = require('@adonisjs/fold/src/Ioc')
const Registrar = require('@adonisjs/fold/src/Registrar')
const { join } = require('path')

test.group('TimezoneProvider', (group) => {
  let ioc, registrar

  group.beforeEach(() => {
    ioc = new Ioc()
    registrar = new Registrar(ioc)
    registrar.providers([
      join(__dirname, '..', '..', 'providers', 'TimezoneProvider')
    ])

    registrar.register()
  })

  test('should save timezone in context', async (assert) => {
    assert.plan(2)
    const middleware = ioc.use('Timezone/Middleware')

    await Promise.all([
      middleware.handle({}, async () => {
        ioc.use('Timezone').activate('America/Sao_Paulo')
        await new Promise(resolve => setImmediate(resolve))
        assert.equal(ioc.use('Timezone').timezone(), 'America/Sao_Paulo')
      }),
      middleware.handle({}, async () => {
        assert.equal(ioc.use('Timezone').timezone(), 'America/Sao_Paulo')
      })
    ])
  })

  test('should get trait instance', async (assert) => {
    assert.plan(1)

    const Trait = ioc.use('Timezone/Trait')

    assert.instanceOf(Trait, require('../../src/Trait'))
  })

  test('should register global middleware on boot', async (assert) => {
    assert.plan(1)

    ioc.fake('Server', () => {
      return {
        registerGlobal (namespaces) {
          assert.deepEqual(namespaces, ['Timezone/Middleware'])
        }
      }
    })

    ioc.fake('Adonis/Src/HttpContext', () => {
      return {
        getter (name, callback) {

        }
      }
    })

    await registrar.boot()
  })

  test('should register timezone in context', async (assert) => {
    assert.plan(2)

    ioc.fake('Server', () => {
      return {
        registerGlobal (namespaces) {
        }
      }
    })

    let caller

    ioc.fake('Adonis/Src/HttpContext', () => {
      return {
        getter (name, callback) {
          caller = callback
        }
      }
    })

    await registrar.boot()

    caller = caller()

    caller.activate('America/Sao_Paulo')

    assert.equal(ioc.use('Timezone').timezone(), 'America/Sao_Paulo')

    ioc.use('Timezone').activate('Europe/Berlin')

    assert.equal(caller.timezone(), 'Europe/Berlin')
  })
})

const test = require('japa')
const Trait = require('../../src/Trait')

const moment = require('moment')

test.group('Trait', (group) => {
  let trait

  group.beforeEach(() => {
    trait = new Trait({
      timezone () {
        return 'Europe/Berlin'
      }
    })
  })

  test('should override model static methods', (assert) => {
    assert.plan(1)
    class Model {
      static castDates (field, value) {
        throw new Error()
      }
    }

    class User extends Model {}

    trait.register(User)

    const date = moment('2018-09-01 16:01:36')

    const result = User.castDates('test', date)

    assert.equal(result, '2018-09-01 21:01:36')
  })

  test('should use a different format than specific', (assert) => {
    assert.plan(1)
    class Model {
      static castDates (field, value) {
        throw new Error()
      }
    }

    class User extends Model {}

    trait.register(User)

    const date = moment('2018-09-01 16:01:36')

    const result = User.timezoneFormat(date, 'YYYY-MM-DD')

    assert.equal(result, '2018-09-01')
  })

  test('should\'t anything happens when timezone isn\'t provided', (assert) => {
    assert.plan(1)
    class Model {
      static castDates (field, value) {
        throw new Error()
      }
    }

    class User extends Model {}

    console.log(trait)
    trait.Timezone.timezone = function overrideTimezone () {
      return null
    }

    trait.register(User)

    const date = moment('2018-09-01 16:01:36')

    const result = User.castDates('test', date)

    assert.equal(result, '2018-09-01 16:01:36')
  })
})

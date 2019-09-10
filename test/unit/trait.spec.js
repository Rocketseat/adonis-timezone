const test = require('japa')
const Trait = require('../../src/Trait')

test.group('Trait', (group) => {
  let trait

  group.beforeEach(() => {
    trait = new Trait({
      timezone () {
        return 'America/Sao_Paulo'
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

    const result = User.castDates('test', {
      utc () {
        return {
          format () {
            return new Date('2018-09-01Z16:01:36.386Z')
          }
        }
      }
    })

    assert.equal(result, '2018-09-01 13:01:36')
  })
})

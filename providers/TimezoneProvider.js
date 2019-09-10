const { ServiceProvider } = require('@adonisjs/fold')

class TimezoneProvider extends ServiceProvider {
  _registerTimezone () {
    this.app.singleton('Rocketseat/Timezone', () => {
      const Timezone = require('../src/Timezone')
      const asyncHooks = require('async_hooks')

      return new Timezone(asyncHooks)
    })

    this.app.alias('Rocketseat/Timezone', 'Timezone')
  }

  _registerMiddleware () {
    this.app.singleton('Rocketseat/Timezone/Middleware', () => {
      const Middleware = require('../src/Middleware')

      const Timezone = this.app.use('Rocketseat/Timezone')
      return new Middleware(Timezone)
    })

    this.app.alias('Rocketseat/Timezone/Middleware', 'Timezone/Middleware')
  }

  _registerTrait () {
    this.app.bind('Rocketseat/Trait/Timezone', () => {
      const Timezone = this.app.use('Rocketseat/Timezone')
      const Trait = require('../src/Trait')

      return new Trait(Timezone)
    })

    this.app.alias('Rocketseat/Trait/Timezone', 'Timezone/Trait')
  }

  register () {
    this._registerTimezone()
    this._registerMiddleware()
    this._registerTrait()
  }

  boot () {
    this.app.use('Server').registerGlobal(['Timezone/Middleware'])

    const Timezone = this.app.use('Rocketseat/Timezone')

    const Context = this.app.use('Adonis/Src/HttpContext')
    Context.getter('timezone', function () {
      return {
        activate (timezone) {
          Timezone.activate(timezone)
        },
        timezone () {
          return Timezone.timezone()
        }
      }
    })
  }
}

module.exports = TimezoneProvider

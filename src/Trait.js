const date = require('date-fns-tz')
const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss'

class Trait {
  constructor (Timezone) {
    this.Timezone = Timezone
  }

  register (Model) {
    const Timezone = this.Timezone
    function timezoneFormat (value, format = DATE_FORMAT) {
      const timeZone = Timezone.timezone()

      const zonedDate = date.utcToZonedTime(value.utc().format(), timeZone)

      const datetime = date.format(zonedDate, format, {
        timeZone
      })

      return datetime
    }

    Object.defineProperties(Object.getPrototypeOf(Model), {
      castDates: {
        value: function (key, value) {
          return timezoneFormat(value)
        }
      },
      timezoneFormat: {
        value: timezoneFormat
      }
    })
  }
}

module.exports = Trait

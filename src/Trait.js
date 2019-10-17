const moment = require('moment-timezone')
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

class Trait {
  constructor (Timezone) {
    this.Timezone = Timezone
  }

  register (Model) {
    const Timezone = this.Timezone
    function timezoneFormat (value, format = DATE_FORMAT) {
      const timeZone = Timezone.timezone()

      if (!timeZone) {
        return moment(value).format(format)
      }

      const datetime = moment.tz(value, format, timeZone).format(format)

      return datetime
    }

    Object.defineProperties(Model, {
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

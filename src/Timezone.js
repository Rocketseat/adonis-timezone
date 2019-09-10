class Timezone {
  constructor (asyncHooks) {
    this.current = {}
    asyncHooks.createHook({
      init: () => {
      },
      destroy: () => {
      }
    }).enable()
  }

  run (next) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        next().then(resolve, reject)
      })
    })
  }

  activate (timezone) {
    this.current.activate = timezone
  }

  timezone () {
    return this.current.activate
  }
}

module.exports = Timezone

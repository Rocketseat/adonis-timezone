class Middleware {
  constructor (timezone) {
    this.timezone = timezone
  }

  async handle (_, next) {
    await this.timezone.run(next)
  }
}

module.exports = Middleware

# Adonis Timezone Provider

This library provides an easy way to start using timezones with AdonisJS.

[![Coverage Status](https://coveralls.io/repos/github/Rocketseat/adonis-timezone/badge.svg?branch=master)](https://coveralls.io/github/Rocketseat/adonis-timezone?branch=master)

## Install

`adonis install @rocketseat/adonis-timezone`

## Use

To use this provider you need to add a `trait` inside your `Model`, like this:

```js
class User extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Timezone/Trait");
  }
}
```

```
OBS: Unfortunately cannot overwrite castDates
```

And you need to create a middleware and inside it, use the `timezone` context variable.

On the timezone variable, you can choose the timezone, that your model will provide the timestamps and custom time & date.

```js
class Timezone {
  async handle({ timezone }, next) {
    timezone.activate("America/Sao_Paulo");
    await next();
  }
}
```

If you'd like to add user's timezone, then you should add a named middleware to the `timezone` and the user must have a timezone field in their Model.

```js
class Timezone {
  async handle({ timezone, auth }, next) {
    timezone.activate(auth.user.timezone);
    await next();
  }
}
```

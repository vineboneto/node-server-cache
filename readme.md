# About

Studying backend, populating any table with 1,000,000,000 of data

- Caching

## Requirements

- Postgres >= 13.x
- NodeJS >= 14.x
- Redis [Windows Installation](https://github.com/microsoftarchive/redis/releases)

## Installation

```shell
# Install dependencies
$ yarn

# Upgrade your db
$ yarn push

# Generate seeds
$ yarn seed

# Start server development mode
$ yarn build:watch

$ yarn dev

# Start server production mode
$ yarn build

$ yarn start
```

## Annotations

- 142.585ms without redis
- 5.75ms with redis

## Description

A Basic Local Api with **NestJs**, **GraphQl** and **MongoDB**.

### DB Information

The API resolves queries and mutations related to *companies* and *employees*.
You can access the graphql documentation and playground if you start a development server at [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Installation

```bash
$ npm install
```

## Setting Up
Before using the API, you must include an .env file at the start of the project (/.env).

Where you indicate the MongoDB connection path.

```bash
MONGO_URI: "Replace_This_With_Your_MongoDbUri"
```

_(If you dont know what is your connection path, please read this [article](https://www.mongodb.com/docs/atlas/driver-connection/#connect-your-application))_

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).

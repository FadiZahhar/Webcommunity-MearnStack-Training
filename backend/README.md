
# Contacts App Backend

Welcome to the Contacts App backend API




## Features

- Admin/User Role
- CRUD User(s)
- CRUD Contacts
- Authentification

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file located in the src folder

`ATLAS_URI` Connection string to Mongoose Atlas

`COLLECTION` Name of the collection in Mongoose Atlas

`SECRET_TOKEN` The Secret Token used by jwt

`TOKEN_EXPIRY_TIME` Time for the token to expire


## Run Locally

Clone the project

```bash
  git clone -b jessica_dev https://github.com/FadiZahhar/Webcommunity-MearnStack-Training.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Build

```bash
  npm start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Appendix

**/backend/test** Folder contains all test

**/backend/src** Folder contains main code

## Tech Stack

**Server:** Node, Express, Typescript

**DB:** Mongo

**Testing:** Jest, Mocha, Chai, supertest
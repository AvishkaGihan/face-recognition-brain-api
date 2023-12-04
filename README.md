# Face Recognition Brain API

This is the backend API for the **Face Recognition Brain** web application. It is built using Node.js, Express, Knex, and PostgreSQL.

## Installation

1. Clone the repository from GitHub.
2. Install Node.js and npm if they are not already installed on your system.
3. Install PostgreSQL and create a new database.
4. Create a `.env` file in the root directory and set the following environment variables:
   - `DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>`
   - `JWT_SECRET=<your_secret_key>`
5. Run `npm install` to install the required dependencies.
6. Run `npm run migrate` to set up the database tables.

## Usage

1. Run `npm start` to start the server.
2. Send HTTP requests to `http://localhost:3000` to use the API.

## Endpoints

- `POST /signin`: Authenticate user credentials and return a JWT token.
- `POST /register`: Register a new user and return a JWT token.
- `PUT /image`: Update the user's image count.
- `POST /imageurl`: Detect faces in an image and return the result.

## Dependencies

- `bcrypt-nodejs`: 0.3.0
- `body-parser`: 1.19.0
- `cors`: 2.8.5
- `dotenv`: 10.0.0
- `express`: 4.17.1
- `jsonwebtoken`: 8.5.1
- `knex`: 0.21.18
- `pg`: 8.5.1
- `clarifai`: 2.9.1

## Credits

This application is based on the "Zero to Mastery" full-stack development course on Udemy, taught by Andrei Neagoie.

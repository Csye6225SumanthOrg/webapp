## Requirements

1. All API request/response payloads should be in JSON.
2. No UI should be implemented for the application.
3. As a user, I expect all API calls to return with a proper HTTP status code (Links to an external site.).
4. As a user, I expect the code quality of the application to be maintained to the highest standards using the unit and/or integration tests.
5. Your web application must only support Token-Based authentication and not Session Authentication Links to an external site..
6. As a user, I must provide a basic Links to an external site. authentication Links to an external site. token when making an API call to the authenticated endpoint.
7. Create a new user
    1. As a user, I want to create an account by providing the following information.
       1. Email Address
       2. Password
       3. First Name
       4. Last Name
   2. account_created field for the user should be set to the current time when user creation is    successful.
   3. Users should not be able to set values for account_created and account_updated. Any value provided for these fields must be ignored.
   4. Password should never be returned in the response payload.
   5. As a user, I expect to use my email address as my username.
   6. Application must return 400 Bad Request HTTP response code when a user account with the email address already exists.
   7. As a user, I expect my password to be stored securely using the BCrypt password hashing scheme Links to an external site. with salt Links to an external site..
8. Update user information
   1. As a user, I want to update my account information. I should only be allowed to update the following fields.
        1. First Name
        2. Last Name
        3. Password
   2. Attempt to update any other field should return 400 Bad Request HTTP response code.
   3. account_updated field for the user should be updated when the user update is successful.
   4. A user can only update their own account information.
9. Get user information
    1. As a user, I want to get my account information. Response payload should return all fields for the user except for password.


## Prerequisites softwares and libraries
- Postgres DB
- NodeJS (Version 16.17)
- Sequelize (3rd party package for ORM in Node)
- bcryptjs
- chai
- express
- mocha
- pg
- pg-hstore
- sequelize
- supertest
## Steps to deploy it locally.
- clone fork repo:  `git clone git@github.com:kammalshettys/webapp.git`

- run  `npm install` to install packages

- Once  node_modules is installed. create a .env file and add db details and port details.
-   `DB_HOSTNAME = localhost`
-    `DB_PASSWORD = 1234`
-    `DB_USER = postgres`
-    `DB_NAME = postgres`
-    `DB_DIALECT = postgres`
-    `DB_PORT = 5432`
-    `APP_PORT = 7070`
-    Before running a application make sure there 
- since node_modules contains nodemon as well. we can run the server two ways:  `npx nodemon` or `npm start`

## Application Testing
run `npm test` : this runs test on test.js

#test_working

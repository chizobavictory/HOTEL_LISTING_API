# Implemented this API using Express, TypeScript and MongoDB

A basic Express application, that makes a CRUD operation (create, read, update, delete) using MongoDB database, document and publish your endpoints using postman.
In this project, I built a basic CRUD (Create, Read, Update, Delete) for an Hotel Listing Application.

### Users collection

- UserId
- FullName
- Email
- phoneNumber
- createdAt
- updatedAt

### Hotel collection

- HotelId
- Description
- Image
- Address
- Price
- NumOfBeds
- NumOfBaths
- Ratings

## Requirements:

IMPLEMENTED AUTHORIZATION AND AUTHENTICATION: PROTECTED ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

- You can browse through listings.
- You can create hotel listings
- You can edit a hotel listing.
- You can delete a hotel listing.

## How will I complete this project?

- The aplication should be able to perform.
  - `GET` Request which returns all the data in my database
  - `POST` Request which adds data to my database file
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from my database using the id

## Also

- Data format example:This show the model for users and the listing created by the user

```
  {
    fullName: "Bond Michael",
    email: "bond@gmail.com",
    phoneNumber: "12345",
    password: "12333444",
      Listings:[

      {
        description:'Clean and fully furnished apartment',
        image:'https://meany.com',
        address:"Edo tech park",
        price:10000,
        numOfBeds:1,
        numOfBaths:3,
        rating:5
        id:"1"
   },
   ....
 ]
}

```

## Test coverage

- Make sure you write test to cover your application using Jest/supertest

### Test

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes

### Setup

1. Clone this repository.
2. Run yarn install.
3. Run yarn start.
4. Run yarn test.

### Test Coverage

- Test database using mongodb-memory-server
- Tested all endpoints `(GET, POST, PUT, DELETE)`

### Hosting

- Hosted application on Vercel
- 

### Documentation

- documentation of API done with postman
- https://documenter.getpostman.com/view/24035086/2s8YzZNy69

##Demo

https://user-images.githubusercontent.com/43314673/209295632-dff34f30-145c-4e34-965b-40ddb4a4c017.mov


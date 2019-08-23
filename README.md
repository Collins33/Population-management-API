# Poulation-Management-API

[![Build Status](https://travis-ci.org/Collins33/Population-management-API.svg?branch=develop)](https://travis-ci.org/Collins33/Population-management-API)

Population management API
The API provides a user a way to view a list of locations and the breakdown of the population based on gender.

## Getting Started

- git clone https://github.com/Collins33/Population-management-API.git
- cd into the project folder
- run `npm install`

## Setting up mongo Atlas

- create an account on mongo DB atlas
- create a mongo atlas database
- ensure the IP security settings allow connctions from everywhere
- copy the connection url given to you.
- create nodemon.json file
- add the database connection given to you

```
  "MONGO_DATABASE_URL": "database url given"
```

## Starting the application

- run `npm start`

## Running the tests

- create test database on mongo atlas
- ensure the IP security settings allow connctions from everywhere
- save the database url given

```
"MONGO_DATABASE_TEST_URL":"test database url given"
```

- run `npm test`

## endpoints

| Endpoint                             |            FUNCTIONALITY             |
| ------------------------------------ | :----------------------------------: |
| POST /api/v1/locations               |    This will create the location     |
| GET /api/V1/locations                |   This will get all the locations    |
| GET /api/V1/locations/:locationId    | This will get an individual location |
| PUT /api/V1/locations/:locationId    |  This will edit a specific location  |
| DELETE /api/V1/locations/:locationId |     This will delete a location      |

## MAKING A POST REQUEST ON POSTMAN

```
Payload
{
  "name": "Nairobi",
  "femalePopulation": 400000,
  "malePopulation": 40000,
}
Response
{
    "message": "Location was created",
    "createdLocation": {
        "name": "Nairobi",
        "femalePopulation": 400000,
        "malePopulation": 40000,
        "totalPopulation": 440000,
        "_id": "5d5e53bf0060d20004bb3806",
        "request": {
            "type": "GET",
            "description": "Get the created location",
            "url": "https://population-control-33.herokuapp.com/api/v1/locations/5d5e53bf0060d20004bb3806"
        }
    }
}
```

## Built With

- [NODE/EXPRESS](https://expressjs.com/) - The web framework used
- [npm](https://www.npmjs.com/) - Dependency Management
- [Mongo Atlas](https://www.mongodb.com/cloud/atlas)-Database

## Authors

- **COLLINS NJAU MURU**

## License

This project is licensed under the MIT License

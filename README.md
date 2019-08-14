# Poulation-Management-API

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
- add the password given to you.
- "MONGO_PASSWORD": "xxxxxxxxxxxx"

## Starting the application

- run `npm start`

## endpoints

| Endpoint                              |            FUNCTIONALITY             |
| ------------------------------------- | :----------------------------------: |
| POST /api/v1/locations                |    This will create the location     |
| GET /api/V1/locations                 |   This will get all the locations    |
| GET /api/V1/locations/:locationId     | This will get an individual location |
| PUT /api/V1/locations/:locationId     |  This will edit a specific location  |
| DELETE /api/V1//locations/:locationId |     This will delete a location      |

## Built With

- [NODE/EXPRESS](https://expressjs.com/) - The web framework used
- [npm](https://www.npmjs.com/) - Dependency Management
- [Mongo Atlas](https://www.mongodb.com/cloud/atlas)-Database

## Authors

- **COLLINS NJAU MURU**

## License

This project is licensed under the MIT License

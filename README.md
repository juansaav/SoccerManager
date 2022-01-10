# Soccer online manager game API

This is a RESTful API that uses:

- Node.js
- Typescript.js
- Express.js
- SQLite3
- Prisma 
- express-validator
- mocha & chai & supertest
- Dependency Injection


## Install dependencies

    npm i

## Run the app 

   npx run start
   
Default port: 7000 (.env file)

## Run the tests

    npm test

# REST API

The REST API is described below. Only "Create user" and "Login" services are public. For the rest you must add an Authorization header "Bearer token" in order to call them. You can also import the Postman project "postman_soccermanager.json" from the root folder to test the API.
Fields with a (*) are required.
## Create user

### Request
`POST /user`
	{
		* email: "test@test.com",
		firstName= "first name",
		lastName= "last name",
		countryCode= "US",
		* password="password1"
	}

### Response
    HTTP/1.1 200 OK 
	{
		id:1,
		email: "test@test.com",
		firstName= "first name",
		lastName= "last name",
		countryCode= "US",
		password="password1",
		team= {...}
	}

## Login

### Request
`POST /session`

	{
		* email: "test@test.com",
		* password="password1"
	}

### Response
    HTTP/1.1 200 OK  
	{
		token:"tokendata...",
		user: userData
	}

## Logout (authenticated)

### Request
`DELETE /session`
Authorization: Bearer token....

### Response
    HTTP/1.1 200 OK  

## Get player (authenticated)
### Request
`GET /player/:id`
Authorization: Bearer token....


### Response
Returns player 

HTTP/1.1 200 OK 

	{
		"id": 54,
	    "name": "Juan", 
	    "age": 35
	    ...
	    ..
	}

## Edit player (authenticated)
### Request
`PUT /player/:id`
Authorization: Bearer token....
	{
		name= "Test player name",
		countryCode= "US",
	}
### Response
Returns team 
HTTP/1.1 200 OK 

## Get team (authenticated)
### Request
`GET /team/:id`
Authorization: Bearer token....
### Response
Returns team 
HTTP/1.1 200 OK 
	{
		"id": 2,
	    "name": "Team 1", 
	    "countryCode": "US"
	    ...
	    ..
	}

## Edit team (authenticated)
### Request
`PUT /team/:id`
Authorization: Bearer token....
	{
		name= "Test team name",
		countryCode= "US",
	}

### Response
Returns team 
HTTP/1.1 200 OK 


## Get transfer (authenticated)
### Request
`GET /transfer`
Authorization: Bearer token....

### Response
Returns team 
HTTP/1.1 200 OK 
	{
		[
			{
				"id":1,
				"player1",
				"price": 5000000,
				...
			}, 
			{
				"id":2,
				"player2",
				"price": 3000000,
				...
			}
		]
	}

## Post transfer (authenticated)
### Request
`POST /transfer/:id`
Authorization: Bearer token....
	{
		* "playerId":2,
		* "price":1567000
	}
### Response
Returns team 
HTTP/1.1 200 OK 
	{
		"id": 2,
		"playerId": 2, 
		"price":1567000,
		"publishedOn": ...
		...
		..
	}


## Buy player (authenticated)
### Request
`put /transfer/:id`
Authorization: Bearer token....
{
}
### Response
Returns team 
HTTP/1.1 200 OK 
	{
		"id": 2,
		"playerId": 2, 
		"price":1567000,
		"active": false
		"publishedOn": ...
		...
		..
	}
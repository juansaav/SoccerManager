# Soccer online manager game API

This is a RESTful API that uses:

- Node.js
- Typescript.js
- Express.js
- SQLite3
- Prisma 
- express-validator
- mocha & chai & supertest

# Patterns
- Dependency Injection


## Install dependencies

    npm install

## Run the app 

   npx ts-node src
   
Default port: 7000 (.env file)

## Run the tests

    npm test

# REST API

The REST API is described below. Only "Create user" and "Login" services are public. For the rest you must add an Authorization header "Bearer token" in order to call them. You can also import the Postman project "postman_movies.json" from the root folder to test the API.

## Create user

### Request
`POST /user`
{
	email: "test@test.com",
	firstName= "first name",
	lastName= "last name",
	password="password1"
}

### Response
    HTTP/1.1 200 OK 
{
	id:1,
	email: "test@test.com",
	firstName= "first name",
	lastName= "last name".
	password="password1"
}

## Login

### Request
`POST /session`

{
	email: "test@test.com",
	password="password1"
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

## Get movies filtered by a keyWord (authenticated)
### Request
`GET /movie?keyWord=keyWord1`
Authorization: Bearer token....


### Response
Returns list of movies 

    HTTP/1.1 200 OK 
[
	{
		"id": 635302,
	    "adult": false, 
	    "original_language": "ja"
	    ...
	    ..
	},
	{
		...
	}
]

## Add movie to favourites (authenticated)

### Request
`GET user/userId1/movie/movieId1`
Authorization: Bearer token....

### Response 
    HTTP/1.1 200 OK 

## Get favourites user movies (authenticated)

### Request
`GET user/userId1/movie`
Authorization: Bearer token....

### Response 
    HTTP/1.1 200 OK 
Returns list of favourites movies of the user

    HTTP/1.1 200 OK 
[
	{
		"id": 635302,
	    "adult": false, 
	    "original_language": "ja"
	    ...
	    ..
	},
	{
		...
	}
]

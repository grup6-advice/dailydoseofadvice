List of API

POST /register
POST /login
GET /quotes
GET /advice
GET /images

----------------------------------------------

----  POST /register ----
This will create new user

Request Header
{
  "Content-Type":"application/json"
}

Request Body
{
  "email" : "kris@gmail.com",
  "password" : "123456"
}

Status : 201
Response 
{
  "id": 5,
  "email" : "kris@gmail.com",
}

----------------------------------------------

----  POST /login ----
Check user login

Request Header
{
  "Content-Type":"application/json"
}

Request Body
{
  "email" : "kris@gmail.com",
  "password" : "123456"
}

Status : 200
Response 
{
  "id": 2,
  "email": "kris@gmail.com",
  "access_token": "eyJhbGaciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOasqcmlzbmEucG9zdGFAZ21haWwuY29tIiwiaWF0IjoxNjE0OTA3OTEyfQ.xkTAUDEM8LdFs_OZb-ElZ84f5ynykjjYJ2IVy45ZR9Q"
}

----------------------------------------------

----   GET /quotes  ----
Get random quotes from 3rd party API

Request Header
{
  "Content-Type":"application/json"
  "access_token": "eyJhbGaciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOasqcmlzbmEucG9zdGFAZ21haWwuY29tIiwiaWF0IjoxNjE0OTA3OTEyfQ.xkTAUDEM8LdFs_OZb-ElZ84f5ynykjjYJ2IVy45ZR9Q"
}

Request Body
{
 
}

Status : 200
Response 
{
  "quote": "Choose the life that is noblest, for custom can make it sweet to thee.",
  "author" : "Marcus Aurelius"
}

----------------------------------------------

----   GET /advice  ----
Get random advice from 3rd party API

Request Header
{
  "Content-Type":"application/json"
  "access_token": "eyJhbGaciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOasqcmlzbmEucG9zdGFAZ21haWwuY29tIiwiaWF0IjoxNjE0OTA3OTEyfQ.xkTAUDEM8LdFs_OZb-ElZ84f5ynykjjYJ2IVy45ZR9Q"
}

Request Body
{
 
}

Status : 200
Response 
{
  "advice": "Never set an alarm clock unless you know how to switch it off"
}

----------------------------------------------

----   GET /images  ----
Get random advice from 3rd party API

Request Header
{
  "Content-Type":"application/json"
  "access_token": "eyJhbGaciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOasqcmlzbmEucG9zdGFAZ21haWwuY29tIiwiaWF0IjoxNjE0OTA3OTEyfQ.xkTAUDEM8LdFs_OZb-ElZ84f5ynykjjYJ2IVy45ZR9Q"
}

Request Body
{
 
}

Status : 200
Response 
{
  "imageUrl": "https://pixabay.com/get/g100b134e1de3b6752c12eecc7fbdcf8c02cdcb0d2a82b880689f1c699a27a6f9e5c93f279df17b17fb2f23c8925b3da3253f031f8697151d8fb770f1eeaa73d9_640.jpg"
}

----------------------------------------------

Response Code : Response Code Description
200: Ok
201: Created
400: Bad request
404: Not found
500: Internal server error


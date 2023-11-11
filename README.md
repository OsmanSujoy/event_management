# NestJS - REST API - Prisma - MySQL


## Postman collection.

Please import the collection into your Postman to test the APIs.

## Installation

```bash
$ yarn
```

## Run MySQL Docker

```bash
$ docker-compose up
```
All the credentials are available on the **.env** file.

## Note

Please update **.env** file with your DB URL if you want to use locally hosted database.
A start up script will be run to insert dummy data.
```bash
# format
DATABASE_URL=mysql://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST_NAME}:${DATABASE_PORT_NUMBER}/${DATABASE_NAME}?connection_limit=5&socket_timeout=3
```

## Running the app

```bash
# development migration
$ yarn migrate

# development
$ yarn start:dev

# Single command to run the application
$ yarn start:migrate:dev
```
Application will be started at **http://localhost:3000/**
## API End Points

| Name | End Point |
| ------ | ------ |
| Event List API | http://localhost:3000/event/ |
| Event Details API | http://localhost:3000/event/${id} |
| Workshop List API | http://localhost:3000/event/${id}/workshop |
| Workshop Details API | http://localhost:3000/workshop/${id} |
| Workshop reservation API | http://localhost:3000/workshop/${id}/reservation |
### Event List API
```bash
End Point: http://localhost:3000/event/
# Query Params: 
filter: string (optional) - filter on event names
per_page: number (optional) - per page data counts
current_page: number (optional) - current page number
```
### Event Details API
```bash
End Point: http://localhost:3000/event/:id
# Path Variables:
id: number (mandatory) - event id number
```
### Workshop List API
```bash
End Point: http://localhost:3000/event/:id/workshop
# Path Variables: 
id: number (mandatory) - event id number
```
### Workshop Details API
```bash
End Point: http://localhost:3000/workshop/:id
# Path Variables:
id: number (mandatory) - workshop id number
```
### Workshop reservation API
```bash
End Point: http://localhost:3000/workshop/:id/reservation
# Path Variables:
id: number (mandatory) - workshop id number
# Body: JSON
name: string (mandatory) - name used for reservation
email: string (mandatory) - email used for reservation
```
**Example:**
```bash
{
    "name": "Mr. Test",
    "email": "test@test.com"
}
```
### Thank you
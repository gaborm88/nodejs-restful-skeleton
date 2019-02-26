# Nodejs restful skeleton

NodeJs restful service with express, mongo, babel and docker. 

#### Start:
```
docker-compose up --build
```

If you want to develop locally, you need to add a .env to the project root:
```
PORT=4000
MONGO_URL=mongodb://localhost:27017/admin
```
And with npm start the nodemon starts.

##### Todo:
- JWT authentication > move /login to an other module, finish the implementation
- Tests
- Fix todo in the code
- Extend readme

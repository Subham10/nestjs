

1. Run `nest_producer` using `npm run start:dev`
    Here `nest_producer` working as a gateway.All the request comes here first and then transfer
    to the respective microservices.
2. Run `user_service` using `npm run start:dev`
    Here `user_service` is one of the microservice.

3. Run `product_service`     using `npm run start:dev`
   It's another microservice.

API : Create User :
    POST http://localhost:5000/register_user
    {"email":"subham@test1","name":"Subham1"}

    Fetch User :
    GET http://localhost:5000/fetchAllUser

API : Create Product :
    POST http://localhost:5000/addProduct
    {"product":"Mobile","price":"10000"}  

    Fetch Product :
    GET http://localhost:5000/fetchProduct   
    
 Reference :
    https://www.optisolbusiness.com/insight/nestjs-microservices-with-tcp
    https://www.youtube.com/watch?v=I8cs8fJYF_w   




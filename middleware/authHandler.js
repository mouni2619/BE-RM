// Import the jwt library for working with JSON Web Tokens
import jwt from "jsonwebtoken";

// Middleware function for authenticating requests
export const auth =(request,response,next)=>{
   
    try{
      // Extract the JWT token from the request header
       const token = request.header("x-auth-token")
        // Verify the token using the provided secret key
       jwt.verify(token,process.env.SECRETKEY);
        // If verification is successful, proceed to the next middleware or route handler
       next();
   }catch(err){
       // If verification fails, send a 401 Unauthorized response with the error message
      response.status(401).send({message:err.message})
   }
}   
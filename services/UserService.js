// Import the MongoDB client, bcrypt, and ObjectId
import { client } from "../server.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

// Function to generate a hashed password
 export async function generateHashedPassword(password, request) {
     // Generate a salt with 10 rounds
    let salt = await bcrypt.genSalt(10);
      // Generate a hashed password using the salt
    let hashPassword = await bcrypt.hash(password, salt);
    // Update the request body with the hashed password
    return request.body.password = hashPassword;
}

// Function to create a new user
export async function createUser(request) {
      // Find a user document in the "register" collection by email
    return await client.db("markdown").collection("register").insertOne(request.body);
}
// Function to find a user by email (similar to getUserByEmail)
export async function getUserByEmail(email) {
      // Find a user document in the "register" collection by email
    return await client.db("markdown").collection("register").findOne({ email: email });
}
 
export async function findUser(email) {
    return await client.db("markdown").collection("register").findOne({ email: email });
}
// Function to reset a user's password
export async function passwordReset(password, request) {
     // Generate a salt with 10 rounds
    let salt = await bcrypt.genSalt(10);
      // Generate a hashed password using the salt
    let hashPassword = await bcrypt.hash(password, salt);
    // Update the request body with the hashed password
    return request.body.password = hashPassword;
}
// export async function passwordResetUpdate(id,request) {
//    
//     return await client.db("markdown").collection("register").updateOne({_id:new ObjectId(id)},{$set:request.body});
// }
 

// Import the MongoDB client and ObjectId
import {client} from "../server.js"
import {ObjectId} from "mongodb";

// Function to retrieve players based on request parameters
export async function getPlayers(request) {
    return await client.db("markdown").collection("projects").find({email:request.params.id}).toArray();
}
// Function to delete a player by ID
export async function deletePlayer(id) {
    return await client.db("markdown").collection("projects").deleteOne({ _id: new ObjectId(id) });
}
// Function to edit a player by ID
export async function EditPlayer(id, request) {
    return await client.db("markdown").collection("projects").updateOne({ _id: new ObjectId(id) },{ $set: request.body });
}
// Function to get a player by ID
export async function getPlayerById(id) {
    return await client.db("markdown").collection("projects").findOne({ _id: new ObjectId(id) });
}
// Function to create a new player
export async function CreatePlayer(data) {
    console.log(data)
    return await client.db("markdown").collection("projects").insertOne(data);
    
}

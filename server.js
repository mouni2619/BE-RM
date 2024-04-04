// Import necessary modules
import express from "express";
import {MongoClient} from "mongodb";
import { config } from "dotenv";
import { writeFileSync } from "fs";
import { randomBytes } from "crypto";
import * as dotenv from "dotenv";
import cors from "cors";
import playersRouter from "./routes/PlayerRouter.js";
import userRouter from "./routes/UserRouter.js";


// Load environment variables from .env file
// dotenv.config();

// Load environment variables from .env file
config();

// Check if SECRETKEY is not set
if (!process.env.SECRETKEY) {
    // Generate a random 32-byte key
    const secretKey = randomBytes(32).toString("hex");
    

    // Update .env file with the new secret key
    writeFileSync(".env", `SECRETKEY=${secretKey}\n`, { flag: "a" });

    // Update process.env to use the new secret key
    process.env.SECRETKEY = secretKey;
}

// Create an Express app
const app = express();

// Get the port from environment variables
const PORT = process.env.PORT;

// Get the MongoDB connection URL from environment variables
const MONGO_URL = process.env.MONGO_URL;

// Create a new MongoClient instance and connect to MongoDB
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("MongoDb is connected..!")

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for enabling CORS
app.use(cors())

// Routes for handling players and users
app.use('/players',playersRouter)
app.use('/users',userRouter)

// Default route
// app.get("/",function(req,res){
//     res.send("Hello World React Markdown Viewer Server Started")
// })
app.get('/', async (req, res) => {
    res.send(`<div style=background-color:#EED9C4;padding:20px;><h1 style=text-align:center;color:red>⚛️React Markdown Viewer🧐</h1><h2 style=color:green;>This web application allows you to view Markdown files in a user-friendly format.</h2><h2>Features</h2><ul style=list-style-type:none;><li>💎View Markdown files with syntax highlighting</li><li>💎Download Markdown files as PDF or HTML</li></ul><h2>How to Use</h2><ol style=list-style-type:none;><li>💎Upload a Markdown file using the "Upload File" button</li> <li>💎Your Markdown file will be displayed in a formatted view</li><li>💎Click the "Download PDF" or "Download HTML" button to download the file in the desired format</li></ol><h2>Technologies Used</h2><ul style=list-style-type:none;> <li>💎React.js - Frontend JavaScript library for building user interfaces</li><li>💎React Markdown - Library for rendering Markdown as React components</li><li>💎html2pdf - Library for generating PDF files from HTML content</li></ul><p>Thank you for using the React Markdown Viewer!</p><div>`); 
});




// Start the server
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// Export the MongoDB client instance for use in other modules
export {client}
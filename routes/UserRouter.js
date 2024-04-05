import express from "express";
import { generateHashedPassword,createUser,getUserByEmail,findUser,passwordReset} from "../services/UserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { client } from "../server.js";
import {ObjectId} from "mongodb";
// Create a new router instance
const router = express.Router();

// Route to handle user registration
router.post("/register",async function(request,response){
    const{username,password,email} = request.body;
    // Check if the email already exists in the database
    let user = await getUserByEmail(email)

    if(user){
        response.status(400).send({message:"This Email aleady exist"})
    }else

    {
       // Generate hashed password
   const hashPassword= await generateHashedPassword(password, request); 
    
     // const data = request.body;
    const result = await createUser(request)
    result ? response.send({message:"User registerded successfully"}) : response.send({message:"error"})   
    }
})
// Route to handle user login
router.post("/login",async function(request,response){
    
        const{email,password} = request.body
        let user = await getUserByEmail(email)
        if(!user){
            response.status(401).send({ message : "Invalid Credentials"})
        } else {

            const storedDBPassword = user.password;
            const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
            console.log(isPasswordCheck);
            
            if (isPasswordCheck) {
              const token = jwt.sign({ id : user._id }, process.env.SECRETKEY);
              response.send({ message : "Successful login", token : token, email : user.email});
            } else {
              response.status(401).send({ message: "Invalid Credentials"});
            }
      
          
          
        }
    } );
    
 
  // Route to handle forgot password
  router.post("/forgot", async function(request, response) {
    const { email } = request.body;
    let check = await findUser(email);
    if (!check) {
      return response.status(404).json({ message: "Email not found" });
    }
  
    try {
      const token = jwt.sign({ id: check._id }, process.env.SECRETKEY, { expiresIn: "10m" });
      const url = `${process.env.BASE_URL}/forgot-password-page/${check._id}/${token}`;
  
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: check.email,
        subject: "Password Reset",
        html: `
          <div style="border: 3px solid blue; padding: 20px;">
            <span>Password Reset Link: - </span>
            <a href="${url}">Click here!!!</a>
            <div>
              <h4>Note :-</h4>
              <ul>
                <li>This link is valid for 10 minutes</li>
              </ul>
            </div>
          </div>
        `
      };
  
      await transporter.sendMail(mailOptions);
      response.status(200).json({ message: "Password reset link sent successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Failed to send email" });
    }
  });
  // Route to handle password reset
  router.post("/passwordReset", async function (request, response) {
    try {
      let { id, password } = request.body;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      await client.db("markdown").collection("register").updateOne({ _id: new ObjectId(id) }, { $set: { password: hash } });
      response.json({
        statusCode: 200,
        message: "Password reset successful.",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      response.status(500).json({
        statusCode: 500,
        message: "Failed to reset password. Please try again later.",
      });
    }
  });
  
// Export the router instance
export default router;





// Import the necessary modules and functions
import express from "express";
import { CreatePlayer,getPlayers,getPlayerById,EditPlayer,deletePlayer } from "../services/ProjectService.js";
import {auth} from "../middleware/authHandler.js";

// Create a new router instance
const router = express.Router()

// router.get("/", function (request, response) {
//     response.send("🙋‍♂️, 🌏 🎊✨🤩Welcome");
//   });

  
// Route to handle POST requests for creating a new player
router.post("/",auth,async function(request,response){
   try{
    const data =request.body;
    console.log(data);
    const result =await CreatePlayer(data)
    response.send(result)
   }catch(err){
    console.log(err);
   }

})
// Route to handle GET requests for retrieving players
router.get("/markdown/:id",auth,async function(request,response){
   console.log("Hi")
    try{
        const result = await getPlayers(request);
        console.log(result);
        response.send(result)
    }catch(err){
        console.log(err);
    }
})




router.get("/projects/:email", auth, async function(request, response) {
    try {
        const projects = await Project.find({ email: request.params.email });
        response.send(projects);
    } catch (err) {
        console.log(err);
        response.status(500).send("Server Error");
    }
});


// Route to handle GET requests for retrieving a single player by ID
router.get("/:id",auth,async function(request,response){
    const {id} = request.params
    const result = await getPlayerById(id)
    result ? response.send(result): response.status(404).send({message:"player not found"})

})
// Route to handle PUT requests for updating a player by ID
router.put("/:id",auth,async function(request,response){
    const {id} = request.params

    const result=await EditPlayer(id, request)
    console.log(result)
    result ? response.send({message:"Player updated successfully"}): response.status(404).send({message:"player not found"})

})






// Route to handle DELETE requests for deleting a player by ID
router.delete("/:id",async function(request,response){
    const {id} = request.params

    const result = await deletePlayer(id)
    result.deletedCount > 0 ? response.send({message:"player deleted successfully"}): response.status(404).send({message:"Player not found"})
})
// Export the router instance
export default router;
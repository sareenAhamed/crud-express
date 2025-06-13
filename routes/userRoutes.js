import express from "express"
import { getAllUsers, create, update, deleteUser } from "../controller/userController.js"

const route = express.Router();
route.get("/getAllUsers", getAllUsers)
route.post("/create", create)
route.put("/update/:id", update)
route.delete("/deleteUser/:id", deleteUser)


export default route;
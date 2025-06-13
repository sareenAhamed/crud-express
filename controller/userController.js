import User from "../model/userModel.js"


// Create
export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exist."})
        }

        const savedUser = await userData.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
}

// Read All
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0){
            res.status(404).json({message: "Users not found."})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
}

// Update
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if(!userExist){
            res.status(400).json({message: "User not found"})
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(500).json({message:"Internal server error."})
    }
}

// Delete
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if(!userExist){
            res.status(400).json({message: "User not found"})
        }

        await User.findByIdAndDelete(id)
        res.status(201).json({message: "User deleted"})
    } catch (error) {
        res.status(500).json({message:"Internal server error."})
    }
}

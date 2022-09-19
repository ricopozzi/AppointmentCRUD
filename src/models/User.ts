import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String

})

export const UserModel = mongoose.model("User", UserSchema)


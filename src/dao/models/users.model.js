import mongoose from "mongoose";
const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'USER',
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    lastConnection:{
        type:Date,
        default:Date.now
    }
})

export const usersModel = mongoose.model(usersCollection, usersSchema);
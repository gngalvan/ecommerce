import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }

});

messagesSchema.plugin(mongoosePaginate);

export const messagesModel = mongoose.model(messagesCollection,messagesSchema);
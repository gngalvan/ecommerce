import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = "products";

    const productsSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnails: {
            type: Array,
            default:[],
            required: true
        },
        status: {
            type: Boolean,
            required: true,
        },
        owner:{
            type: String,
            default:'ADMIN'
          }
    });

productsSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productsCollection, productsSchema);
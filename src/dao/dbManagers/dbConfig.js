import mongoose from "mongoose";
import config from "../../config/config.js";
import { logger } from "../../utils/logger.js";

const URL = config.mongoUrl;

try{
await mongoose.connect(URL)
logger.info(`DB connected to MongoDB`)
}catch(e){
    logger.error(`DB not connected -  FAILED ${URL}`)
}
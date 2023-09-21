import dotenv from  'dotenv';

dotenv.config();

export default {
mongoUrl: process.env.MONGO_URL,
secretPassport:process.env.PASSPORT_SECRET,
persistence:process.env.PERSISTENCE,
userEmail:process.env.USEREMAIL,
passwEmail:process.env.PASSWEMAIL,
ENVIROMENT:process.env.ENVIROMENT
}
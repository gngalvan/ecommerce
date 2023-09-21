import passport from 'passport'
import jwt from 'passport-jwt'
import config from "./config.js"



const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const passportInit = () => {
passport.use('jwt',new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey:config.secretPassport
},async(jwt_payload,done)=>{
    try{
        const user = jwt_payload.user
        return done(null,user)
    }catch(error){
        logger.error(`Passport: ${error}`)
        return done(error)
    }
}))

}

const cookieExtractor = req => {
    let token = null;
    if(req?.cookies){
        token = req.cookies['coderCookieToken']
    }
return token;
}


export default passportInit;
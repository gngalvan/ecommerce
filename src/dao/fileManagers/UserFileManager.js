import FileManager from "./FileManager.js";
import { comparePassword} from "../../utils/utils.js";

export default class UserFileManager extends FileManager{
    constructor(path){
        super(path);
    }

     LoginValidate = async (emailUser,passUser)=> {
        const content = await this.readFile();
        const contentText = await JSON.parse(content);
        let user = contentText.find((element) => element.email === emailUser );

        if(user){
            const resultCompare = await comparePassword(passUser,user.password)
            if(resultCompare){
                return user 
              }else{
                return 0
              }   
        }
     }

}


// LoginValidate = async (emailUser,passUser) => {
//     const user = await this.model.findOne({email:emailUser}).lean();
//     const resultCompare = await comparePassword(passUser,user.password)
//     if(resultCompare){
//       return user 
//     }else{
//       return 0
//     }      
//   }
import FileManager from "./FileManager.js";
import { comparePassword } from "../../utils/utils.js";

export default class UserFileManager extends FileManager {
  constructor(path) {
    super(path);
  }

  // Método para validar el inicio de sesión de un usuario
  async LoginValidate(emailUser, passUser) {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);

    let user = contentText.find((element) => element.email === emailUser);

    if (user) {
      const resultCompare = await comparePassword(passUser, user.password);

      if (resultCompare) {
        return user; 
      } else {
        return 0; 
      }
    }
  }
}
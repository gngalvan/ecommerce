import { throws } from "assert";
import { promises as fs } from "fs";

export default class FileManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    return await fs.readFile(this.path, "UTF-8").catch((e) => {
      logger.error(`Error al realizar la solicitud:", ${error}`)
      if (e.code === "ENOENT") {
        throw "Archivo no encontrado";
      }
      if (e instanceof TypeError) {
        throw "TypeError - Es posible que el archivo que intenta abrir no corresponda a la codificacion esperada";
      } else {
        throw "error";
      }

    });
  }

  async writeFile(content) {
    return await fs.writeFile(this.path, content).catch((e) => {
      if (e.code === "ENOENT") {
        throw "File not found!";
      } else {
        throw e;
      }
    });
  }

  async lastID() {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const lastElement = contentText[contentText.length - 1];
    return (await lastElement.id) + 1;
  }

  async addElement(obj) {
    try {
        const content = await this.readFile();
        const contentText = await JSON.parse(content);
        contentText.length ? (obj.id = await this.lastID()) : (obj.id = 0);
        const product = {
          ...obj,
        };

        contentText.push(product);
        await this.writeFile(JSON.stringify(contentText));
    } catch (e) {
      logger.error(`Error al agregar el elemento:", ${error}`)

    }
    return obj.id
  }

  async getAll(limit = 10, page = 1, query = '', sortValue) {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    return contentText;
  }

  async getProductById(id) {
    try{
        const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const product = contentText.find((element) => element.id == id);
    if(!product){
        throw new Error()
    }
    return product; 
    }catch(error){
      logger.error(`Error al realizar la solicitud:", ${error}`)
        const myError = new Error('Producto no encontrado');
        myError.details = {code: 404, message: 'Producto no encontrado'};
        throw myError;
        
    }   
  }

  async update(id, propertys) {
    try {
      const content = await this.readFile();
      const contentText = await JSON.parse(content);
      let product = contentText.find((element) => element.id == id);
      if (!product) {
        throw new Error()
      }
      Object.keys(propertys).forEach(prop=>{
        if(prop !== 'id'){
            product[prop] = propertys[prop]
        }
      })
      await this.writeFile(JSON.stringify(contentText))
      const props = Object.keys(propertys).filter(e=> e != 'id')
   return `la/s propiedad/es ${props} para el id:${id} fueron actualizadas`;
     
    }catch(e){
      logger.error(`Error al realizar la solicitud:", ${error}`)
 const myError = new Error(`El elemento ${id} no pudo ser actualizado`);
        myError.details = {code: 404, message: `No fue posible actualizar la/s propiedad/es ${Object.keys(propertys)} para el id:${id}. Verifique que el id exista.`};
        throw myError
    }
  }


  async delete(id) {
    try {
const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const productIndex =  await contentText.findIndex((element) => element.id === id);
    if(productIndex === -1){
      throw new error()
    }else{
     contentText.splice(productIndex,1)
     await this.writeFile(JSON.stringify(contentText))
     return `El producto id:${id} fue eliminado`;
    }
    }catch(e){
      logger.error(`Error al realizar la solicitud:", ${error}`)
      const myError = new Error(`El elemento ${id} no pudo ser eliminado`);
        myError.details = {code: 404, message: `No fue posible eliminar  el id:${id}. Verifique que el id exista.`};
        throw myError
    }
  }
}
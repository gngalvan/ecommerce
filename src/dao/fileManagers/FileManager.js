import { promises as fs } from "fs";

export default class FileManager {
  constructor(path) {
    this.path = path;
  }

  // Método para leer el contenido del archivo
  async readFile() {
    return await fs.readFile(this.path, "UTF-8").catch((error) => {
      logger.error(`Error al realizar la solicitud:", ${error}`);

      if (error.code === "ENOENT") {
        throw "File not found";
      }
      if (error instanceof TypeError) {
        throw "TypeError - The file you are trying to open may not correspond to the expected encoding"; // Error de tipo
      } else {
        throw "error";
      }
    });
  }

  // Método para escribir contenido en el archivo
  async writeFile(content) {
    return await fs.writeFile(this.path, content).catch((error) => {
      if (error.code === "ENOENT") {
        throw "File not found!";
      } else {
        throw error;
      }
    });
  }

  // Método para obtener el último ID en el archivo
  async lastID() {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    const lastElement = contentText[contentText.length - 1];
    return (await lastElement.id) + 1;
  }

  // Método para agregar un elemento al archivo
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
    } catch (error) {
      logger.error(`Error al agregar el elemento:", ${error}`);
    }

    return obj.id;
  }

  // Método para obtener todos los elementos del archivo
  async getAll(limit = 10, page = 1, query = '', sortValue) {
    const content = await this.readFile();
    const contentText = await JSON.parse(content);
    return contentText;
  }

  // Método para obtener un elemento por su ID
  async getProductById(id) {
    try {
      const content = await this.readFile();
      const contentText = await JSON.parse(content);
      const product = contentText.find((element) => element.id == id);

      if (!product) {
        throw new Error();
      }
      return product;
    } catch (error) {
      logger.error(`Error al realizar la solicitud:", ${error}`);

      const myError = new Error('Product not found');
      myError.details = { code: 404, message: 'Product not found' };
      throw myError;
    }
  }

  // Método para actualizar un elemento por su ID y propiedades proporcionadas
  async update(id, properties) {
    try {
      const content = await this.readFile();
      const contentText = await JSON.parse(content);

      let product = contentText.find((element) => element.id == id);

      if (!product) {
        throw new Error();
      }

      Object.keys(properties).forEach((prop) => {
        if (prop !== 'id') {
          product[prop] = properties[prop];
        }
      });

      await this.writeFile(JSON.stringify(contentText));

      const props = Object.keys(properties).filter((e) => e != 'id');
      return `Propiedad/es ${props} para el ID:${id} actualizadas`;
    } catch (error) {
      logger.error(`Error al realizar la solicitud:", ${error}`);

      const myError = new Error(`El elemento ${id} no pudo ser actualizado`);
      myError.details = {
        code: 404,
        message: `No fue posible actualizar la/s propiedad/es ${Object.keys(properties)} para el ID:${id}. Verifique que el ID exista.`,
      };
      throw myError;
    }
  }

  // Método para eliminar un elemento por su ID
  async delete(id) {
    try {
      const content = await this.readFile();
      const contentText = await JSON.parse(content);

      const productIndex = await contentText.findIndex((element) => element.id === id);

      if (productIndex === -1) {
        throw new Error();
      } else {
        contentText.splice(productIndex, 1);
        await this.writeFile(JSON.stringify(contentText));
        return `El producto ID:${id} fue eliminado`;
      }
    } catch (error) {
      logger.error(`Error al realizar la solicitud:", ${error}`);

      const myError = new Error(`El elemento ${id} no pudo ser eliminado`);
      myError.details = {
        code: 404,
        message: `No fue posible eliminar el ID:${id}. Verifique que el ID exista.`,
      };
      throw myError;
    }
  }
}
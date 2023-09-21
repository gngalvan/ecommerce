import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from '@faker-js/faker/locale/es_MX';

const PRIVATE_KEY = "GonzaloGalvan";
const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
__dirname = path.join(__dirname, '..');

// Funciones de generación de tokens
export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "10 minutes" });
  return token;
}

export const generateTokenResetPass = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "20 minutes" });
  return token;
}

// Función de autenticación con token
export const authToken = (req, res, next) => {
  const { authToken } = req.headers.Authorization;
  if (!authToken) return res.status(401).send({ error: "Not authenticated" });
  const token = authToken.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
}

// Función de autenticación para restablecimiento de contraseña
export const authTokenResetPassword = (req, res, next) => {
  const authToken = req.params.token;
  if (!authToken) return res.status(401).send({ error: "Not authenticated" });
  jwt.verify(authToken, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.redirect('/reset-password');
    req.user = credentials.user;
    next();
  });
}

// Funciones de comparación y creación de contraseñas
export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    logger.error(`Error comparing passwords:", ${error}`)
    throw new Error("Error comparing passwords");
  }
}

export const createPasswordHash = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
}

// Función de generación de productos ficticios
const generateProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alphanumeric(10),
    price: faker.commerce.price({ min: 100, dec: 0 }),
    stock: faker.number.int({ min: 2, max: 300 }),
    category: faker.commerce.department(),
    thumbnails: faker.helpers.arrayElement([faker.image.url]),
    status: faker.datatype.boolean()
  };
}

// Función para generar una lista de productos ficticios
export const MockProducts = () => {
  const lengthProds = 100;
  let products = [];
  for (let index = 0; index < lengthProds; index++) {
    products.push(generateProduct());
  };
  return products
}

export default __dirname;
import userDTO from "../dao/DTO/users.dto.js";
import { listUsers } from "../service/sessionsServices.js";
import { getAllProducts } from "../service/productsService.js";

const registrer = async (req, res) => {
  res.render('register');
};

const login = async (req, res) => {
  res.render('login');
};

const profile = async (req, res) => {
  const reqUser = req.user;
  const userProfile = new userDTO(reqUser);
  res.render('profile', {
    user: userProfile
  });
};

const adminProds = async (req, res) => {
  const { limit, page, sort, title, price, category, status } = req.query;
  const query = {};

  if (title) {
    query.title = title;
  }
  if (price) {
    query.price = parseInt(price);
  }
  if (category) {
    query.category = category;
  }
  if (status) {
    query.status = status;
  }

  if (req.user.role === 'PREMIUM') {
    query.owner = req.user.email;
  }

  const products = await getAllProducts(limit, page, query, sort);
  const reqUser = req.user;
  const userProfile = new userDTO(reqUser);
  products.user = userProfile;
  res.render('adminProducts', { products: products });
};

const adminUsers = async (req, res) => {
  const usersList = await listUsers();
  res.render('adminUser', {
    users: usersList
  });
};

const resetPasswordView = async (req, res) => {
  res.render('resetPassword');
};

const setNewPasswordReset = async (req, res) => {
  const token = req.params.token;

  res.cookie(
    'coderCookieToken', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }
  ).render('setNewPasswordReset');
};

export {
  registrer,
  login,
  profile,
  adminUsers,
  resetPasswordView,
  setNewPasswordReset,
  adminProds
};
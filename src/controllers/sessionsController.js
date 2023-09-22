import {
    findUserExist,
    validateLogin,
    saveUser,
    listUsers,
    deleteUsersInfrequent,
    deleteOneUser,
    updateRolUser,
    EmailresetPasswordService,
    resetPasswordService
  } from '../service/sessionsServices.js';
  import {
    generateToken
  } from "../utils/utils.js";
  import CustomError from '../middlewares/errors/customErrors.js';
  import {
    generateUserExistError
  } from '../middlewares/errors/info.js';
  import EnumsErrors from '../middlewares/errors/enums.js';
  
  const registerUser = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
  
    const exist = await findUserExist(email);
    let error;
    if (!exist) {
      const user = {
        firstName,
        lastName,
        email,
        password
      };
  
      const userGenerated = await saveUser(user);
      user.role = userGenerated.role;
      const accessToken = generateToken(user);
      res.cookie(
        'coderCookieToken', accessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true
        }
      ).send({
        status: 'success'
      });
    } else {
      error = new CustomError(
        'User already exist',
        'user Exist',
        await generateUserExistError(email),
        EnumsErrors.USER_EXIST
      );
      throw error;
    }
  };
  
  const login = async (req, res) => {
    let error;
    const {
      email,
      password
    } = req.body;
  
    const user = await validateLogin(email, password);
    if (!user) {
      error = new CustomError(
        'User or Password invalid',
        'retry with another username or password',
        'Invalid Credentials',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
  
    const accessToken = generateToken(user);
  
    res.cookie(
      'coderCookieToken', accessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      }
    ).send({
      status: 'success',
      tkn: accessToken
    });
  };
  
  const logout = async (req, res) => {
    res.clearCookie('coderCookieToken').send({
      status: 'Success'
    });
  };
  
  const userList = async (req, res) => {
    const users = await listUsers();
    if (!users) {
      error = new CustomError(
        'Error getting users ',
        'Error getting users, retry',
        'Error getting all users',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success',
      users
    });
  };
  
  const deleteUserInfrequent = async (req, res) => {
    const users = await deleteUsersInfrequent();
  
    if (!users) {
      error = new CustomError(
        'Error delete users ',
        'Error delete users , retry',
        'Error delete Infrequent users ',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success',
      users
    });
  };
  
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const userDelete = await deleteOneUser(id);
  
    if (!userDelete) {
      error = new CustomError(
        'Error delete user ',
        'Error delete user , retry',
        'Error delete user ',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success',
      userDelete
    });
  };
  
  const updateUserRol = async (req, res) => {
    const rol = req.body.rol;
    const id = req.params.id;
    const userChangeRolResult = await updateRolUser(id, rol);
  
    if (!userChangeRolResult) {
      error = new CustomError(
        'Error update user rol',
        'Error update user rol , retry',
        'Error update user rol',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success',
      userChangeRolResult
    });
  };
  
  const sendEmailRestartPassword = async (req, res) => {
    const email = req.body.email;
    const sendEmailPasswordReset = await EmailresetPasswordService(email);
    if (!sendEmailPasswordReset) {
      error = new CustomError(
        'Error send mail user ',
        'Error send mail user  , retry',
        'Error send mail user,invalid or not exist',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success'
    });
  };
  
  const resetPassword = async (req, res) => {
    const {
      password,
      passwordConfirm
    } = req.body;
    const email = req.user.email;
    const resetPass = await resetPasswordService(email, password, passwordConfirm);
    if (!resetPass) {
      error = new CustomError(
        'Error reset password ',
        'Error reset password  , retry',
        'Error reset password, retry this process',
        EnumsErrors.INVALID_CREDENTIALS
      );
      throw error;
    }
    res.send({
      status: 'success'
    });
  };
  
  export {
    registerUser,
    login,
    logout,
    userList,
    deleteUserInfrequent,
    deleteUser,
    updateUserRol,
    sendEmailRestartPassword,
    resetPassword
  };  
import userDTO from "../dao/DTO/users.dto.js";
import UserNotificationDTO from '../dao/DTO/userNotificationDTO.js';
import ResetPasswordEmailDTO from "../dao/DTO/resetPasswordEmailDTO.js";
import { sendEmail } from '../config/mailer.config.js';
import { sessionsRepository } from "../repositories/index.js";
import { comparePassword, createPasswordHash, generateTokenResetPass } from "../utils/utils.js";

const findUserExist = async (emailUser) => {
    return await sessionsRepository.findUserExist(emailUser);
}

const validateLogin = async (emailUser, passUser) => {
    return await sessionsRepository.validateLogin(emailUser, passUser);
}

const saveUser = async (user) => {
    return await sessionsRepository.saveUser(user);
}

const findUserByID = async (id) => {
    return await sessionsRepository.findUserByID(id);
}

const listUsers = async () => {
    const listUsers = [];
    const users = await sessionsRepository.listUsers();

    for (const user of users) {
        const dtoUSer = new userDTO(user);
        listUsers.push(await dtoUSer.getUser());
    }
    return listUsers;
}

const deleteUsersInfrequent = async () => {
    const usersDeleted = await sessionsRepository.deleteUsersInfrequent();
    if (usersDeleted.length) {
        for (const user of usersDeleted) {
            const dtoNotificationUser = new UserNotificationDTO('User deleted', user, 'your user was deleted due to inactivity');
            const notification = dtoNotificationUser.getEmail();
            sendEmail(notification);
        }
    }
    return usersDeleted;
}

const deleteOneUser = async (id) => {
    return await sessionsRepository.deleteUser(id);
}

const updateRolUser = async (id, rol) => {
    return await sessionsRepository.updateUserRol(id, rol);
}

const EmailresetPasswordService = async (email) => {
    const user = await findUserExist(email);
    const token = generateTokenResetPass(user);
    const dtoEmailResetPassword = new ResetPasswordEmailDTO(user.email, token);
    const resetPassword = dtoEmailResetPassword.getEmail();
    sendEmail(resetPassword);
    return email;
}

const resetPasswordService = async (email, password, passwordConfirm) => {
    const passEqual = comparePassword(password, passwordConfirm);
    const user = await sessionsRepository.findUserExist(email);
    const newPasswordIsSame = await comparePassword(password, user.password);

    if (newPasswordIsSame) {
        throw new Error(`The new password cannot be the same as the current one`);
    };
    if (!passEqual) {
        throw new Error(`The passwords don't match`);
    };
    return await sessionsRepository.resetPassword(email, password);
}

export {
    findUserExist,
    validateLogin,
    saveUser,
    findUserByID,
    listUsers,
    deleteUsersInfrequent,
    deleteOneUser,
    updateRolUser,
    EmailresetPasswordService,
    resetPasswordService
}

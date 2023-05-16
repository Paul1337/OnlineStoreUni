import express from 'express';
import authController from './authController';
import { check } from 'express-validator';
import authMiddleware from './middlewares/authMiddleware';

const authRouter = express();

const emailMiddleware = check('email', 'Email should be a valid email )').isEmail();

authRouter.post(
    '/register',
    [
        emailMiddleware,
        check('password', 'Password should be between 6 and 10 symbols length').isLength({
            min: 6,
            max: 20,
        }),
    ],
    authController.register
);
authRouter.post('/login', [emailMiddleware], authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/', authController.auth);

export default authRouter;

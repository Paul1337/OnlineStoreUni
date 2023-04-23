import express from 'express';
import authController from './authController';
import { check } from 'express-validator';

const authRouter = express();

const emailMiddleware = check('email', 'Email should be a valid email )').isEmail();

authRouter.get(
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
authRouter.get('/login', [emailMiddleware], authController.login);
authRouter.get('/', authController.auth);

export default authRouter;

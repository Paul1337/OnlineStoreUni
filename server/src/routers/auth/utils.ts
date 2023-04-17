import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IJWTPayload } from './auth.model';
import configController from '../../config/configController';

export function getSecretKey() {
    const config = configController.config;
    return config.secretKey;
}

export function generateAccessToken(payload: IJWTPayload) {
    const token = jwt.sign(payload, getSecretKey());
    return token;
}

import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IJWTPayload } from '../../models/auth/auth.module';

export function getSecretKey() {
    const configPath = path.join(__dirname, '../..', 'config.json');
    console.log('config-path:', configPath);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config.secretKey;
}

export function generateAccessToken(payload: IJWTPayload) {
    const token = jwt.sign(payload, getSecretKey());
    return token;
}

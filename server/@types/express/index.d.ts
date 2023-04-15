import { IJWTPayload } from '../../src/models/auth/auth.module';

declare global {
    namespace Express {
        export interface Request {
            tokenPayload?: object;
        }
    }
}

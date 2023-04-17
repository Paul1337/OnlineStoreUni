import { IJWTPayload } from '../../src/routers/auth/auth.model';

declare global {
    namespace Express {
        export interface Request {
            tokenPayload?: object;
        }
    }
}

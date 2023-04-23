"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routers/auth/authRouter"));
const dbController_1 = __importDefault(require("./db/dbController"));
const DEFAULT_PORT = 8010;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/auth', authRouter_1.default);
dotenv_1.default.config();
const PORT = process.env.PORT || DEFAULT_PORT;
app.get('/', (req, res) => res.status(200).send(`ok ${Date.now()}`));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(PORT, () => console.log(`Server listening on PORT = ${PORT}`));
            yield dbController_1.default.connect();
        }
        catch (err) {
            console.error(err);
        }
    });
}
main();

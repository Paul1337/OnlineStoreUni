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
const promise_1 = __importDefault(require("mysql2/promise"));
const configController_1 = __importDefault(require("../config/configController"));
class DBController {
    constructor() {
        this.options = configController_1.default.config.databaseConnection;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('connecting..');
                this.connection = yield promise_1.default.createConnection(this.options);
                // this.connection
                //     .query('insert into User (name, role) values ("test", "user")')
                //     .then((res) => {
                //         console.log(res);
                //     })
                //     .catch((err) => {
                //         console.log('Err', err);
                //     });
                // await this.connection.connect();
            }
            catch (err) {
                console.error('Connection error:', err);
            }
        });
    }
}
const dbController = new DBController();
exports.default = dbController;

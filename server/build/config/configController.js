"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ConfigController {
    constructor() {
        this.config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/', 'config.json'), 'utf-8'));
    }
}
const configController = new ConfigController();
exports.default = configController;

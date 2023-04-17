import fs from 'fs';
import path from 'path';
import { IConfig } from './config.model';

class ConfigController {
    public config: IConfig;

    constructor() {
        this.config = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/', 'config.json'), 'utf-8')
        );
    }
}

const configController = new ConfigController();
export default configController;

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import configController from '../config/configController';

class DBController {
    private options: mysql.ConnectionOptions;
    public connection?: mysql.Connection;

    constructor() {
        this.options = configController.config.databaseConnection;
    }

    async connect() {
        try {
            console.log('connecting..');
            this.connection = await mysql.createConnection(this.options);
            // this.connection
            //     .query('insert into User (name, role) values ("test", "user")')
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => {
            //         console.log('Err', err);
            //     });
            // await this.connection.connect();
        } catch (err) {
            console.error('Connection error:', err);
        }
    }
}

const dbController = new DBController();
export default dbController;

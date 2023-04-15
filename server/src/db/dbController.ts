import * as mysql from 'mysql2/promise';

class DBController {
    private options: mysql.ConnectionOptions;
    public connection?: mysql.Connection;

    constructor() {
        this.options = {
            host: 'm130.ru',
            user: 'root',
            password: 'b2144_1372asdfGWn',
            database: 'OnlineStoreUni',
            // port: 3306,
        };
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection(this.options);
            await this.connection.connect();
        } catch (err) {
            console.error('Connection error:', err);
        }
    }
}

const dbController = new DBController();
export default dbController;

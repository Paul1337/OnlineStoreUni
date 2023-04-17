import * as mysql from 'mysql2/promise';

export interface IConfig {
    secretKey: string;
    databaseConnection: mysql.ConnectionOptions;
}

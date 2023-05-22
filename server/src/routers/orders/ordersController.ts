import { Request, Response } from 'express';
import dbController from '../../db/dbController';
import { RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';
import { generateAccessToken, getSecretKey } from '../auth/utils';
import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../auth/auth.model';

interface IOrderItem {
    id: number;
    count: number;
    price: number;
}

interface IOrderRequest {
    items: IOrderItem[];
}

export const ordersControler = {
    tryOrder: async (req: Request<{}, {}, IOrderRequest>, res: Response) => {
        try {
            const { items } = req.body;
            const user_id = (req.tokenPayload as IJWTPayload).id;
            const userQueryResult = await dbController.connection?.query<RowDataPacket[]>(
                `select * from User where id = ${user_id}`
            );
            if (!userQueryResult) throw new Error('User not found!');

            const user = userQueryResult[0][0];
            const balance = user.balance;
            const price = items.reduce((acc, cur) => acc + cur.price * cur.count, 0);

            console.log(`User balance = ${balance}; Price = ${price}`);

            const newBalance = balance - price;
            if (newBalance < 0) {
                return res.status(400).json({
                    message: 'Not enough cash',
                });
            }

            console.log('Enough!');

            const insertedOrderQuery = await dbController.connection?.query<OkPacket>(
                `insert into Orders (user_id, date, price) values (${user.id}, now(), ${price})`
            );
            if (!insertedOrderQuery) throw new Error('Sql error');

            await dbController.connection?.query<OkPacket>(
                `update User set balance = ${newBalance} where id = ${user.id}`
            );

            const orderId = insertedOrderQuery[0].insertId;
            const orderProducts = [];
            for (let item of items) {
                orderProducts.push(
                    dbController.connection?.query<OkPacket>(
                        `insert into OrderProduct (order_id, product_id, product_count) values (${orderId}, ${item.id}, ${item.count})`
                    )
                );
            }

            await Promise.all(orderProducts);

            // recalculation of token
            const userData = {
                id: user.id,
                name: user.name,
                role: user.role,
                balance: newBalance,
                email: user.email,
            };
            const token = generateAccessToken(userData);
            res.cookie('authToken', token, {
                httpOnly: true,
                // maxAge: 1000 * 60 * 60 * 48
            });

            res.json({
                message: 'ok',
                newBalance: newBalance,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: `Order error` });
        }
    },

    fetch: async (req: Request, res: Response) => {
        try {
            const user_id = (req.tokenPayload as IJWTPayload).id;
            console.log(`User id = ${user_id}`);
            const queryResult = await dbController.connection?.query<RowDataPacket[]>(
                `select ord.id as order_id, ord.date as date, ord.price as total_price, ordPr.product_count as count, pr.* from User usr 
                    join Orders ord on ord.user_id = usr.id 
                    join OrderProduct ordPr on ordPr.order_id = ord.id 
                    join Product pr on pr.id = ordPr.product_id
                    where usr.id = ${user_id} 
                    order by order_id`
            );
            const rows = queryResult?.[0];
            console.log(rows);
            if (!rows) throw new Error('Could not fetch orders');

            const orders: any = {};

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (!orders[row.order_id]) {
                    orders[row.order_id] = {
                        price: row.total_price,
                        date: row.date,
                        products: [],
                    };
                }
                orders[row.order_id].products.push({
                    count: row.count,
                    id: row.id,
                    title: row.name,
                    description: row.description,
                    img: row.image_src,
                    price: row.price,
                });
            }

            res.json({
                message: 'success',
                orders: Object.values(orders),
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch orders error' });
        }
    },
};

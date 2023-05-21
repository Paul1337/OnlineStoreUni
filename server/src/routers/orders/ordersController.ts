import { Request, Response } from 'express';
import dbController from '../../db/dbController';
import { RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';

interface IOrderItem {
    id: number;
    count: number;
    price: number;
}

interface IOrderRequest {
    email: string;
    items: IOrderItem[];
}

export const ordersControler = {
    tryOrder: async (req: Request<{}, {}, IOrderRequest>, res: Response) => {
        try {
            const { email, items } = req.body;

            const queryResult = await dbController.connection?.query<RowDataPacket[]>(
                `select * from User where email = '${email}'`
            );
            if (!queryResult) throw new Error('User not found!');

            const rows = queryResult[0];
            const user = rows[0];

            const balance = user.balance;
            const price = items.reduce((acc, cur) => acc + cur.price * cur.count, 0);

            console.log(`User balance = ${balance}; Price = ${price}`);

            const newBalance = balance - price;
            if (newBalance < 0) {
                throw new Error('Not enough cash!');
            }

            console.log('Enough!');

            // if enough -> new order, success, update user data

            const insertedOrderQuery = await dbController.connection?.query<OkPacket>(
                `insert into Orders (user_id, date, price) values (${user.id}, now(), ${price})`
            );
            if (!insertedOrderQuery) throw new Error('Sql error');

            await dbController.connection?.query<OkPacket>(
                `update User set balance = ${newBalance} where user_id = ${user.id}`
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

            res.json({
                message: 'ok',
                userBalance: newBalance,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Order error' });
        }
    },

    fetch: async (req: Request<{}, {}, {}, { email: string }>, res: Response) => {
        try {
            const { email } = req.query;
            const queryResult = await dbController.connection?.query<RowDataPacket[]>(
                `select id, ord.* from User join Orders ord on ord.user_id = id where email = '${email}' `
            );
            const rows = queryResult?.[0];
            if (!rows) throw new Error('Could not fetch orders');
            res.json({
                message: 'success',
                orders: rows,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch orders error' });
        }
    },
};

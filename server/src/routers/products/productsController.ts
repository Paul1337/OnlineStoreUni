import { Request, Response } from 'express';
import dbController from '../../db/dbController';
import { RowDataPacket } from 'mysql2';

export const productsControler = {
    fetchProducts: async (req: Request, res: Response) => {
        try {
            const queryResult = await dbController.connection?.query(
                `select pr.*, cat.name as category_name from Product pr left join Category cat on cat.id = category_id`
            );
            const rows = queryResult?.[0] as RowDataPacket[];
            console.log('Got products: ');
            console.log(rows);
            return res.json({
                products: rows,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch products error' });
        }
    },
};

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const authController = {
    register: (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Registration error', errors });
            console.log('Handling registration: ', JSON.stringify(req.body));

            const queryResult = await dbController.dbClient.query(
                `select * from public.user where email='${req.body.email}'`
            );
            console.log('Query result:', queryResult.rows);

            if (queryResult.rows.length == 0) {
                const passwordHash = bcrypt.hashSync(req.body.password, 7);
                const insertRes = await dbController.dbClient.query(
                    `insert into public.user (email, first_name, last_name, phone_number, password, role) values ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.phone_number}', '${passwordHash}', 'user')`
                );
                console.log('Insert res:', insertRes);
                res.status(200).json({ message: 'ok' });
            } else if (queryResult.rows.length == 1) {
                res.status(403).json({ message: 'User already exists' });
            } else {
                throw new Error('More than one row with that email!');
            }

            // if no -> registrate user
            // is has some -> error
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Registration error' });
        }
    },
    login: (req: Request, res: Response) => {},
};

export default authController;

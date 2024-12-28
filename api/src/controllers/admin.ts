import {Request, Response, Router} from "express";
import Admin from "@models/Admin";
import bcrypt from "@node-rs/bcrypt";
import jwt from "jsonwebtoken";
import {Op} from "sequelize";
import User from "@models/User";
import authenticate from "@middlewares/auth";

export const adminLoginController = (router: Router) => {
    router.post('/admin/login', async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        try {
            const admin = await Admin.findOne({ where: { email } });

            if (!admin || !(await bcrypt.compare(password, admin.getDataValue('password')))) {
                res.status(401).send({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { id: admin.getDataValue('id'), role: 'admin' },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).send({ message: 'Error during admin login', error });
        }
    });
}

export const adminUserController = (router: Router) => {
    router.get('/admin/users', authenticate('admin'), async (req: any, res: any): Promise<any> => {
        const { filter, page = '1', limit = '10' } = req.query as {
            filter?: string;
            page?: string;
            limit?: string;
        };

        try {
            const where = filter ? { login: { [Op.like]: `%${filter}%` } } : {};
            const users = await User.findAndCountAll({
                where,
                limit: Number(limit),
                offset: (Number(page) - 1) * Number(limit),
            });

            return await res.json(users);
        } catch (error) {
            return await res.status(500).send({ message: 'Error fetching users', error });
        }
    });
}


import { Request, Response, Router } from 'express';
import bcrypt from '@node-rs/bcrypt';
import User from '@models/User';
import jwt from 'jsonwebtoken';

const registerController = (router: Router) => {
  router.post(
    '/register',
    async (req: Request, res: Response): Promise<void> => {
      const { login, email, password, confirmPassword } = req.body as {
        login: string;
        email: string;
        password: string;
        confirmPassword: string;
      };

      if (password !== confirmPassword) {
        res.status(400).send({ message: 'Passwords do not match' });
        return;
      }
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          login,
          email,
          password: hashedPassword,
        });

        const token = jwt.sign(
          { id: user.getDataValue('id'), role: 'user' },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );

        res.json({ token });
      } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
      }
    }
  );
};

export default registerController;

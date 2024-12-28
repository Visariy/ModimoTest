import { Request, Response, Router } from 'express';
import User from '@models/User';
import bcrypt from '@node-rs/bcrypt';
import jwt from 'jsonwebtoken';

const loginController = (router: Router) => {
  router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    try {
      const user = await User.findOne({ where: { email } });

      if (
        !user ||
        !(await bcrypt.compare(password, user.getDataValue('password')))
      ) {
        res.status(401).send({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { id: user.getDataValue('id'), role: 'user' },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).send({ message: 'Error during login', error });
    }
  });
};

export default loginController;

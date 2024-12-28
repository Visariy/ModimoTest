import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type Role = 'user' | 'admin';

const authenticate = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization as string)?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
        role: Role;
      };

      if (decoded.role !== role) {
        res.status(403).json({ message: 'Forbidden' });
        return next();
      }

      req.body.userId = decoded.id;
      return next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return next(error);
    }
  };
};

export default authenticate;

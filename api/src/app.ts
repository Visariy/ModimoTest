import express, { Express, Router } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const app = async () => {
  const expressApp: Express = express();
  expressApp.use(express.json());
  expressApp.use(cors());
  const routesPath = path.join(__dirname, 'routes');
  const files = fs.readdirSync(routesPath);
  for (const file of files) {
    if (file.endsWith('Route.ts')) {
      const route: Router = (await import(path.join(routesPath, file))).default;
      expressApp.use('/api', route);
    }
  }
  return expressApp;
};

export default app;

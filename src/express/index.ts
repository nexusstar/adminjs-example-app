/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import AdminJS from 'adminjs';
import Express from '@adminjs/express';
import 'dotenv/config';

import AdminJSOptions from '../admin';
import initSequelize from '../adapters/sequelize/init';

const app = express();
const adminJS = new AdminJS(AdminJSOptions);

const ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

// const router = AdminJSExpress.buildRouter(adminJS) when no authenticated routes
const router = Express.buildAuthenticatedRouter(
  adminJS,
  {
    authenticate: async (email: string, password: string) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN;
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'somepassword',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  },
);

const run = async () => {
  initSequelize();

  if (process.env?.MONGO_URL !== undefined) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  app.use(adminJS.options.rootPath, router);

  app.listen(8080, () =>
    console.log('AdminJS is available under localhost:8080/admin'),
  );
};

run();

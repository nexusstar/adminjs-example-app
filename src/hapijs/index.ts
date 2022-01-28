/* eslint-disable no-console */
import Hapi from '@adminjs/hapi';
import mongoose from 'mongoose';

import AdminJSOptions from '../admin';

const ADMIN = {
  password: 'password',
  email: 'admin@example.com',
};

const start = async () => {
  try {
    const server = Hapi.server({
      port: process.env.PORT || 8080,
    });
    
    if (process.env?.MONGO_URL !== undefined){
      await mongoose.connect(process.env.MONGO_URL);
    }

    await server.register({
      plugin: Hapi,
      options: {
        ...AdminJSOptions,
        auth: {
          authenticate: async (email: string, password: string) => {
            if (ADMIN.password === password && email === ADMIN.email) {
              return {
                title: 'Administrator',
                ...ADMIN,
              };
            }
            return null;
          },
          strategy: 'session',
          cookieName: 'adminjs-cookie',
          cookiePassword:
            process.env.COOKIE_PASSWORD ||
            'makesurepasswordissecuremakesurepasswordissecure',
          isSecure: false,
          defaultMessage: 'Login: test@example.com, Password: password',
        },
      },
    });

    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

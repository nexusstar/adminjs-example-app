import { FavouritePlace, UserProfile, User, Test } from './models';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV !== 'test';

const dbInit = () =>
  Promise.all([
    FavouritePlace.sync({ alter: isDev || isTest }),
    UserProfile.sync({ alter: isDev || isTest }),
    User.sync({ alter: isDev || isTest }),
    Test.sync({ alter: isDev || isTest }),
  ]);

export default dbInit;

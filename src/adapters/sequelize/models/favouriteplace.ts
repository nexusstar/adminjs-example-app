import { DataTypes } from 'sequelize';
import sequelize from '../config';

const FavouritePlace = sequelize.define(
  'FavouritePlace',
  {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    publishedAt: DataTypes.DATE,
  },
);

export default FavouritePlace;

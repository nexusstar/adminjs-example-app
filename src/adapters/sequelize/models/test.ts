import { DataTypes } from 'sequelize';
import sequelize from '../config';

const Test = sequelize.define(
  'Test',
  {
    name: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
  },
);

export default Test;

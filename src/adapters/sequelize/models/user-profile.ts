import { DataTypes } from 'sequelize';
import sequelize from '../config';

const UserProfile = sequelize.define(
    'UserProfile',
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {},
  );

export default UserProfile;

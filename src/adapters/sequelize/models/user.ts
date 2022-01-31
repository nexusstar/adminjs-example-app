import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';

import sequelize from '../config';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  isMyFavourite: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    validate: { len: [3, 20] },
  },
  lastName: DataTypes.STRING,
  gender: DataTypes.ENUM('male', 'female'),
  isMyFavourite: DataTypes.BOOLEAN,
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
});

export default User;

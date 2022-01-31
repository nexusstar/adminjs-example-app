import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config';

interface UserProfileAttributes {
  user_id: string;
  name: string;
}

interface UserProfileCreationAttributes extends Optional<UserProfileAttributes, 'user_id'> {}

interface UserProfileInstance extends Model<UserProfileAttributes, UserProfileCreationAttributes>, UserProfileAttributes {}

const UserProfile = sequelize.define(
  'UserProfile',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name:{
      type: DataTypes.STRING,
    } 
  },
  {},
);

export default UserProfile;

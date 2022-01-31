import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config';
import User, {UserInstance} from './user';

interface FavAttributes {
  id?: string;
  name: string;
  description: string;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

interface FavCreationAttributes extends Optional< FavAttributes, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'> {}
interface FavInstance extends Model<FavAttributes, FavCreationAttributes>, FavAttributes {
  userId: UserInstance;
}
const FavouritePlace = sequelize.define<FavInstance>(
  'FavouritePlace',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    publishedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  },
);

FavouritePlace.belongsToMany(User, { through: 'UserFavouritePlace'});
User.belongsToMany(FavouritePlace, { through: 'UserFavouritePlace'});

export default FavouritePlace;

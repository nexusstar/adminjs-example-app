import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config';
interface TestAttributes {
  id: string;
  name: string;
  text: string;
}
  interface TestCreationalAttributes extends Optional<TestAttributes, 'id'>{}
  interface TestInstance extends Model<TestCreationalAttributes, TestAttributes>, TestAttributes {}

const Test = sequelize.define<TestInstance>(
  'Test',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
  },
);

export default Test;

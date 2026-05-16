import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true, // j model name xa teii table ko name banauxa database ma
    timestamps: true,
  }
)

export default User

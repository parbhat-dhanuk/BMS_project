import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import logger from '../utils/logger.js'
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database Connected Successfully')
    await sequelize.sync()
    logger.info("All models were synchronized successfully.");
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}

export { sequelize, connectDB }

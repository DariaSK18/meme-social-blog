import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

if (process.env.DB_PASSWORD === "your_db_password!") {
  console.error("Please update the .env file with your database password.");
  process.exit(1);
}

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
      }
    );

export default sequelize;

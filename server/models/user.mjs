import { Model, Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";
import { hashPassword } from "../utils/helpers/hashPassword.mjs";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    hooks: {
      beforeCreate: (newUserData) => {
        newUserData.password = hashPassword(newUserData.password);
        return newUserData;
      },
      beforeUpdate: (updatedUserData) => {
        updatedUserData.password = hashPassword(updatedUserData.password);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

export default User;

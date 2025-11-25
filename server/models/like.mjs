import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    meme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "meme",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "like",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "meme_id"],
      },
    ],
  }
);

export default Like;


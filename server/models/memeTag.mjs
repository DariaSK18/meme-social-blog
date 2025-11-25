import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.mjs";

class MemeTag extends Model {}

MemeTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    meme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "meme",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "meme_tag",
    indexes: [
      {
        unique: true,
        fields: ["meme_id", "tag_id"],
      },
    ],
  }
);

export default MemeTag;


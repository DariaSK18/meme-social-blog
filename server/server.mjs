import app from "./app.mjs";
import sequelize from "./config/connection.mjs";
import "./models/index.mjs";
import { uploadImage } from "./utils/helpers/imageManager.mjs";
// import dotevn from "dotenv";

// dotevn.config();

uploadImage("./img/img.png")
// const image=fetchImage("")
// console.log(image);


const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const rebuild = process.argv[2] === "--rebuild";

sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
    console.log(`http://${HOST}:${PORT}`);
  });

});


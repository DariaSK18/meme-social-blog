import app from "./app.mjs";
import sequelize from "./config/connection.mjs";
import "./models/index.mjs";


const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";



const rebuild = process.argv[2] === "--rebuild";


sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
    console.log(`http://${HOST}:${PORT}`);
  });

});
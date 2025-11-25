import app from "./app.mjs";

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
});

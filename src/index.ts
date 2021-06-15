import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.TESTING);

import app from "./app";
import "./database";

function init() {
  app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}
init();

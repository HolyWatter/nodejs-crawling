import express from "express";
import bodyParser from "body-parser";
import controller from "./src/crawling-controller.js";

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(controller);

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});

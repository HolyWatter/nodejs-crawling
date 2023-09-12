import { Router } from "express";
import { crawling } from "./crawling-service.js";

const controller = Router();

controller.route("/").get(crawling);

export default controller;

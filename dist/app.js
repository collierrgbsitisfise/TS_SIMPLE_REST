"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const LinkController = require("./controllers/link");
const app = express();
app.set("port", 3000);
//Routest
app.get("/", LinkController.createEasyLink);
app.listen(app.get("port"), () => {
    console.log('app running');
});
//# sourceMappingURL=app.js.map
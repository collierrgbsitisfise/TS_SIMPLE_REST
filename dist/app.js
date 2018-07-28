"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express( );
app.set("port", 3000);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(app.get("port"), () => {
    console.log('app running');
});
//# sourceMappingURL=app.js.map
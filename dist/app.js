"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const LinkController = require("./controllers/link");
const ProxyController = require("./controllers/proxy");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const API_PREFIX_ES_LINK = "/api/v1/es-link";
const API_PREFIX_PROXY = "/api/v1/proxy";
const mongoDbUriConnect = "mongodb://admin:vadim1@ds247330.mlab.com:47330/easy-links-db";
mongoose.connect(mongoDbUriConnect, (err) => {
    if (err) {
        console.error("error conncetion");
        return;
    }
    console.warn("success connection to mongodb");
});
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//Routest
/*API - easy link enpoints*/
app.get(`${API_PREFIX_ES_LINK}/create-es-link`, LinkController.createEasyLink);
app.get(`${API_PREFIX_ES_LINK}/get-es-link/:hash`, LinkController.getEasyLink);
app.get(`${API_PREFIX_ES_LINK}/redirect-es-link/:hash`, LinkController.redirectEasyLinkByHash);
app.get(`${API_PREFIX_ES_LINK}/:hash`, LinkController.redirectEasyLinkByHash);
app.get(`${API_PREFIX_PROXY}/`, ProxyController.getAllProxy);
app.get(`/:hash`, LinkController.redirectEasyLinkByHash);
app.listen(app.get("port"), () => {
    console.warn(`app running on PORT: ${app.get('port')}`);
});
//# sourceMappingURL=app.js.map
import * as express from "express";
import * as LinkController from "./controllers/link";
import * as ProxyController from "./controllers/proxy";
import * as GifPovarController from "./controllers/gif-povar";
import * as PovarenokController from "./controllers/povarenok";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as morgan  from "morgan";
import * as cors  from "cors";
import * as path  from "path";
import { Request, Response } from 'express';


const app: any = express();
const API_PREFIX_ES_LINK: string = "/api/v1/es-link";
const API_PREFIX_PROXY: string = "/api/v1/proxy";
const API_PREFIX_GIF_POVAR: string = "/api/v1/gif-povar"
const API_PREFIX_POVARENOK: string = "/api/v1/povarenok"
const mongoDbUriConnect: string = "mongodb://admin:vadim1@ds247330.mlab.com:47330/easy-links-db";

mongoose.connect(
    mongoDbUriConnect,
    (err: any) => {
        if (err) {
          console.error("error conncetion");
          return;
        }

        console.warn("success connection to mongodb");
      }
);

/*  Midalwares */
app.set("port",  process.env.PORT || 5000);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/* Serve static files */

// statics www files
app.use(express.static(path.join(__dirname, '../www')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../www', 'index.html'));
});

//Routest

/*API - easy link enpoints*/
app.get(`${API_PREFIX_ES_LINK}/create-es-link`, LinkController.createEasyLink);
app.get(`${API_PREFIX_ES_LINK}/get-es-link/:hash`, LinkController.getEasyLink);
app.get(`${API_PREFIX_ES_LINK}/redirect-es-link/:hash`, LinkController.redirectEasyLinkByHash);
app.get(`${API_PREFIX_ES_LINK}/:hash`, LinkController.redirectEasyLinkByHash);
app.get(`${API_PREFIX_PROXY}/`, ProxyController.getAllProxy);
app.get(`${API_PREFIX_GIF_POVAR}/`, GifPovarController.getAllGifPovarCooks);
app.get(`${API_PREFIX_POVARENOK}/`, PovarenokController.getAllPovarenokCooks)
app.get(`/:hash`, LinkController.redirectEasyLinkByHash);

app.listen(app.get("port"), () => {
  console.warn(`app running on PORT: ${app.get('port')}`);
});

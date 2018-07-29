import * as express from "express";
import * as LinkController from "./controllers/link";
import * as mongoose from "mongoose";

const app: any = express();
const API_PREFIX: string = "/api/v1/es-link";
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

app.set("port",  process.env.PORT || 5000);

//Routest

/*API - easy link enpoints*/
app.get(`${API_PREFIX}/create-es-link`, LinkController.createEasyLink);
app.get(`${API_PREFIX}/get-es-link/:hash`, LinkController.getEasyLink);
app.get(`${API_PREFIX}/redirect-es-link/:hash`, LinkController.redirectEasyLinkByHash);
app.get(`${API_PREFIX}/:hash`, LinkController.redirectEasyLinkByHash);

app.listen(app.get("port"), () => {
  console.warn(`app running on PORT: ${app.get('port')}`);
});

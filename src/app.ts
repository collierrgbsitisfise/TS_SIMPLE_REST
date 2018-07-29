import * as  express from 'express';
import * as LinkController from './controllers/link';
const app = express();

app.set("port", 3000);


//Routest
app.get("/", LinkController.createEasyLink);

app.listen(app.get("port"), () => {
    console.log('app running');
});
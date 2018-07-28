import * as  express from "express";

const app = express();

app.set("port", 3000);

app.get("/", (req: any, res: any) => {
    res.send("Hello World");
});

app.listen(app.get("port"), () => {
    console.log('app running');
});
import experss from "express";
import { ENV } from "./config/env.js";

const app = experss();

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(ENV.PORT, () => console.log("Server is running on: ", ENV.PORT));
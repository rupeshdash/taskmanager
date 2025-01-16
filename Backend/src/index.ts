import {app} from "./app";
import dotenv from "dotenv";
import {setupSocket} from "./socket"
dotenv.config()
const port = process.env.PORT || 5000;

const server = app.listen(port,()=>{
  console.log(`listening on port ${port}`)
})

setupSocket(server);
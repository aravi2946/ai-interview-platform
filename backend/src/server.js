import express from "express"
import { ENV } from "./lib/env.js"



const app = express()

app.listen(ENV.PORT, () => {
    console.log("Server running at port:3000");
    
})


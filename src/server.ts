import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

import app from "./app.ts"


const db = process.env.DATABASE
if (!db) {
  throw new Error("env variable for db is undefined")
}

mongoose.connect(db).then(()=> {
  console.log('database connected successfully')
})





app.listen(3000, ()=> {
  console.log('app listening in port 3000')
})

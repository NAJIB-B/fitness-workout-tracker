import mongoose from "mongoose"
import dotenv from "dotenv"

import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Exercise from "../src/models/exerciseModel.js"


const fileUrl = fileURLToPath(import.meta.url)
const __dirname = dirname(fileUrl)




dotenv.config({path: '../.env'})


const exercises = JSON.parse(fs.readFileSync(`${__dirname}/exercise.json`, 'utf8'))

mongoose.connect("").then(()=> {
  console.log('database connected successfully')
})


const importData = async() => {
  try {
    
  await Exercise.create(exercises, {validateBeforeSave: false})
    console.log('exercises uploaded successfully')
  } catch (error) {
  console.log(error)  
  }
}

const deleteData = async() => {
  try {
    
  await Exercise.deleteMany()
    console.log('exercises deleted successfully')
  } catch (error) {
  console.log(error)  
  }
}

if (process.argv[2] === '--import') {
  importData()
}

if (process.argv[2] === '--delete') {
  deleteData()
}


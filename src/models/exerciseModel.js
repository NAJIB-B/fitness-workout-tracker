
import { Schema, model, Document } from "mongoose";

const exerciseShema = new Schema({
  name: {
    type: String,
    required: [true, 'An exercise must have a name']
  },
  category: {
    type: String,
    required: [true, 'An exercise must have a category']
  },
  muscleGroup: {
    type: String,
    required: [true, 'An exercise must have a muscle group']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An exercise must have an owner']
  },
  description: String
}, {timestamps: true});


const Exercise = model('Exercise', exerciseShema)

export default Exercise

import { Schema, model, Document } from "mongoose";
import Joi, { object } from "joi";


enum ExercisCategory {
  STRENGTH = "strength",
  CARDIO = "cardio",
  FLEXIBILITY = "flexibility",
  BALANCE = "balance",
  HIIT = "hiit",
  YOGA = "yoga",
  PILATES = "pilates",
  AEROBICS = "aerobics",
}

enum MuscleGroup {
  CHEST = "chest",
  BACK = "back",
  LEGS = "legs",
  ARMS = "arms",
  SHOULDERS = "shoulders",
  CORE = "core",
  FULL_BODY = "full-body",
}

export const schema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().valid(...Object.values(ExercisCategory)).required(),
  muscleGroup: Joi.string().valid(...Object.values(MuscleGroup)).required(),
  owner: Joi.string().required(),
  description: Joi.string()
});

export interface IExercise extends Document {
  name: string;
  category: ExercisCategory;
  muscleGroup: MuscleGroup;
  owner: Schema.Types.ObjectId;
  description?: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const exerciseShema = new Schema<IExercise>({
  name: {
    type: String,
    required: [true, 'An exercise must have a name'],
    unique: true
  },
  category: {
    type: String,
    enum: Object.values(ExercisCategory),
    required: [true, 'An exercise must have a category']
  },
  muscleGroup: {
    type: String,
    enum: Object.values(MuscleGroup),
    required: [true, 'An exercise must have a muscle group']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An exercise must have an owner']
  },
  description: String
}, {timestamps: true});


const Exercise = model<IExercise>('Exercise', exerciseShema)

export default Exercise

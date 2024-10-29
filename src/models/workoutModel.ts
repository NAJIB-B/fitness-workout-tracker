import { Schema, model, Document } from "mongoose";
import Joi, { required } from "joi";

interface IExercise {
  exercise: Schema.Types.ObjectId;
  sets: number;
  reps: number;
  weight?: number;
}

const exerciseSchma = Joi.object({
  exercise: Joi.string().required(),
  sets: Joi.number().required(),
  reps: Joi.number().required(),
  weight: Joi.number().optional(),
});

export enum Status {
  pending = "pending",
  completed = "completed",
  active = "active",
  missed = "missed",
}

export const schema = Joi.object({
  name: Joi.string().required(),
  exercises: Joi.array().items(exerciseSchma).required(),
  owner: Joi.string().required(),
  scheduledDate: Joi.string().required(),
  isReoccuring: Joi.boolean().required(),
});

export interface IWorkout {
  name: string;
  exercises: IExercise[];
  owner: Schema.Types.ObjectId;
  status?: Status;
  scheduledDate: Date;
  isReoccuring: boolean;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: [true, "A workout must have a name"],
      unique: true,
    },
    exercises: [
      {
        exercise: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
        },
        sets: Number,
        reps: Number,
        weight: Number,
      },
    ],
    isReoccuring: {
      type: Boolean,
      required: [
        true,
        "You need to specify if the workout is reoccuring or not",
      ],
    },
    scheduledDate: {
      type: Date,
      required: [true, "Specify a date for your workout"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A workout must an owner"],
      index: 1
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.pending,
    },
  },
  { timestamps: true },
);

const Workout = model<IWorkout>("Workout", workoutSchema);

export default Workout;

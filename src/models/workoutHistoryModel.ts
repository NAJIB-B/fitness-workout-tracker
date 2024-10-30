import { Schema, model, Document } from "mongoose";
import Joi from "joi";

export const schema = Joi.object({
  workout: Joi.string().required(),
  owner: Joi.string().required(),
});

interface IWorkoutHistory {
  workout: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}


const workoutHistorySchema = new Schema<IWorkoutHistory>(
  {
    workout: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: [true, "A workout history must have a workout"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A workout history must have an owner"],
      index: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

workoutHistorySchema.virtual("comment", {
  ref: "Comment",
  foreignField: "workoutHistory",
  localField: "_id",
});


const WorkoutHistory = model<IWorkoutHistory>(
  "WorkoutHistory",
  workoutHistorySchema,
);

export default WorkoutHistory;

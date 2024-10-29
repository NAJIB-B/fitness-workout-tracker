
import {Schema, model, Document} from "mongoose"
import Joi from "joi"


export const schema = Joi.object({
  workout: Joi.string().required(),
  workoutHistory: Joi.string().required(),
  owner: Joi.string().required(),
  comment: Joi.string()
})

interface IComment {
  workout:  Schema.Types.ObjectId,
  workoutHistory:  Schema.Types.ObjectId,
  owner: Schema.Types.ObjectId,
  comment: string,
  createdAt: string,
  updatedAt: string
}

const commentSchema = new Schema<IComment>({
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: [true, 'A comment must have a workout']
  },
  workoutHistory: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutHistory',
    required: [true, 'A comment must have a workout history']
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A comment must have an owner']
  },
  comment: {
    type: String,
    required: [true, 'A comment must have a comment']
  }
}, {timestamps: true})


const Comment = model<IComment>('Comment', commentSchema)

export default Comment




import {Schema, model, Document} from "mongoose"
import Joi from "joi"
import bcrypt from "bcrypt"


export const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
})


export interface IUser extends Document{
  name: string,
  email: string,
  password: string,
  correctPassword: (candidatePassword: string, userPassword: string) => boolean
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true 
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    min: [8, 'A user password must contain atleast 8 characters']
  }

})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
})


userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = model<IUser>('User', userSchema)

export default User

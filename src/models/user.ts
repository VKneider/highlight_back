import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

export interface IUser extends Document {
  email: string;
  username:string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>;
  updateData: (userData: {
    username?: string;
    password?: string;
  }) => Promise<Boolean>;
  createToken:(user:IUser)=>Promise<string>;
};

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
  password: {
    type: String,
    required: true
  }
});


userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.updateData = async function(
  userData: { username?: string; password?: string }
): Promise<Boolean> {
  const user = this;

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    userData.password = hash;
  }

  if(userData.username) user.username = userData.username;

  await user.save();

  return true;
}

userSchema.methods.createToken = async function(user:IUser):Promise<string>{
  return jwt.sign(
    {id:user.id, email:user.email},
     process.env.JWT_SECRET || "secret",
    {expiresIn: 60*60*24*7}
  )
}

  

const userCollection = model<IUser>("UserCollection", userSchema);

export default userCollection;
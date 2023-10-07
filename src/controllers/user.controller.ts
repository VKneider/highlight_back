import UserCollection, {IUser} from "../models/user.js";
import NoteCollection from "../models/note.js";

import { Request, Response } from "express";
export default class UserController {

   static deleteUser = async (req:Request,res:Response)=>{
        const {id} = req.body;
        const deletedUser = await UserCollection.findByIdAndDelete(id);
        await NoteCollection.deleteMany({user:id});
        //lo mismo pero para carpetas
        res.json({message:"User deleted"});

   }

    static getUserData = async (req:Request,res:Response)=>{
          const {id} = req.body;
          const user = await UserCollection.findById(id);
          if(user){
              res.json(user);
          }else{
                res.json({message:"User not found"});
          }
    }

    static updateUserData = async (req:Request,res:Response)=>{
        
        const {email,username,password} = req.body;

        const user = new UserCollection({
            email,
            username,
            password
        }); 
    }

}
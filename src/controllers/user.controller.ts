import UserCollection, {IUser} from "../models/user.js";
import NoteCollection from "../models/note.js";

import { Request, Response } from "express";
export default class UserController {

   static deleteUser = async (req:Request,res:Response)=>{
        const {id} = req.body;
        const user = await UserCollection.findById(id);
        if(!user) return res.status(404).json({message:"User not found"});

        await user.deleteOne();
        
        await NoteCollection.deleteMany({user:id});
        //lo mismo pero para carpetas
        res.json({message:"User deleted"});

   }

    static getUserData = async (req:Request,res:Response)=>{
          const {id} = req.body;
          const user = await UserCollection.findById(id);
          if(user){
              res.json({message:"User found",user:{username:user.username,email:user.email}});
          }else{
                res.json({message:"User not found"});
          }
    }

    static updateUserData = async (req:Request,res:Response)=>{
        
        const {id} = req.body;

        const user = await UserCollection.findById(id);
        if(!user) return res.status(404).json({message:"User not found"});

        await user.updateData(req.body);
        return res.json({message:"User updated"});
    }

}
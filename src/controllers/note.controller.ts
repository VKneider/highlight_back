import NoteCollection from "../models/note";
import {Request,Response} from "express";

export default class noteController{        
    
        static getNotesByFolderId = async (req:Request,res:Response)=>{
            const notes = await NoteCollection.find({folder:req.body.folderId});
            res.json(notes);
        }

        

        static deleteNote = async (req:Request,res:Response)=>{
            await NoteCollection.findByIdAndDelete(req.body.id);
            res.json({message:"Note deleted"});
        }
}

import NoteCollection from "../models/note.js";
import {Request,Response} from "express";

export default class noteController{        
    
        static getNotesByFolderId = async (req:Request,res:Response)=>{
            const notes = await NoteCollection.find({folder:req.body.folderId});
            res.json(notes);
        }

        static getNotesByUserId = async (req:Request,res:Response)=>{
            const notes = await NoteCollection.find({user:req.body.userId});
            res.json(notes);
        }

        static createNote = async (req:Request,res:Response)=>{
            const {title,content,folder,user} = req.body;
            const note = new NoteCollection({
                title,
                folder,
                user
            });
            await note.save();
            res.json({message:"Note created"});
        }

        static updateNote = async (req:Request,res:Response)=>{
            
            const note = await NoteCollection.findOne({_id:req.body.noteId});
            note?.updateNote(req.body);
            res.json({message:"Note updated"});
        }

        

        static deleteNote = async (req:Request,res:Response)=>{
            await NoteCollection.findByIdAndDelete(req.body.id);
            res.json({message:"Note deleted"});
        }
}

import NoteCollection from "../models/note.js";
import {Request,Response} from "express";

export default class noteController{        
    
        static getNotesByFolderId = async (req:Request,res:Response)=>{
           try {
            const notes = await NoteCollection.find({folder:req.body.folderId});
            res.status(200).json({message:"Notes found for requested folder:",notes:notes});
           } catch (error:any) {
            res.status(500).json({message:error.message,notes:[]});
           }
        }


        static getNotesByUserId = async (req:Request,res:Response)=>{
            try {
             const notes = await NoteCollection.find({userId:req.body.userId});

             if(!notes) return res.status(404).json({message:"Notes not found", notes:[]});

             res.status(200).json({message:"Notes found for requested user:",notes:notes});
            } catch (error:any) {
                res.status(500).json({message:error.message,notes:[]});
            }
         }


        static createNote = async (req:Request,res:Response)=>{
            const {title,description,folderId,userId} = req.body;

            let obj = {
                title:title,
                folderId:folderId,
                userId:userId,
                description:description
            }
            console.log(obj)


            const note = new NoteCollection(obj);
            await note.save();
            res.json({message:"Note created"});
        }


        static updateNote = async (req:Request,res:Response)=>{
            try {
                const note = await NoteCollection.findOne({_id:req.body.noteId});
                if(!note) return res.status(404).json({message:"Note not found"});
                await note?.updateNote(req.body);

                return note;

            } catch (error:any) {
                res.status(400).json({message:error.message});
            }
            res.json({message:"Note updated"});
        }

        
        

        static deleteNote = async (req:Request,res:Response)=>{
            const {noteId} = req.body;

            const note = await NoteCollection.findById(noteId);
            if(!note) return res.status(404).json({message:"Note not found"});

            await note.deleteOne();

            res.json({message:"Note deleted"});
        }
}

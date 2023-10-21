import {Request,Response} from "express";
import FolderCollection from "../models/folder.js";
import NoteCollection from "../models/note.js";

export default class FolderController{

    constructor(){}

    static getFoldersByUserId = async (req:Request,res:Response)=>{
        try {
            const folders = await FolderCollection.find({userId:req.body.userId});
            if(!folders) return res.status(404).json({message:"Folders not found", folders:[]});
            res.status(200).json({message:"Folders found for requested user:",folders:folders});
        } catch (error:any) {
            res.status(500).json({message:error.message,folders:[]});
        }
    }

    static createFolder = async (req:Request,res:Response)=>{
        const {name,userId} = req.body;

        const folder = new FolderCollection({
            name,
            userId
        });

        await folder.save();
        res.json({message:"Folder created"});
    }

    static async updateFolder(req:Request,res:Response){
        const {folderId:id} = req.body;
        const folder = await FolderCollection.findById(id);
        if(!folder) return res.status(404).json({message:"Folder not found"});
        await folder.updateFolder(req.body);
        return res.json({message:"Folder updated"});
    }

    static async deleteFolder(req:Request,res:Response){
        const {folderId:id} = req.body;
        const folder = await FolderCollection.findById(id);
        if(!folder) return res.status(404).json({message:"Folder not found"});
        await folder.deleteOne();
        const notes = await NoteCollection.find({folderId:id});
        if(notes){
            notes.forEach(async (note)=>{
                note.folderId=null!
                note.trashed=true;
                await note.save();
            });
        }
        return res.json({message:"Folder deleted"});
    }

}
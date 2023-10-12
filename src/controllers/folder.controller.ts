import {Request,Response} from "express";
import FolderCollection from "../models/folder.js";
import NoteCollection from "../models/note.js";

export default class FolderController{

    constructor(){}

    static getFoldersByUserId = async (req:Request,res:Response)=>{
        try {
            const folders = await FolderCollection.find({user:req.body.userId});
            if(!folders) return res.status(404).json({message:"Folders not found", folders:[]});
            res.status(200).json({message:"Folders found for requested user:",folders:folders});
        } catch (error:any) {
            res.status(500).json({message:error.message,folders:[]});
        }
    }

    static createFolder = async (req:Request,res:Response)=>{
        const {name,user} = req.body;
        const folder = new FolderCollection({
            name,
            user
        });
        await folder.save();
        res.json({message:"Folder created"});
    }

    async updateFolder(req:Request,res:Response){

    }

}
import { model, Schema, Document } from "mongoose";
import "dotenv/config"

export interface INote extends Document {
  title: string;
  description: string;
  userId: string;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  starred: boolean;
  trashed: boolean;
  color: string;
  updateNote: (noteData: {
    title?: string;
    description?: string;
    starred?: boolean;
    trashed?: boolean;
    color?: string;
  }) => Promise<Boolean>;
  };

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Untitled"
  },
  description:{
    type:String,
    required:true,
    default:""
    
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  folderId: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
    default:null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  },
  starred:{
    type:Boolean,
    default:false
  },
  trashed:{
    type:Boolean,
    default:false
  },
  color:{
    type:String,
    default:"white"
  }
});


noteSchema.methods.updateNote = async function(
  noteData: {
    title?: string;
    description?: string;
    starred?: boolean;
    trashed?: boolean;
    color?: string;
  }
): Promise<Boolean> {
  const note = this;

  if(noteData.title) note.title = noteData.title;
  if(noteData.description) note.description = noteData.description;

  if(noteData.title || noteData.description) note.updatedAt = Date.now();

  if(noteData.starred) note.starred = noteData.starred;
  if(noteData.trashed) note.trashed = noteData.trashed;
  if(noteData.color) note.color = noteData.color;

  await note.save();

  return true;
}



const NoteCollection = model<INote>("Note", noteSchema);




export default NoteCollection;
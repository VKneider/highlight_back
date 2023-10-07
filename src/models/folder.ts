import { model, Schema, Document } from "mongoose";
import "dotenv/config"

export interface IFolder extends Document {
  name: string;
  userId: string;
  createdAt: Date;
  updateFolder: (folderData: {
    name?: string;
  }) => Promise<Boolean>;

  };

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        default: "Untitled"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    });

folderSchema.methods.updateFolder = async function (folderData: {
    name?: string;
}) {
    try {
        if (folderData.name) {
            this.name = folderData.name;
        }
        await this.save();
        return true;
    } catch (error) {
        return false;
    }
}

const FolderCollection = model<IFolder>("Folder", folderSchema);
export default FolderCollection;
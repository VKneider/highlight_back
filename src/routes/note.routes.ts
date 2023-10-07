import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import noteController from '../controllers/note.controller.js';

let noteRouter = Router();
//este router va a comenzar con "/note"


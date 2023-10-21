import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import noteController from '../controllers/note.controller.js';
import passport from 'passport';

let noteRouter = Router();
noteRouter.use(passport.authenticate("jwt", { session: false }));
//este router va a comenzar con "/note"

noteRouter.post('/getAll', validationYup(schemas.idSchema), noteController.getNotesByUserId);

noteRouter.post('/getByFolderId',validationYup(schemas.byFolderIdSchema),noteController.getNotesByFolderId);

noteRouter.post('/',validationYup(schemas.createNoteSchema),noteController.createNote);

noteRouter.put('/',validationYup(schemas.updateNoteSchema),noteController.updateNote);

noteRouter.delete('/',validationYup(schemas.deleteNoteSchema),noteController.deleteNote);


export default noteRouter;
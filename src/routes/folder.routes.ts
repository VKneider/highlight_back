import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import FolderController from '../controllers/folder.controller.js';
import passport from 'passport';
let folderRouter = Router();


folderRouter.use(passport.authenticate("jwt", { session: false }));

folderRouter.post(
    "/getAll",
    validationYup(schemas.idSchema),
    FolderController.getFoldersByUserId
);

folderRouter.post(
    "/",
    validationYup(schemas.createFolderSchema),
    FolderController.createFolder
);

folderRouter.put(
    "/",
    validationYup(schemas.updateFolderSchema),
    FolderController.updateFolder
);

folderRouter.delete(
    "/",
    validationYup(schemas.deleteFolderSchema),
    FolderController.deleteFolder
);

export default folderRouter;
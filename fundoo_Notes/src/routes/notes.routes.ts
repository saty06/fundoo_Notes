import express, { IRouter } from 'express';
import notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import NoteValidator from '../validators/notes.validator';
import uploadStorage from '../services/multer.servive';

class NoteRoutes {
  private NotesController = new notesController();
  private router = express.Router();
  private noteValidator = new NoteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => { 
    
    this.router.put('/update/:id', userAuth, this.noteValidator.updateNote, this.NotesController.updateNote);
    
    this.router.post('/create', userAuth, this.NotesController.createNote);

    this.router.get('/allNotes', userAuth, this.NotesController.getAllNotes);

    this.router.get('/getNote/:id', userAuth, this.NotesController.getNote);

    this.router.post('/archive/:id', userAuth, this.NotesController.archiveNote);

    this.router.post('/trash/:id', userAuth, this.NotesController.trashNote);

    this.router.post('/delete/:id', userAuth, this.NotesController.deleteNote);


// Single file
this.router.post('/upload/single', uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})

//Multiple files
this.router.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
  console.log(req.files)
  return res.send("Multiple files")
})
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;

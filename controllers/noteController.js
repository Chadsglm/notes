const noteService = require('../services/noteService')

const addNote = (req, res) => {
  noteService.addNote(req.body, (err, data) => {
    resolver(err, res, data);
  });
}

const updateNote = (req, res) => {
  noteService.updateNote(req.body, (err, data) => {
    resolver(err, res, data);
  });
}

const deleteNote = (req, res) => {
  noteService.deleteNote(req.params.id, (err, data) => {
    resolver(err, res, data);
  });
}

const findNote = (req, res) => {
  noteService.findNote(req.params.id, (err, data) => {
    resolver(err, res, data);
  });
}

const findAllNote = (req, res) => {
  noteService.findAllNote((err, data) => {
    resolver(err, res, data);
  });
}

const resolver = (err, res, data) => {
  if(err){
    res.status(500).send({error: 'Data could not be saved!'});
  }else{
    res.status(201).send({data: data});
  }
}
module.exports = {
  addNote,
  updateNote,
  deleteNote,
  findNote,
  findAllNote
}
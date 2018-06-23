const Datastore = require('nedb');
const db = new Datastore({
  filename: './data/note.db',
  autoload: true
});


const addNote = (note, callback) => {
  db.insert(note, (err, newNote)=> {
    resolver(err, callback, newNote);
  });
}

const updateNote = (note, callback) => {
  db.update({
    _id:note._id
  }, note, {}, (err, newNote) => {
    resolver(err, callback, newNote);
  });
}

const deleteNote = (id, callback) => {
  db.remove({
    _id: id
  }, {
    multi: true
  }, (err, newNote) =>{
    resolver(err, callback, newNote);
  });
}

const findNote = (id, callback) => {
  db.findOne({
    _id: id
  }, (err, newNote) => {
    resolver(err, callback, newNote);
  });
}

const findAllNote = (callback) => {
  db.find({}, (err, newNote) => {
    resolver(err, callback, newNote);
  });
}

const resolver = (err, callback, newNote) =>{
  if(err){
    callback(err);
  }else {
    callback(null, newNote)
  }
}

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  findNote,
  findAllNote
}
const url = '/note';


fetch(url)
.then((res) => {
  console.log(res)
  return res.json();
})
.then((myJson) => {
  console.log(myJson);
})
.catch((error) => {
  throw Error(error);
});


function getAllNote() {
  return fetch(url);
}

function getNoteById(id) {

}

function AddNote(note) {

}

function UpdateNote(note){

}

function DeleteNote(note) {

}
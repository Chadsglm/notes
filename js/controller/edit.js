function delegatedEditViewEditClick(event){
  if(event.target.classList.contains("saveButton")) {
    let note = extractNote();

    if(GetNoteById(note.id) ){
      UpdateNote(note)
    }
    else {
      AddNote(note);
    }

    event.stopPropagation();
  }
}

function extractNote(){

    let note = {
      id: findById('id').value || new Date().getTime(),
      createDate: new Date(),
      plannedDate: new Date(findById('date').value),
      finishedDate: new Date(),
      isFinished: false,
      title: findById('title').value,
      importance: findById('importance').value,
      description: findById('add-description').value
    }
  return note;
}

function refreshModal(note) {

  let template = Handlebars.compile(editTemplate);
  let renderedListHtml = template(note);

  // add rendered html to the dom
  setHtml(".modal", renderedListHtml);
  findByClass('modal').classList.toggle("show-modal");
}


function  starRating () {
  function addListeners() {
    var stars = document.querySelectorAll('.star');
    [].forEach.call(stars, function(star, index) {
      star.addEventListener('click', (function(idx) {
        console.log('adding rating on', index);
        document.querySelector('.stars').setAttribute('data-rating', idx + 1);
        console.log('Rating is now', idx + 1);
        setRating();
      }).bind(window, index));
    });

  }

  function setRating() {
    var stars = document.querySelectorAll('.star');
    var rating = parseInt(
        document.querySelector('.stars').getAttribute('data-rating'));
    [].forEach.call(stars, function(star, index) {
      if (rating > index) {
        star.classList.add('rated');
        console.log('added rated on', index);
      } else {
        star.classList.remove('rated');
        console.log('removed rated on', index);
      }
    });
  }
}


// dom.ready
addEventHandler(document, "DOMContentLoaded", function(event) {

  addEventHandler(findById("modalContainer"), "click", delegatedEditViewEditClick);

});
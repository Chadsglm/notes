function delegatedEditViewEditClick(event){
  event.stopPropagation();
  if(event.target.classList.contains("saveButton")) {
    let note = extractNote();

    let rest = new RestClient();
    rest.getNoteById(note.id)
        .then(noteItem => {
          if(noteItem && noteItem.id){
            rest.updateNote(note)
                .then(() => {
                  refreshModal({});
                  main();
                })
          }
          else {
            rest.addNote(note)
                .then(() => {
                  refreshModal({});
                  main();
                })
          }
        })
  }
  if(event.target.id == "cancelModal") {
    const modal = findByClass('modal');
    modal.classList.toggle("show-modal");
  }
}

function extractNote(){
    let importance = findByClass('stars');
    importance =  importance ? importance.dataset.rating : 3;
    let selectedStars = [false, false, false, false, false];
    selectedStars = selectedStars.map((item , i ) => (i+1 <= parseInt(importance)) ? true : false );

    let note = {
      id: findById('id').value || new Date().getTime(),
      createDate: new Date(),
      plannedDate: new Date(findById('date').value),
      finishedDate: new Date(),
      isFinished: false,
      title: findById('title').value,
      importance: selectedStars,
      description: findById('add-description').value
    }
  return note;
}

function refreshModal(note) {

  let template = Handlebars.compile(editTemplate);
  let renderedListHtml = template(note);

  // add rendered html to the dom
  setHtml(".modal", renderedListHtml);
  const modal = findByClass('modal');
  modal.classList.toggle("show-modal");
  if(modal.classList.contains("show-modal")) {
    starRating();
  }
}

function  starRating () {
  addListeners();
  setRating();
}

function addListeners() {
  let stars = document.querySelectorAll('.editStar');
  [].forEach.call(stars, function(star, index) {

    star.addEventListener('click', (function(idx) {
      document.querySelector('.stars').setAttribute('data-rating', ++idx);
      setRating();
    }).bind(window, index));
  });

}

function setRating() {
  var stars = document.querySelectorAll('.editStar');
  var rating = parseInt(
      document.querySelector('.stars').getAttribute('data-rating'));
  [].forEach.call(stars, function(star, index) {
    if (rating > index) {
      star.classList.add('rated');
    } else {
      star.classList.remove('rated');
    }
  });
}

// dom.ready
addEventHandler(document, "DOMContentLoaded", function(event) {
  addEventHandler(findById("modalContainer"), "click", delegatedEditViewEditClick);
});
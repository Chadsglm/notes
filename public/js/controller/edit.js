(function (){
  "use strict";

    class NoteDetail{

      constructor(){

      }

      delegatedEditViewEditClick(event){
        event.stopPropagation();
        if(event.target.classList.contains("saveButton")) {
          let note = this.extractNote();

          let rest = new RestClient();
          rest.getNoteById(note._id)
          .then(noteItem => {

            if(noteItem && noteItem._id){
              rest.updateNote(note)
              .then(() => {
                this.refreshModal({});
                this.main();
              })
            }
            else {
              delete note._id;
              if(this.validateNote(note)){
                rest.addNote(note)
                .then(() => {
                  this.refreshModal({});
                  this.main();
                })
              }
            }
          })
        }
        if(event.target.id == "cancelModal") {
          const modal = findByClass('modal');
          modal.classList.toggle("show-modal");
        }
      }

      refreshModal(note) {
        let template = Handlebars.compile(editTemplate);
        let renderedListHtml = template(note);

        // add rendered html to the dom
        setHtml(".modal", renderedListHtml);
        const modal = findByClass('modal');
        modal.classList.toggle("show-modal");
        if(modal.classList.contains("show-modal")) {
          this.starRating();
        }
      }

      validateNote(note){
        if(note.description && note.title && note.plannedDate != 'Invalid Date') {
          return true;
        }
        return false;
      }

      extractNote(){
        let importance = findByClass('stars');
        importance =  importance ? importance.dataset.rating : 3;
        let selectedStars = [false, false, false, false, false];
        selectedStars = selectedStars.map((item , i ) => (i+1 <= parseInt(importance)) ? true : false );

        let note = new Note(
            findById('id').value,
            findById('title').value,
            findById('add-description').value,
            new Date(),
            new Date(findById('date').value),
            new Date(),
            selectedStars,
            false
        )

        return note;
      }

      starRating () {
        this.addListeners();
        this.setRating();
      }

      addListeners() {
        let stars = document.querySelectorAll('.editStar');
        [].forEach.call(stars, function(star, index) {

          star.addEventListener('click', (function(idx) {
            document.querySelector('.stars').setAttribute('data-rating', ++idx);
            this.setRating();
          }).bind(window, index));
        }.bind(this));
      }

      setRating() {
        var stars = document.querySelectorAll('.editStar');
        var rating = parseInt(
            document.querySelector('.stars').getAttribute('data-rating'));
        [].forEach.call(stars, function (star, index) {
          if (rating > index) {
            star.classList.add('rated');
          } else {
            star.classList.remove('rated');
          }
        }.bind(this));
      }

      initializeListeners() {
        addEventHandler(findById("modalContainer"), "click", this.delegatedEditViewEditClick.bind(this));
      }

    }

    window.NoteApp = window.NoteApp || {};
    window.NoteApp.NoteDetail = NoteDetail;
})(window)
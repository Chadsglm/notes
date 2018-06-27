const NoteDetail = (function (){

    class NoteDetail{

      constructor(){
        this.rest = RestApi;
        this.initializeListeners();
      }


      delegatedEditViewEditClick(event){
        event.stopPropagation();
        if(event.target.classList.contains("save-button")) {
          this.note = this.extractNote();
          this.rest.getNoteById(this.note._id, noteItem =>{
            if(noteItem && noteItem._id){
              this.rest.updateNote(this.note, (res) => {
                this.refreshModal({});
                this.noteList.getInitialData();
              })
            }
            else {
              delete this.note._id;
              if(this.validateNote(this.note)){
                this.rest.addNote(this.note, (res) => {
                  this.refreshModal({});
                  this.noteList.getInitialData();
                });
              }
            }
          })
        }
        if(event.target.id == "cancelModal") {
          const modal = findByClass('modal');
          modal.classList.remove("show-modal");
        }
      }

      refreshModal(note) {
        let template = Handlebars.compile(editTemplate);
        let renderedListHtml = template(note);

        // add rendered html to the dom
        setHtml(".modal", renderedListHtml);
        const modal = findByClass('modal');
        modal.classList.toggle("show-modal");

      }

      validateNote(note){
        if(note.description && note.title && note.plannedDate != 'Invalid Date') {
          return true;
        }
        return false;
      }

      extractNote(){
        let importance = findByClass('stars');
        importance =  importance ? importance.value : 3;

        let note = new Note(
            findById('id').value,
            findById('title').value,
            findById('add-description').value,
            new Date(),
            new Date(findById('date').value),
            new Date(),
            importance,
            false
        )

        return note;
      }



      initializeListeners() {

          document.addEventListener("DOMContentLoaded", (event) => {
            this.noteList = NoteList;
            addEventHandler(findById("modalContainer"), "click", this.delegatedEditViewEditClick.bind(this));
          });

      }

    }

    return new NoteDetail();

})(window)

(function (){
  "use strict";

  class NoteList{
    constructor () {
      this.notes = this.notes || [];
      this.restClient = new window.NoteApp.RestClient();
      this.getInitialData();
      this.setListeners();
      this.switchStyle();
    }

    getInitialData(){
      this.notes = [];
      this.restClient.getAllNote(result => {
        this.notes = result;
        this.sortByLocalDatabase();
      })
    }



    sortByLocalDatabase(){
      const sortedBy = JSON.parse(getLocalStorageItem('sortedBy')) || 'create';
      const filteredBy = JSON.parse(getLocalStorageItem('isFinished')) || false;

      if(sortedBy == 'finished') {
        this.sortByFinishedDate()
      } else if(sortedBy == 'create'){
        this.sortByCreatedDate();
      } else if(sortedBy == 'importance'){
        this.sortByImportance()
      }

      if(filteredBy) {
        this.showFinished();
      }
    }

    setListeners(){
      addEventHandler(findById("sortByFinishedDate"), "click", this.sortByFinishedDate.bind(this));
      addEventHandler(findById("sortByCreatedDate"),  "click", this.sortByCreatedDate.bind(this));
      addEventHandler(findById("sortByImportance"),   "click", this.sortByImportance.bind(this));
      addEventHandler(findById("showFinished"),       "click", this.showFinished.bind(this));
      addEventHandler(findById("styleSelector"),      "click", this.switchStyle.bind(this));
      addEventHandler(findById("newCreate"),          "click", this.openModal.bind(this));

      addEventHandler(findById("listContainer"),     "click", this.delegatedMainViewEditClick.bind(this));
    }

    refreshListView(listOfNotes){

      let template = Handlebars.compile(mainTemplate);
      let context = {list: listOfNotes};
      let renderedListHtml = template(context);
      // add rendered html to the dom
      setHtml(".view-notes-area", renderedListHtml);
    }

    sortByFinishedDate() {
      let listOfNotes = this.notes.sort((a,b) => { return a.finishedDate > b.finishedDate; });
      this.refreshListView(listOfNotes);
      saveToLocalStorage('sortedBy','finished');
      saveToLocalStorage('isFinished',false);
    }

    sortByCreatedDate(){
      let listOfNotes = this.notes.sort((a,b) => { return a.createDate>b.createDate; });
      this.refreshListView(listOfNotes);
      saveToLocalStorage('sortedBy','create');
      saveToLocalStorage('isFinished',false);
    }

    sortByImportance(){
      let listOfNotes = this.notes.sort((a,b) => { return a.importance>b.importance; });
      this.refreshListView(listOfNotes.reverse());
      saveToLocalStorage('sortedBy','importance');
      saveToLocalStorage('isFinished',false);
    }

    showFinished(){
      let listOfNotes = this.notes.filter((a) => a.isFinished);
      this.refreshListView(listOfNotes);
      saveToLocalStorage('isFinished',true);
    }

    switchStyle(e){

      const templateStyle = (e && e.target) ? e.target.closest('button').id :JSON.parse(getLocalStorageItem('theme'));
      const wrapper = findByClass("wrapper");

      if(templateStyle == 'dark') {
        wrapper.classList.remove('light');
        wrapper.classList.add('dark');
        saveToLocalStorage('theme','dark')
      } else {
        wrapper.classList.remove('dark');
        wrapper.classList.add('light');
        saveToLocalStorage('theme','light');
      }
    }

    delegatedMainViewEditClick(event){
      event.stopPropagation();
      if(event.target.id == "editNote") {
        // get the id form data attribute
        let id = event.target.dataset["id"];
        // find the note from model
        this.restClient
        .getNoteById(id, noteItem => {
          const details = new window.NoteApp.NoteDetail();
          details.refreshModal(noteItem);
        });
      }
      if(event.target.id == "deleteNote") {
        // get the id form data attribute
        let id = event.target.dataset["id"];
        this.restClient.deleteNote(id, () =>{
          this.getInitialData()
        })
      }
      if(event.target.classList.contains("finishedNote")){
        isFinished(event.target);
      }
    }

    openModal(e) {
      const note = new window.NoteApp.NoteDetail();
      note.refreshModal({});
    }

    isFinished (target){
      let id = event.target.dataset["id"];
      this.restClient
      .getNoteById(id, (noteItem) => {
        noteItem.id = id;
        noteItem.isFinished = !noteItem.isFinished;
        this.restClient.updateNote(noteItem, (res) => this.getInitialData());
      })
    }
  }

  window.NoteApp = window.NoteApp || {};
  window.NoteApp.NoteList = NoteList;

  new window.NoteApp.NoteList();

})(window)


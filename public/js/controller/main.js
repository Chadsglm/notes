"use strict";

function main(){
  sortByCreatedDate();
}

function refreshListView(listOfNotes){

  let template = Handlebars.compile(mainTemplate);
  let context = {list: listOfNotes};
  let renderedListHtml = template(context);

  // add rendered html to the dom
  setHtml(".view-notes-area", renderedListHtml);
}


function filterNotes(list, orderBy, filterBy){
  return list
          .filter(filterBy)
          .sort(orderBy);
}

function sortByFinishedDate(){
  return new RestClient()
                .getAllNote()
                .then(list => {
                   let listOfNotes = filterNotes(list, (a, b)=>a.finishedDate > b.finishedDate, a=>true);
                   refreshListView(listOfNotes.reverse());
                });
}

function sortByCreatedDate(){
  return new RestClient()
              .getAllNote()
              .then(list => {
                let listOfNotes = filterNotes(list, (a,b)=>a.createDate>b.createDate, a=>true);
                refreshListView(listOfNotes.reverse());
              });
}

function sortByImportance(){
  return new RestClient()
              .getAllNote()
              .then(list => {
                let listOfNotes = filterNotes(list, (a,b)=>a.importance>b.importance, a=>true);
                refreshListView(listOfNotes.reverse());
              });
}

function showFinished(){
  return new RestClient()
              .getAllNote()
              .then(list => {
                let listOfNotes = filterNotes(list, (a,b)=>a.createDate>b.createDate, a=>a.isFinished);
                refreshListView(listOfNotes.reverse());
              });
}

function switchStyle(){
  const switchStyleStorage = getLocalStorageItem('switchStyle') || [];

  const wrapper = findByClass("wrapper");
  if(wrapper.classList.contains('dark')) {
    wrapper.classList.remove('dark');
    wrapper.classList.add('light');
  } else {
    wrapper.classList.remove('light');
    wrapper.classList.add('dark');
  }
  return false;
}

function delegatedMainViewEditClick(event){
  event.stopPropagation();
  if(event.target.classList.contains("edit_item")) {
    // get the id form data attribute
    let id = event.target.dataset["id"];
    // find the note from model
    new RestClient()
          .getNoteById(id)
          .then(noteItem => refreshModal(noteItem))
  }
  if(event.target.classList.contains("delete_item")) {
    // get the id form data attribute
    let id = event.target.dataset["id"];
    // find the note from model
    new RestClient()
          .deleteNote(id)
          .then(() => main())
  }
  if(event.target.classList.contains("finishedNote")){
    isFinished(event.target);
  }
}

function openModal(e) {
  refreshModal({});
}

function isFinished (target){
  let id = event.target.dataset["id"];
  let rest = new RestClient();
  rest
      .getNoteById(id)
      .then(noteItem => {
        noteItem.id = id;
        noteItem.isFinished = !noteItem.isFinished;
        rest
          .updateNote(noteItem)
          .then( () => main());
      })
}



addEventHandler(document, "DOMContentLoaded", function(event) {
  addEventHandler(findById("sortByFinishedDate"), "click", sortByFinishedDate);
  addEventHandler(findById("sortByCreatedDate"),  "click", sortByCreatedDate);
  addEventHandler(findById("sortByImportance"),   "click", sortByImportance);
  addEventHandler(findById("showFinished"),       "click", showFinished);
  addEventHandler(findById("styleSelector"),      "change", switchStyle);
  addEventHandler(findById("newCreate"),          "click", openModal);

  addEventHandler(findById("listContainer"),     "click", delegatedMainViewEditClick);

  main();
});
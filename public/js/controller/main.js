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

function sortByFinishedDate(){
  let listOfNotes = GetNotes((a, b)=>a.finishedDate > b.finishedDate, a=>true);
  refreshListView(listOfNotes.reverse());
  let byFinishdateSorting = 1;
}

function sortByCreatedDate(){
  let listOfNotes = GetNotes((a,b)=>a.createDate>b.createDate, a=>true);
  refreshListView(listOfNotes);
}

function sortByImportance(){
  let listOfNotes = GetNotes((a,b)=>a.importance>b.importance, a=>true);
  refreshListView(listOfNotes);
}

function showFinished(){
  let listOfNotes = GetNotes((a,b)=>a.createDate>b.createDate, a=>a.isFinished);
  refreshListView(listOfNotes);
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
  if(event.target.classList.contains("edit_item")) {
    // get the id form data attribute
    let id = +event.target.dataset.id;
    // find the note from model
    let note = GetNoteById(id);
    refreshModal(note);

    event.stopPropagation();
  }
  if(event.target.classList.contains("finishedNote")){
    isFinished(event.target);
  }
}

function openModal(e) {
  refreshModal({});
}

function isFinished (target){
  console.log("burada", target.id);
  let note = GetNoteById(target.id);
  note.isFinished = !note.isFinished;
  UpdateNote(note);
  main();
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
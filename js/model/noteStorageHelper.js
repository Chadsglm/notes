
"use strict";
/*
let noteStorage = [
    {
        id: 1,
        createDate: new Date(2018, 1, 10),
        plannedDate: new Date(2018, 11, 3),
        finishedDate: new Date(2018, 11, 5),
        isFinished: false,
        title: "Abu nediir",
        importance: 5,
        description: "This is a first project as prequisite of the main one."
    },
    {
        id: 2,
        createDate: new Date(2018, 4, 3),
        plannedDate: new Date(2018, 11, 3),
        finishedDate: new Date(2018, 11, 11),
        isFinished: true,
        title: "Cok az onemli amma",
        importance: 3,
        description: "This is a first project as prequisite of the main one."
    },
    {
        id: 3,
        createDate: new Date(2018, 2, 7),
        plannedDate: new Date(2018, 1, 3),
        finishedDate: new Date(2018, 10, 4),
        isFinished: false,
        title: "Kessin Bakmalisin",
        importance: 4,
        description: "This is a first project as prequisite of the main one."
    }
];
*/

/**
 *
 * @param orderBy, mandatory parameter
 * @param filterBy, mandatory parameter
 * @constructor
 */

let noteStorage = getLocalStorageItem('notes') || [];


function GetNotes(orderBy, filterBy){
    noteStorage = getLocalStorageItem('notes') || [];
    return noteStorage
            .filter(filterBy)
            .sort(orderBy);
}

function AddNote(note){
    noteStorage = getLocalStorageItem('notes') || [];
    noteStorage.push(note);
    saveToLocalStorage('notes', noteStorage);
}

function UpdateNote(note){
    noteStorage = getLocalStorageItem('notes') || [];
    let index = noteStorage.findIndex(noteElm => noteElm.id == note.id);
    if(index) {
      noteStorage[index] = note;
      saveToLocalStorage('notes', noteStorage);
    }
}

function GetNoteById(id){
    noteStorage = getLocalStorageItem('notes') || [];
    return noteStorage.find(note => note.id == id);
}
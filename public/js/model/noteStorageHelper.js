"use strict";

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
    noteStorage[index] = note;
    saveToLocalStorage('notes', noteStorage);
}

function GetNoteById(id){
    noteStorage = getLocalStorageItem('notes') || [];
    return noteStorage.find(note => note.id == id);
}
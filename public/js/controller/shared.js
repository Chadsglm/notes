
function addEventHandler(domElement, eventName, handlerFunction) {
  domElement.addEventListener(eventName, handlerFunction);
}

function findById(id){
  return document.getElementById(id);
}

function findByClass(className){
  return document.getElementsByClassName(className)[0];
}

function getHtml(selector){
  return document.querySelector(selector).innerHTML;
}

function setHtml(selector, html){
  document.querySelector(selector).innerHTML = html;
}

function saveToLocalStorage(key, value){
  const stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
}

function getLocalStorageItem(item) {
  return localStorage.getItem(item);
}





(function (window){
  class RestClient {
    constructor(url = '/note'){
      this.url= url;
    }

    getAllNote(callback) {
      fetch(this.url)
      .then(result => result.json())
      .then(result => {
        callback(result.data)
      });
    }

    getNoteById(id, callback) {
      fetch(this.url + '/' + id)
      .then(result => result.json())
      .then(result => {
        callback(result.data)
      });
    }

    addNote(note, callback) {
      fetch(this.url, {
        body: JSON.stringify(note),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      .then(result => result.json())
      .then(result => {
        callback(result.data)
      });
    }

    updateNote(note, callback){
      fetch(this.url + '/' + note._id, {
        body: JSON.stringify(note),
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT'
      })
      .then(result => result.json())
      .then(result => {
        callback(result.data)
      });
    }

    deleteNote(id, callback) {
      fetch(this.url + '/' + id, {
        method: 'DELETE'
      })
      .then(result => result.json())
      .then(result => {
        callback(result.data)
      });
    }

  }

  window.NoteApp = window.NoteApp || {};
  window.NoteApp.RestClient = RestClient;


})(window)




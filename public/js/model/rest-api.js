class RestClient {

  constructor(url = '/note'){
    this.url= url;
  }

  async getAllNote() {
    let response = await fetch(this.url);
    let data = await response.json()

    return data.data;
  }

  async getNoteById(id) {
    let response = await fetch(this.url + '/' + id);
    let data = await response.json()

    return data.data;
  }

  async  addNote(note) {
    return await fetch(this.url, {
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
  }

  async updateNote(note){
    return await fetch(this.url + '/' + note._id, {
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT'
    })
    .then(response => response.json())
  }

  async deleteNote(id) {
    return await fetch(this.url + '/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
  }
}


const Note = (function() {
  class Note {
    constructor (id, title, description, createDate,
                 plannedDate, finishedDate, importance, isFinished)
    {
      this._id = id || '';
      this.title = title ;
      this.description = description;
      this.createDate = createDate;
      this.plannedDate = plannedDate;
      this.finishedDate = finishedDate;
      this.importance = importance;
      this.isFinished = isFinished;
    }

    identifier(){
      return this._id;
    }
  }
  return Note;
})()


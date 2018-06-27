const editTemplate = `    
    <div class="container">

        <div class="top">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    
        <div class="modelContent">
            <form id="modelContent">
              <input type="hidden" id="id" value="{{_id}}">
              <div>
                <label class="model-label">Title</label>
                <input   id="title" value="{{title}}" placeholder="Write to Your Note Title">
              </div>
          
              <div>
                <label class="model-label">Description</label>
                <textarea   id="add-description" rows="4" cols="50" placeholder="Write to Your Note">{{description}}</textarea>
              </div>
               <div>
                  <label class="model-label" id="importance">Importance</label>
                  <select class="stars" data-rating="3">
                      {{ select importance}}
                  </select> 
              </div>
                
              <div>
                <label class="model-label">Finish to</label> 
                <input class="modal-date" id="date" type="date" value="{{formatDate plannedDate 'YYYY-MM-DD'}}">
              </div>
          
              <div class="modalButtons">
                <button type="button" id="saveButton" class="modal-button save-button">Save</button>
                
                <button type="button" id="cancelModal" class="modal-button cancel-button">Cancel</button>
              </div>
            </form>
        </div>

    </div>
`

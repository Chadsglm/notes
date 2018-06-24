const editTemplate = `    
    <div class="container">

        <div class="top">
            <span class="dot1"></span>
            <span class="dot2"></span>
            <span class="dot3"></span>
        </div>
    
        <div class="modelContent">
            <form id="modelContent">
              <input type="hidden" id="id" value="{{_id}}">
              <div>
                <label class="model-label">Title</label>
                <input required id="title" value="{{title}}" placeholder="Write to Your Note Title">
              </div>
          
              <div>
                <label class="model-label">Description</label>
                <textarea required id="add-description" rows="4" cols="50" placeholder="Write to Your Note">{{description}}</textarea>
              </div>
  
              <div class="stars" data-rating="3">
                <label class="model-label" id="importance">Importance</label>
                <span class="star editStar"></span>
                <span class="star editStar"></span>
                <span class="star editStar"></span>
                <span class="star editStar"></span>
                <span class="star editStar"></span>
              </div>
                
              <div>
                <label class="model-label">Finish to</label>
                <input required id="date" type="date" value="{{formatDate plannedDate 'DD.MM.YYYY'}}">
              </div>
          
              <div>
                <button type="button" id="saveButton" class="save saveButton">Save</button>
                
                <button class="cancel" id="cancelModal">Cancel</button>
              </div>
            </form>
        </div>

    </div>
`

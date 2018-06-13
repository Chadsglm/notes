const editTemplate = `    
    <div class="container">

        <div class="top">
            <span class="dot1"></span>
            <span class="dot2"></span>
            <span class="dot3"></span>
        </div>
    
        <div class="modelContent">
            <form id="modelContent">
              <input type="hidden" id="id" value="{{id}}">
              <div>
                <label class="model-label">Title</label>
                <input required id="title" value="{{title}}" placeholder="Write to Your Note Title">
              </div>
          
              <div>
                <label class="model-label">Beschreibung</label>
                <textarea required id="add-description" rows="4" cols="50" 
                          placeholder="Write to Your Note">{{description}}
                </textarea>
              </div>
  
              <div class="stars" data-rating="3">
                <label class="model-label" id="importance">Wichtigkeit</label>
                <span class="star">&nbsp;{{importance}}</span>
                <span class="star">&nbsp;{{importance}}</span>
                <span class="star">&nbsp;{{importance}}</span>
                <span class="star">&nbsp;{{importance}}</span>
                <span class="star">&nbsp;{{importance}}</span>
              </div>
                
              <div>
                <label class="model-label">Erledigt bis</label>
                <input required id="date" type="date" value="{{formatDate plannedDate 'DD.MM.YYYY'}}">
              </div>
          
              <div>
                <button class="cancel">Cancel</button>
                
                <button type="button" id="saveButton" class="save saveButton">Spreichern</button>
              </div>
            </form>
        </div>

    </div>
`

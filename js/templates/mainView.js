const mainTemplate = `
    <div>
        {{#each list}}
        <div class="content">
        
            <div class="noteDate">
                <div class="note-date">{{formatDate plannedDate 'DD.MM.YYYY'}}</div>
            </div>
        
            <div class="noteTitle">{{title}}</div>
            
            <div class="noteImportance">
              <span class="star">&nbsp;</span>
              <span class="star">&nbsp;</span>
              <span class="star">&nbsp;</span>
              <span class="star">&nbsp;</span>
              <span class="star">&nbsp;</span>
            </div>
            
            <div class="noteDates">
                <label for="finishedNote">Finished</label>
                <input id="finishedNote" type="checkbox" value="finishedNote"/>
            </div>
            
            <div class="declaration" id="declaration">
                <details>
                  <summary></summary>
                    <lu>{{description}}</lu>
                </details>
            </div>
            
            <div class="noteEdit">
                <button class="edit_item" id="noteEdit" data-id="{{id}}">Edit</button>
            </div>
        </div>
        {{/each}}
    </div>
`
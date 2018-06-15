const mainTemplate = `
    <div>
        {{#each list}}
        <div class="content">
        
            <div class="noteDate">
                <div class="note-date">{{formatDate plannedDate 'DD.MM.YYYY'}}</div>
            </div>
        
            <div class="noteTitle">{{title}}</div>
            
            <div class="noteImportance">
            {{#each importance}}
              {{#if this}}
                <span class="star rated" >&nbsp;</span>
                {{else}}
                <span class="star">&nbsp;</span>
              {{/if}} 
              {{/each}}
            </div>
            
            <div class="noteDates">
                <label for="finishedNote">Finished</label>
                {{#if isFinished}} 
                  <input class="finishedNote" id="{{id}}" type="checkbox" checked="checked" />
                {{else}}
                  <input class="finishedNote" id="{{id}}" type="checkbox" />
                {{/if}} 
               
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
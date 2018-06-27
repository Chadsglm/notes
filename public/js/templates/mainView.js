const mainTemplate = `
    <div>
        <div class="count"><span>Count of List: {{list.length}}</span></div>
        {{#each list}}
        <div class="note-container">
            <div class="top-line">
                <div class="noteDate">
                    <div class="note-date">{{formatDate plannedDate 'DD.MM.YYYY'}}</div>
                </div> 
                <div class="noteTitle">{{title}}</div>
                
                <div class="noteImportance">
                    {{stars importance}}
                </div>
            </div>
            <div class="bottom-line">
                <div class="is-finished">
                    <label for="finishedNote">Finished</label>
                    {{#if isFinished}} 
                      <input class="finishedNote" data-id="{{_id}}" type="checkbox" checked="checked" />
                    {{else}}
                      <input class="finishedNote" data-id="{{_id}}" type="checkbox" />
                    {{/if}}
                </div> 
                <div class="note-details" id="declaration">
                    <details>
                        <li>{{description}}</li>
                    </details>
                </div> 
                <div class="note-buttons">
                    <button class="btn btn-normal" id="editNote" data-id="{{_id}}">Edit</button>
                    <button class="btn btn-normal" id="deleteNote" data-id="{{_id}}">Delete</button>
                </div> 
            </div> 
        </div>
        {{/each}}
    </div>
`
class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: false
    }

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    get noteItem() {
        return this._noteItem;
    }

    set noteItem(value) {
        this._note = value;
        this.render();

        // console.log(this._note);
    }

    _updateStyle() {
        this._style.textContent = `
        
        :host{
        display: block;
        }

        div.card{
            height: 150px;
            padding: 50px;
            border-radius: 12px;
            box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.2);
            overflow: hidden;

        }

        h3#noteTitle {
            margin-bottom: 6px;
            font-weight: 700;
            color: #597E52;
        }

        div#noteDesc {
            margin-top: 2px;
            font-size: 15px;
            color: #77B0BB;
        }

        div#notesDesc p {
            margin: 0;
            padding: 0;
        }
        

        `;
    }



    render() {
        this._emptyContent();
        this._updateStyle();

        let noteContent = this._note.body;

        if (noteContent.includes('\n')) {
            const lines = noteContent.split('\n');
            noteContent = lines.map((line) => `<p> ${line} </p>`).join('');
        }


        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div class="card">
            <h3 id="noteTitle"> ${this._note.title} </h3>
            <p id="noteTitle"> ${noteContent} </p>
        </div>
        `;

    }
}

customElements.define('note-item', NoteItem);
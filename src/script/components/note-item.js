import Utils from "../utils";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
    this.render();

    // console.log(this._note);
  }

  _updateStyle() {
    this._style.textContent = `
        
        :host{
        display: flex;
        flex-direction: row;
        overflow:hidden;
        }

        div.card{
            display:flex;
            flex-direction: column;
            padding: 1.25rem;
            border: 1px solid black;
            border-radius: 10px;
            overflow: hidden;
            width: 100%;
        }

        .note-content{
          flex-grow: 1;
        }


        

        .note-content__title {
        font-size: clamp(16px, 3vw, 20px);
        padding-bottom: 10px;
        border-bottom: 1px solid #092639;
        overflow: hidden;
        color: #597E52;
        text-overflow: ellipsis;
        margin: auto;
        white-space: nowrap;
      }

      .note-content__body {
        font-size: clamp(14px, 3vw, 16px);
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .note-content__date{
        font-size: clamp(12px,3vw,14px);
      }
    
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    let noteContent = this._note.body;

    if (noteContent.includes("\n")) {
      const lines = noteContent.split("\n");
      noteContent = lines.map((line) => `<p> ${line} </p>`).join("");
    }

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card">
          <div class="note-content">
            <h3 class="note-content__title"> ${this._note.title} </h3>
            <p class="note-content__body"> ${noteContent} </p>
            <p class="note-content__date"> ${Utils.formattedDate(this._note.createdAt)} </p>
          </div>
        </div>
        `;
  }
}

customElements.define("note-item", NoteItem);

import Swal from "sweetalert2";
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

  connectedCallback() {
    this._shadowRoot.getElementById('deleteButton').addEventListener('click', this.#onDeleteBtn.bind(this))
    this._shadowRoot.getElementById('archiveButton').addEventListener('click', this.#onArchiveBtn.bind(this));
  }

  disconnectedCallback() {
this._shadowRoot.getElementById('deleteButton').removeEventListener('click', this.#onDeleteBtn.bind(this));
this._shadowRoot.getElementById('deleteButton').removeEventListener('click', this.#onArchiveBtn.bind(this));
  }

  async #onDeleteBtn() {
    const confirmed = await Swal.fire({
      title: 'Delete Note',
      text: 'Are you sure to delete this note?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff6969"
    });
    if (confirmed) {
      this.dispatchEvent(
        new CustomEvent('deleteNote', {
          detail: { noteId: this._note.id },
          bubbles: true
        })
      )
    }
  }

  async #onArchiveBtn() {
    const confirmed = await Swal.fire({
      title: "Archive Toggle Note",
      text: "Are you sure to move this note?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Move",
      
    });
    if (confirmed) {
      this.dispatchEvent(
        new CustomEvent('archiveNote', {
          detail: this._note,
          bubbles: true
        })
      )
    }
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
        font-size: clamp(17px, 3vw, 21px);
        padding-bottom: 10px;
        border-bottom: 1px solid #36454F;
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
        font-size: clamp(9px,3vw,10px);
      }

      .note-btn{
        display: flex;
        flex-direction: row;
        gap: 7px;
        justify-content: space-between;
      }

      .note-btn > button {
        display: block;
        font-weight: bold;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #36454F;
        margin-top: 1rem;
        padding: 0.5rem;
        text-align: center;
        cursor: pointer;
      }

      .note-btn__delete {
        background-color: #ff6969;
        color: white;
      }
      
      .note-btn__delete:hover {
        background-color: #ff2929;
      }

      .note-btn__archive {
        background-color: #FFEA00;
        color: #36454F;
      }
      
      .note-btn__archive:hover {
        background-color: #FFCF00;
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
          <div class="note-btn">
            <button id="deleteButton" class="note-btn__delete">Delete</button>
            <button id="archiveButton" class="note-btn__archive">${this._note.archived ? "Unarchive" : "Archive"}</button>
          </div>
        </div>
        `;
  }
}

customElements.define("note-item", NoteItem);

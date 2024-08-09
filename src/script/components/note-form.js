class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _eventSubmit = 'submit';

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
            :host{
                display: block;
            }
            .add-info{
                font-size: 8px;
            }

section.form-section {
    margin: 1.75rem 2rem ;
    padding: 2.4rem;
    background-color: #F5F5F5;
    border: 1px solid black;
    border-radius: 14px;
}

section.form-section h2 {
    text-align: center;
    font-size: 2rem;
    color: #597E52;
    margin-bottom: 1.25rem;
}

div.form-group {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
}



div.form-group input,
textarea {
    border: 1px solid #416D19;
    border-radius: 8px;
    padding: 1rem;
}

div.form-group textarea{
    resize: none;
    font-family: "Inter",sans-serif;
}

div.form-group>label {
    margin-bottom: 8px;
    color: #597E52;
}



button#saveBtn {
    width: 100%;
    margin-top: 20px;
    padding: 14px 16px;
    background-color: #9BCF53;
    border: 0;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}
button#saveBtn:hover {
    
    background-color: #a8e776;
    transition: 400ms ease-in;
    
}
        `;
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.#onFormSubmit.bind(this));
  }
  disconnectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .removeEventListener("submit", this.#onFormSubmit.bind(this));
  }

  #onFormSubmit(ev) {
    ev.preventDefault();
    const inputTitle = this._shadowRoot.querySelector("#noteTitle");
    const inputBody = this._shadowRoot.querySelector("#noteBody");

    const evDetail = {
      id: this.genUniqueId(),
      title: inputTitle.value,
      body: inputBody.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(
      new CustomEvent(this._eventSubmit, {
        detail: evDetail,
        bubbles: true,
      })
    );
  }

  genUniqueId() {
    const randomString = Math.random().toString(36).substring(2, 16);

    return `notes-${randomString}`;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <section class="form-section">
                <h2>Catatan Baru</h2>
                <form class="notes-form" id="notesForm">
                    <div class="form-group">
                        <label for="noteTitle">Judul <span class="add-info">&lpar;required&rpar;</span> </label>
                        <input type="text" name="noteTitle" id="noteTitle" required placeholder="Judul catatanmu" autocomplete="off" />
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Catatan <span class="add-info">&lpar;required&rpar;</span> </label>
                        <textarea name="noteBody" id="noteBody" cols="25" rows="5" placeholder="Isi catatanmu" required></textarea>
                    </div>
                    <button type="submit" id="saveBtn">Tambah</button>
                </form>
            </section>
        `;
  }
}

customElements.define("note-form", NoteForm);

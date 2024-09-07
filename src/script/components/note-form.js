class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _eventSubmit = "submit";

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
                font-size: clamp(9px,3vw,10px);
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
    color: #10b981;
    margin-bottom: 1.25rem;
}

div.form-group {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
}



div.form-group input,
textarea {
    border: 1px solid #99f6e4;
    border-radius: 8px;
    padding: 1rem;
}

div.form-group textarea{
    resize: none;
    font-family: "Inter",sans-serif;
}


div.form-group>label {
    margin-bottom: 8px;
    color: #34d399;
}



button#saveBtn {
    width: 100%;
    margin-top: 20px;
    padding: 14px 16px;
    background-color: #6ee7b7;
    border: 0;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

button#saveBtn:disabled{
    opacity: 0.6;
    cursor: not-allowed;
}


`;
  }

  connectedCallback() {
    const form = this._shadowRoot.querySelector("form");
    const titleInput = this._shadowRoot.querySelector("#noteTitle");
    const bodyInput = this._shadowRoot.querySelector("#noteBody");
    const subBtn = this._shadowRoot.querySelector("#saveBtn");

    form.addEventListener("input", () => {
      subBtn.disabled = !(titleInput.value && bodyInput.value);
    });

    form.addEventListener("submit", this.#onFormSubmit.bind(this));
  }
  disconnectedCallback() {
    const form = this._shadowRoot.querySelector("form");
    form.removeEventListener("submit", this.#onFormSubmit.bind(this));
  }

  #onFormSubmit(event) {
    event.preventDefault();
    const inputTitleSubmit = this._shadowRoot.querySelector("#noteTitle");
    const inputBodySubmit = this._shadowRoot.querySelector("#noteBody");
    const submitButton = this._shadowRoot.querySelector("#saveBtn");

    const evDetail = {
      id: this.genUniqueId(),
      title: inputTitleSubmit.value,
      body: inputBodySubmit.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(
      new CustomEvent(this._eventSubmit, {
        detail: evDetail,
        bubbles: true,
      })
    );
    inputTitleSubmit.value = "";
    inputBodySubmit.value = "";
    submitButton.disabled = true;
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
                <form class="notes-form" id="notesForm" autocomplete="off">
                    <div class="form-group">
                        <label for="noteTitle">Judul <span class="add-info">&lpar;wajib&rpar;</span></label>
                        <input type="text" name="noteTitle" id="noteTitle" required placeholder="Judul catatanmu" minlength="4" maxlength="20"/> 
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Isi Catatan <span class="add-info">&lpar;wajib&rpar;</span></label>
                        <textarea name="noteBody" id="noteBody" cols="25" rows="5" placeholder="Isi catatanmu" required minlength="10" maxlength="150"></textarea>
                    </div>
                    <button type="submit" id="saveBtn" disabled>Tambah</button>
                </form>
            </section>
        `;
  }
}

customElements.define("note-form", NoteForm);

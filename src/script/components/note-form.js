class NoteForm extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
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


    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <section class="form-section">
                <h2>Catatan Baru</h2>
                <form action="#" class="notes-form" id="notesForm">
                    <div class="form-group">
                        <label for="noteTitle">Judul <span class="add-info">&lpar;required&rpar;</span> </label>
                        <input type="text" name="noteTitle" id="noteTitle" required autocomplete="off" />
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Catatan</label>
                        <textarea name="noteBody" id="noteBody" cols="20" rows="8" required></textarea>
                    </div>
                    <button type="submit" id="saveBtn">Tambah</button>
                </form>
            </section>
        `; 
    }
}

customElements.define('note-form',NoteForm);
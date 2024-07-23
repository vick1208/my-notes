class FormSection extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    static observedAttributes = ['title-content'];

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this._titleContent = this.getAttribute('title-content');
    }

    _updateStyle() {
        this._style.textContent = `
        .add-info{
            font-size: 8px;
        }

        section.form-section {
            margin: 12px 32px ;
        }

        section.form-section h2 {
            text-align: center;
            font-size: 32px;
            color: #597E52;
            margin-bottom: 20px;
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
            padding: 12px;
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
            transition: 300ms ease-in;
        }
        `;
    }
    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
        this._shadowRoot.querySelector('#notesForm').addEventListener('submit',this.formSubmit.bind(this));
    }

    formSubmit(event) {
        event.preventDefault();

        const title = this._shadowRoot.querySelector('#noteTitle').value;
        const body = this._shadowRoot.querySelector('#noteBody').value;
        const currentDate = new Date()
        const formVal = {
            id: this.generateRandom(),
            title: title,
            body: body,
            createdAt: currentDate.toISOString(),
            archived: false
        }
        this.dispatchEvent(new CustomEvent('save-data', { detail: formVal }));
    }

    generateRandom(){
        let result = 'notes-'
        const huruf = 'abcdefghijklmnopqrstuvwxyz'
        for(let i=1; i<=3; i++){
            result += i
            for(let j=0; j<1; j++){
                const randomHuruf = huruf.charAt(Math.floor(Math.random() * huruf.length))
                result += randomHuruf
            }
            if (i<3) {
                result += '-'
            }
        }
        return result
    }

    render() {
        this._emptyContent();
        this._updateStyle();
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <section class="form-section">
                <h2> ${this._titleContent} </h2>
                <form action="#" class="notes-form" id="notesForm">
                    <div class="form-group">
                        <label for="noteTitle">Judul <span class="add-info">&lpar;required&rpar;</span> </label>
                        <input type="text" name="noteTitle" id="noteTitle" autocomplete="off" required/>
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Catatan</label>
                        <textarea name="noteBody" id="noteBody" cols="20" rows="8" >

                        </textarea>
                    </div>
                    <div class="form-button">
                        <button type="submit" id="saveBtn">Tambah</button>
                    </div>
                </form>
            </section>
        
        `;

    }
}

customElements.define('form-section', FormSection);
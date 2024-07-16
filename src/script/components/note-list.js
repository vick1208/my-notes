class NoteList extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this._style.textContent = `
        
        :host{
            display: block;
        }
        
        div.note-list{
            display: grid;
            grid-template-columns: 1fr;
            gap: 9px;
        }

        @media(min-width: 640px){
            div.note-list{
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
        }

        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="note-list">
                <slot></slot>
            </div>
        `;
    }
}


customElements.define('note-list',NoteList);
class NoteItem extends HTMLElement {
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

    _updateStyle(){
        this._style.textContent = `
        
        :host{
        
        
        
        }
        

        `;
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this._emptyContent();
        this._updateStyle();
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML = ``;

    }
}

customElements.define('note-item',NoteItem);
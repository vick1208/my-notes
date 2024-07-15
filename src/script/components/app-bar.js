class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;


    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;              
                background-color: #F3FEB8;
                color: #18182a;
            }

            div {
                padding: 8px 60px;
            }

            .logo-brand{
                font-size: 2rem;
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
            <div>
                <h1 class="logo-brand">Note Pribadi</h1>
            </div>
        `;
    }

}

customElements.define('app-bar', AppBar);
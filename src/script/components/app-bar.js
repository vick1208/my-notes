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
                background-color: #FFF9D0;
                color: #28282b;
            }

            nav {
                padding: 10px 80px;
            }

            .logo-brand{
                font-size: 1.4rem;
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
            <nav>
                <h1 class="logo-brand">Note-ku</h1>
            </nav>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        } else {
            this[`_${name}`] = newValue;
            this.render();
        }
    }
}

customElements.define('app-bar', AppBar);
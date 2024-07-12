class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    static observedAttributes = ['background-color', 'color'];

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

            p{
                font-weight: bold;
                font-size: 2.4rem;
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
                <p>My Note App</p>
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
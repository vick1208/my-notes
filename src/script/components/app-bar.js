class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    static observedAttributes = ['background-color', 'color'];

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._color = this.getAttribute('color') ?? '#343434';
        this._backgroundColor = this.getAttribute('background-color') ?? '#CAF4FF';
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this._style.textContent = `
            :host{
                display: block;
                width: 100%;
                position: fixed;
                z-index: 6;
                border-bottom: 1px solid #dcdcdc;
                color: ${this._color};
                background-color: ${this._backgroundColor};
            }

            div{
                display: flex;
                padding: 5px 40px 5px 40px;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                
            }

            h1{
                font-size: clamp(24px, 4vw, 32px);
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
                <h1>My Note App</h1>
            </div>
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
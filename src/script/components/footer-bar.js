class FooterBar extends HTMLElement {

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

    _updateStyle(){
        this._style.textContent = `
        :host{
            display: block;
        }
        div.container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 62px;
        }
    
        .brand-footer {
            font-size: 30px;
            font-weight: 700;
            color: #28282b;        
        }
            
        .second-footer {
            font-size: 11px;
            color: #28282b;
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
        this._shadowRoot.innerHTML += `
        

        <div class="container">
            <div class="brand-footer">Note-ku</div>
            <div class="second-footer">Dicoding Project Notes &copy; 2024 Vicky </div>
        </div>

        `;
    }
}

customElements.define('footer-bar', FooterBar);
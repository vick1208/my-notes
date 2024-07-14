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

            nav {
                padding: 5px 50px;
            }

            .logo-brand{
                font-size: 18px;
            }


            @media screen and (min-width: 640px){
            nav {
                padding: 10px 80px;
            }
                .logo-brand{
                    font-size:1.5rem;
                
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
            <nav>
                <h1 class="logo-brand">Note Pribadi</h1>
            </nav>
        `;
    }

}

customElements.define('app-bar', AppBar);
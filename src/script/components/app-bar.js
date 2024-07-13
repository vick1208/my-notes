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
                background-color: #FFDE4D;
                color: #18182a;
            }

            nav {
                padding: 10px 80px;
            }

            .logo-brand{
                font-size: 2rem;
            }


            @media screen and (min-width: 640px){

                .logo-brand{
                    font-size:3.4rem;
                
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
                <h1 class="logo-brand">Note-ku</h1>
            </nav>
        `;
    }

}

customElements.define('app-bar', AppBar);
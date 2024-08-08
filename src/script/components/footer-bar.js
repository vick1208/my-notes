class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static observedAttributes = ["footer-title"];

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._footerTitle = this.getAttribute("footer-title");
    this._bgColor = this.getAttribute("bg-color");
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
            display: block;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 42px;
        }
    
        .brand-footer {
            font-size: 2rem;
            font-weight: 700;
            color: #18182a;        
        }

    footer {
    background-color: ${this._bgColor};
    }
            
        .second-footer {
            font-size: 12px;
            color: #18182a;
        }

        @media screen and (min-width: 640px){


        .container {
            padding: 30px 62px;
            
        }

        .brand-footer {
            font-size: 2.5rem;       
        }
            
        .second-footer {
            font-size: 14px;
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

    const currentYear = new Date().getFullYear();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `

        <footer>
            <div class="container">
                <div class="brand-footer">${this._footerTitle}</div>
                <div class="second-footer">Dicoding Project &copy; ${currentYear} Vicky </div>
            </div>
        </footer>
        
        `;
  }
}

customElements.define("footer-bar", FooterBar);

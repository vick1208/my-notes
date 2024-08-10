class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static observedAttributes = ["header-title"];

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._headerTitle = this.getAttribute("header-title");
    this._bgColor = this.getAttribute("bg-color");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;                             
                background-color: ${this._bgColor};
                color: #18182a;
            }

            div {
                padding: 1rem 2rem;
            }
            

            .logo-brand{
                font-size: 2rem;
            }

            @media (min-width: 640px){
                div {
                padding: 1rem 4rem;
            }
                .logo-brand{
                    font-size: 3.4rem;
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
            <div>
                <h1 class="logo-brand"> ${this._headerTitle} </h1>
            </div>
        `;
  }
}

customElements.define("app-bar", AppBar);

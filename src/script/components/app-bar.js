class AppBar extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
        <nav>
            <h1>My Note App</h1>
        </nav>
        `;
    }
}

customElements.define('app-bar',AppBar);
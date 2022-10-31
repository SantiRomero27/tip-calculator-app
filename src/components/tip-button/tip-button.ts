class TipButton extends HTMLElement {
    // Initial properties
    shadow: ShadowRoot;

    // Constructor
    constructor() {
        // Inherit all properties
        super();

        // Create the Shadow DOM
        this.shadow = this.attachShadow({ mode: "open" });
    }

    // Connect the component to the DOM
    connectedCallback() {
        this.render();
    }

    // Render method
    render() {
        // Get attributes
        const valueAttrib: number = parseInt(this.getAttribute("value")) || 1;
        const selected: Boolean = this.hasAttribute("selected");

        // Create the button element
        const buttonEl = document.createElement("button");
        buttonEl.className = "button-el";

        // If it is selected as default...
        if (selected) {
            buttonEl.classList.add("selected");
        }

        // Set the button content
        buttonEl.textContent = `${valueAttrib}%`;

        // Create the styles
        const componentStyles = document.createElement("style");
        componentStyles.innerHTML = `
            * {
                box-sizing: border-box;
            }

            .button-el {
                width: 100%;
                padding: 10px;

                border-radius: 10px;
                border-style: none;
                background-color: var(--very-dark-cyan);
                color: var(--white);
                font-family: "Space Mono", monospace;
                font-size: 21px;
                font-weight: 700;
                cursor: pointer;
                opacity: 1;

                transition: all 0.2s ease;
            }

            .button-el:not(.selected):hover {
                background-color: var(--strong-cyan);
                color: var(--very-dark-cyan);
                opacity: 0.7;
            }

            .button-el.selected {
                opacity: 1;
                background-color: var(--strong-cyan);
                color: var(--very-dark-cyan);
            }
        `;

        // Append the elements to the shadow DOM
        this.shadow.appendChild(componentStyles);
        this.shadow.appendChild(buttonEl);
    }
}

// Define the component
customElements.define("tip-button", TipButton);

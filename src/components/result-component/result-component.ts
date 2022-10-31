class ResultComponent extends HTMLElement {
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
        const title: string = this.getAttribute("title") || "Default";
        const subtitle: string = this.getAttribute("sub") || "Default";
        const price: string = this.getAttribute("price") || "0.00";

        // Give content to the element
        this.shadow.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .result-comp {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .result-comp__info {
                    display: grid;
                    gap: 2.5px;
                }
                
                .result-comp__info__main {
                    font-size: 14px;
                    color: var(--white);
                }
                
                @media (min-width: 768px) {
                    .result-comp__info__main {
                        font-size: 16px;
                    }
                }
                
                .result-comp__info__secondary {
                    font-size: 12.5px;
                    color: var(--grayish-cyan);
                }
                
                @media (min-width: 768px) {
                    .result-comp__info__secondary {
                        font-size: 14.5px;
                    }
                }
                
                .result-comp__price {
                    font-size: 32px;
                    color: var(--strong-cyan);
                }
                
                @media (min-width: 768px) {
                    .result-comp__price {
                        font-size: 36px;
                    }
                }
            </style>

            <div class="result-comp">
                <article class="result-comp__info">
                    <span class="result-comp__info__main"
                        >${title}</span
                    >
                    <span class="result-comp__info__secondary"
                        >/ ${subtitle}</span
                    >
                </article>
                <span class="result-comp__price">$${price}</span>
            </div>
            `;
    }
}

// Define the component
customElements.define("result-comp", ResultComponent);

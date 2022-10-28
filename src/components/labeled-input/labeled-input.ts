// Icons
const iconFiles = {
    dollar: require("url:../../images/icon-dollar.svg"),
    person: require("url:../../images/icon-person.svg"),
};

// Labeled input Class
class LabeledInput extends HTMLElement {
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
        // Get the attributes
        const labelText = this.getAttribute("label") || "Label";
        const icon = this.getAttribute("icon") || "dollar";

        // Aux variable for styling
        const auxPadding: number = 10;

        // Give content to the element
        this.shadow.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .container {
                    display: grid;
                    gap: 5px;
                }

                .container__upper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .container__upper > label {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--dark-grayish-cyan);
                }

                .container__input-container {
                    position: relative;
                    
                    display: flex;
                    align-items: center;
                }

                .container__input-container > img {
                    position: absolute;
                    left: ${auxPadding * 1.5}px;
                }

                .container__input-container > input {
                    width: 100%;
                    padding: ${auxPadding * 0.75}px ${auxPadding * 1.25}px;

                    font-family: "Space Mono", monospace;
                    font-weight: 700;
                    font-size: 21px;
                    color: var(--very-dark-cyan);
                    border-style: none;
                    border-radius: 5px;
                    background-color: var(--very-light-grayish-cyan);
                    text-align: right;
                    letter-spacing: 0.10rem;
                }

                .container__input-container > input:focus {
                    outline: solid 2px var(--strong-cyan);
                }

            </style>

            <div class="container">
                <div class="container__upper">
                    <label for="input">${labelText}</label>
                </div>
                <div class="container__input-container">
                    <img src="${iconFiles[icon]}" alt="inputLogo">
                    <input
                    type="text"
                    placeholder="0"
                    name="input"
                    id="input"
                    maxlength="5"
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                    />
                </div>
            </div>
        `;
    }
}

// Define the component
customElements.define("labeled-input", LabeledInput);

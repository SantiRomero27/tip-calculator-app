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

    // Listeners method
    addListeners() {
        // Aux variables
        const errorMessageEl = this.shadowRoot.querySelector(".error-message");
        const inputEl = this.shadowRoot.querySelector("input");

        // Value change listener
        inputEl.addEventListener("input", (e) => {
            // Get the target and its value
            const eventTarget: any = e.target;
            const inputValue: number = Number(eventTarget.value);

            // Clear errors in case they exist
            errorMessageEl.textContent = "";
            eventTarget.classList.remove("error");

            // Check if the value is valid
            if (!inputValue) {
                errorMessageEl.textContent = "Can't be zero";
                eventTarget.classList.add("error");
            }

            // Create a custom event
            const valueChangeEvent = new CustomEvent("valueChange", {
                detail: {
                    inputValue,
                },
            });

            // Dispatch the event
            this.dispatchEvent(valueChangeEvent);
        });
    }

    // Render method
    render() {
        // Get the attributes
        const labelText = this.getAttribute("label");
        const icon = this.getAttribute("icon");
        const placeholder: string = this.getAttribute("placeholder") || "";
        const maxLength: number = Number(this.getAttribute("maxLength")) || 5;

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

                    height: 100%;
                }

                .container__upper {
                    display: ${labelText ? "flex" : "none"};
                    align-items: center;
                    justify-content: space-between;
                }

                .container__upper > label {
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--dark-grayish-cyan);
                }

                .error-message {
                    font-size: 14px;
                    color: #e75326;
                }

                .container__input-container {
                    position: relative;
                    
                    display: flex;
                    align-items: center;
                }

                .container__input-container > img {
                    display: ${icon ? "initial" : "none"};

                    position: absolute;
                    left: ${auxPadding * 1.5}px;
                }

                .container__input-container > input {
                    height: 100%;
                    width: 100%;
                    padding: ${auxPadding * 0.75}px ${auxPadding * 1.25}px;

                    font-family: "Space Mono", monospace;
                    font-weight: 700;
                    font-size: 21px;
                    color: var(--very-dark-cyan);
                    background-color: var(--very-light-grayish-cyan);
                    caret-color: var(--strong-cyan);
                    border-style: none;
                    border-radius: 5px;
                    text-align: right;
                    letter-spacing: 0.10rem;

                }

                .container__input-container > input:not(.error):focus {
                    outline: solid 2px var(--strong-cyan);
                }

                .container__input-container > input::placeholder {
                    color: var(--grayish-cyan);
                }

                input.error {
                    outline: solid 2px #e75326;
                }

            </style>

            <div class="container">
                <div class="container__upper">
                    <label for="input">${labelText}</label>
                    <span class="error-message"></span>
                </div>
                <div class="container__input-container">
                    <img src="${iconFiles[icon]}" alt="inputLogo">
                    <input
                    type="text"
                    placeholder="${placeholder}"
                    name="input"
                    id="input"
                    maxlength="${maxLength}"
                    oninput="this.value = this.value.replace(/([^0-9.])+/g, '')"
                    />
                </div>
            </div>
        `;

        // Add listeners to the component
        this.addListeners();
    }
}

// Define the component
customElements.define("labeled-input", LabeledInput);

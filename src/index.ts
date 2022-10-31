import "./components/labeled-input/labeled-input";
import "./components/tip-button/tip-button";
import "./components/result-component/result-component";
import { state } from "./state";

// Display results function
function displayResults(resultsContainerEl: Element): void {
    // Get the results
    const { individualTip, individualTotal } = state.getResults();

    // Change the container content
    resultsContainerEl.innerHTML = `
        <result-comp
        title="Tip Amount"
        sub="person"
        price="${individualTip.toFixed(2)}"
        ></result-comp>
        
        <result-comp
        title="Total"
        sub="person"
        price="${individualTotal.toFixed(2)}"
        ></result-comp>
    `;
}

// Main function
(function (): void {
    // Aux variables
    const tipOptions = document.querySelector(
        ".tip-selector__buttons"
    ).children;
    const inputsArray = document.querySelectorAll("labeled-input");
    const resultsContEl: Element = document.querySelector(".results-cont");

    // Input handlers
    inputsArray.forEach((inputEl) => {
        inputEl.addEventListener("valueChange", (e: any) => {
            // Get the input icon attribute, and the value
            const inputIcon: string = e.target.getAttribute("icon");
            const inputValue: number = e.detail.inputValue;

            if (!inputIcon) {
                // Update the tip percentage
                state.updateTip(inputValue);
            } else if (inputIcon === "dollar") {
                // Update the bill
                state.updateBill(inputValue);
            } else {
                // Update the person number
                state.updatePeople(inputValue);
            }
        });
    });

    // Tip options selection handler
    for (const optionEl of tipOptions) {
        // Add a selected event listener
        optionEl.addEventListener("click", (e: any) => {
            // First of all, deselect any option
            for (const option of tipOptions) {
                option.removeAttribute("selected");

                if (option.tagName.toLowerCase() === "labeled-input") continue;

                option.shadowRoot
                    .querySelector(".button-el")
                    .classList.remove("selected");
            }

            // Get the target element, and its tag name
            const targetEl = e.target;
            const targetTagName: string = targetEl.tagName.toLowerCase();

            // Add the selected attribute
            targetEl.setAttribute("selected", "");

            // If the selected option is the custom input...
            if (targetTagName === "labeled-input") {
                return;
            }

            // Add the selected class to the button element
            const shadowButtonEl: Element =
                targetEl.shadowRoot.querySelector(".button-el");
            shadowButtonEl.classList.add("selected");

            // Get the tip value, and update the state
            const tipValue: number = Number(targetEl.getAttribute("value"));

            state.updateTip(tipValue);
        });
    }

    // Display results for the first time
    displayResults(resultsContEl);

    // Subscribe to changes
    state.subscribe(() => displayResults(resultsContEl));
})();

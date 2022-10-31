export const state = {
    data: {
        bill: 0,
        tipPercentage: 0,
        people: 1,
    },

    listeners: [],

    // Getter
    getState() {
        return this.data;
    },

    // Setter
    setState(newState) {
        this.data = newState;

        for (const cbFunction of this.listeners) {
            cbFunction();
        }
    },

    // Update bill method
    updateBill(bill: number) {
        // Get the current state
        const currentState = this.getState();

        // Change the bill
        currentState.bill = bill;

        // Update
        this.setState(currentState);
    },

    // Update bill method
    updateTip(tip: number) {
        // Get the current state
        const currentState = this.getState();

        // Change the bill
        currentState.tipPercentage = tip;

        // Update
        this.setState(currentState);
    },

    // Update people method
    updatePeople(people: number) {
        // Get the current state
        const currentState = this.getState();

        // Change the bill
        currentState.people = people;

        // Update
        this.setState(currentState);
    },

    // Get results method
    getResults() {
        // Get the current state and the useful values
        const currentState = this.getState();
        const { bill, tipPercentage, people } = currentState;

        // Aux variables
        let individualTip: number = 0;
        let individualTotal: number = 0;

        // If there's no people...
        if (!people) {
            return { individualTip, individualTotal };
        }

        // Calculus time...
        individualTip = (bill * tipPercentage) / 100 / people;
        individualTotal = bill / people + individualTip;

        return { individualTip, individualTotal };
    },

    // Subscribe method
    subscribe(cbFunction: (any: any) => any) {
        this.listeners.push(cbFunction);
    },
};

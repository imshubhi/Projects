class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Clears all values
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Deletes the last character in the current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Appends a number to the current operand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // Prevent multiple decimals
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Sets the operation and moves current operand to previous operand
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Computes the result based on the chosen operation
    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    // Updates the display with the current and previous operands
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Selecting all necessary elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Creating a new calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Adding event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Adding event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Adding event listener for equals button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// Adding event listener for all-clear button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// Adding event listener for delete button
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


/*
Here’s a detailed explanation of each line of the JavaScript code:

### **Class Definition:**

```javascript
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
```

- **`class Calculator`**: Defines a new class called `Calculator`.
- **`constructor(previousOperandTextElement, currentOperandTextElement)`**: The constructor method initializes the instance of the class. It accepts two parameters: `previousOperandTextElement` and `currentOperandTextElement`, which refer to the DOM elements that will display the previous and current operands of the calculator.
- **`this.clear()`**: Calls the `clear()` method to reset the calculator when a new instance is created.

### **`clear()` Method:**

```javascript
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
```

- **`clear()`**: This method resets the calculator’s state by clearing the current operand, previous operand, and operation.
- **`this.currentOperand = ''`**: Clears the current operand by setting it to an empty string.
- **`this.previousOperand = ''`**: Clears the previous operand by setting it to an empty string.
- **`this.operation = undefined`**: Resets the operation to `undefined`, meaning no operation is selected.

### **`delete()` Method:**

```javascript
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
```

- **`delete()`**: This method removes the last character from the current operand.
- **`this.currentOperand = this.currentOperand.toString().slice(0, -1)`**: Converts `currentOperand` to a string (if it's not already), then slices the string to remove the last character. `slice(0, -1)` means start from the beginning and exclude the last character.

### **`appendNumber(number)` Method:**

```javascript
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // Prevent multiple decimals
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
```

- **`appendNumber(number)`**: This method appends the number clicked by the user to the current operand.
- **`if (number === '.' && this.currentOperand.includes('.')) return`**: Prevents adding multiple decimal points to the `currentOperand`. If a decimal (`.`) is clicked and `currentOperand` already contains a decimal, the function returns early without doing anything.
- **`this.currentOperand = this.currentOperand.toString() + number.toString()`**: Appends the clicked number to the `currentOperand`. Both values are converted to strings to ensure concatenation works as expected.

### **`chooseOperation(operation)` Method:**

```javascript
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
```

- **`chooseOperation(operation)`**: This method is triggered when an operation button (like `+`, `-`, etc.) is clicked.
- **`if (this.currentOperand === '') return`**: If the `currentOperand` is empty, the function exits early because there’s nothing to operate on.
- **`if (this.previousOperand !== '') { this.compute() }`**: If there’s already a value in `previousOperand`, it computes the result using the `compute()` method before proceeding. This ensures that the previous operation is completed before starting a new one.
- **`this.operation = operation`**: Sets the `operation` to the operation that was clicked (e.g., `+`, `-`, etc.).
- **`this.previousOperand = this.currentOperand`**: Moves the `currentOperand` to `previousOperand` so that it’s ready for the next calculation.
- **`this.currentOperand = ''`**: Clears the `currentOperand` after setting the `operation`.

### **`compute()` Method:**

```javascript
    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }
```

- **`compute()`**: This method performs the calculation based on the selected operation (`+`, `-`, `*`, or `÷`).
- **`let result`**: Declares a variable `result` to store the computation.
- **`const prev = parseFloat(this.previousOperand)`**: Converts the `previousOperand` to a floating-point number.
- **`const current = parseFloat(this.currentOperand)`**: Converts the `currentOperand` to a floating-point number.
- **`if (isNaN(prev) || isNaN(current)) return`**: If either operand is not a valid number (i.e., `NaN`), the function exits without performing any computation.
- **`switch (this.operation)`**: This `switch` statement checks the chosen operation and performs the corresponding calculation.
    - **`result = prev + current`**: If the operation is `+`, add the two operands.
    - **`result = prev - current`**: If the operation is `-`, subtract the two operands.
    - **`result = prev * current`**: If the operation is `*`, multiply the two operands.
    - **`result = prev / current`**: If the operation is `÷`, divide the two operands.
- **`this.currentOperand = result`**: Stores the result of the computation in `currentOperand`.
- **`this.operation = undefined`**: Resets the operation to `undefined`.
- **`this.previousOperand = ''`**: Clears the `previousOperand`.

### **`updateDisplay()` Method:**

```javascript
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
```

- **`updateDisplay()`**: This method updates the displayed values in the DOM.
- **`this.currentOperandTextElement.innerText = this.currentOperand`**: Sets the `currentOperand` value to the inner text of the `currentOperandTextElement`, updating the display.
- **`if (this.operation != null)`**: If an operation has been selected, it updates the `previousOperandTextElement` to show both the `previousOperand` and the selected operation.
- **`${this.previousOperand} ${this.operation}`**: Displays the previous operand and the selected operation.
- **`this.previousOperandTextElement.innerText = ''`**: If no operation is selected, the previous operand area is cleared.

### **Event Listeners:**

```javascript
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
```

- **Selecting Elements**: 
    - **`numberButtons`**: Selects all buttons with the `data-number` attribute.
    - **`operationButtons`**: Selects all buttons with the `data-operations` attribute.
    - **`equalsButton`**: Selects the button with the `data-equals` attribute.
    - **`deleteButton`**: Selects the button with the `data-delete` attribute.
    - **`allClearButton`**: Selects the button with the `data-all-clear` attribute.
    - **`previousOperandTextElement`** and **`currentOperandTextElement`**: Selects the DOM elements where the operands will be displayed.

- **Creating the Calculator**: 
    - **`const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)`**: Instantiates a new `Calculator` object, passing in the DOM elements where the operands will be shown.

- **Adding Event

 Listeners**:
    - For each number button, when clicked, the `appendNumber` method is called to append the number to `currentOperand` and update the display.
    - For each operation button, when clicked, the `chooseOperation` method is called to set the selected operation and update the display.
    - When the equals button is clicked, the `compute` method is triggered to perform the calculation and update the display.
    - The all-clear button clears everything, and the delete button deletes the last digit.

This code provides the full functionality for a basic calculator.*/ 
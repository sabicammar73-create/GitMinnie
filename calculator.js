// Calculator state
let display = '';
let expression = '';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

// Get DOM elements
const displayInput = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');

/**
 * Append a number to the display
 * @param {string} num - The number to append
 */
function appendNumber(num) {
    if (shouldResetDisplay) {
        display = '';
        shouldResetDisplay = false;
    }

    // Prevent multiple leading zeros
    if (display === '0' && num === '0') {
        return;
    }

    // Replace leading zero with new number (except for decimals)
    if (display === '0' && num !== '.') {
        display = num;
    } else {
        display += num;
    }

    updateDisplay();
}

/**
 * Append an operator to the expression
 * @param {string} op - The operator (+, -, *, /)
 */
function appendOperator(op) {
    if (display === '' && previousValue === null) {
        return; // Can't start with an operator
    }

    if (display === '') {
        // Replace operator if nothing after it
        operator = op;
        updateExpression();
        return;
    }

    if (previousValue !== null && operator !== null && display !== '') {
        // Calculate if there's already an operation pending
        calculate();
    }

    previousValue = parseFloat(display);
    operator = op;
    display = '';
    shouldResetDisplay = false;
    updateExpression();
}

/**
 * Add a decimal point to the current number
 */
function appendDecimal() {
    if (shouldResetDisplay) {
        display = '0';
        shouldResetDisplay = false;
    }

    // Only add decimal if there isn't one already
    if (display.indexOf('.') === -1) {
        display = display === '' ? '0' : display;
        display += '.';
    }

    updateDisplay();
}

/**
 * Calculate the result of the current expression
 */
function calculate() {
    if (operator === null || previousValue === null || display === '') {
        return;
    }

    const currentValue = parseFloat(display);
    let result;

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            // Prevent division by zero
            if (currentValue === 0) {
                display = 'Error';
                updateDisplay();
                resetCalculator();
                return;
            }
            result = previousValue / currentValue;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;

    display = result.toString();
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
    expressionDisplay.textContent = '';
    updateDisplay();
}

/**
 * Delete the last character from the display
 */
function deleteLast() {
    if (display === '') {
        return;
    }

    display = display.slice(0, -1);
    updateDisplay();
}

/**
 * Clear the entire calculator
 */
function clearDisplay() {
    resetCalculator();
    updateDisplay();
    updateExpression();
}

/**
 * Reset the calculator state
 */
function resetCalculator() {
    display = '';
    expression = '';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
}

/**
 * Update the main display
 */
function updateDisplay() {
    displayInput.value = display || '0';
}

/**
 * Update the expression display
 */
function updateExpression() {
    if (previousValue === null) {
        expressionDisplay.textContent = '';
    } else {
        const operatorSymbol = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        }[operator] || operator;
        expressionDisplay.textContent = `${previousValue} ${operatorSymbol}`;
    }
}

/**
 * Keyboard support
 */
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();

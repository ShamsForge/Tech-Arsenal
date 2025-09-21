const container = document.querySelector('.calculator-container'); // Main Container
const display = document.getElementById('display'); // Display Screen | Output
const buttons = container.querySelectorAll('.btn'); // Buttons | Calc Keys

let currentInput = ''; // String to hold the current input

// const operators = ['+', '-', '*', '/'];
// const functions = ['clear', 'backspace', 'percent', 'equals'];



const calculate = (num1, operator, num2) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (operator === 'add') return a + b;
    if (operator === 'subtract') return a - b;
    if (operator === 'multiply') return a * b;
    if (operator === 'divide') return b !== 0 ? a / b : 'Error';
    return num2;
};


container.querySelector('.button-container').addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.value || display.textContent;
    const prevKey = container.dataset.previousKeyType;

    // NUMBER BUTTONS
    if (!action) {
        if (displayNum === '0' || prevKey === 'operator' || prevKey === 'calculate') {
            display.value = keyContent;
        } else {
            display.value += keyContent;
        }
        container.dataset.previousKeyType = 'number';
    }

    // DECIMAL BUTTON
    if (action === 'decimal') {
        if (prevKey === 'operator' || prevKey === 'calculate') {
            display.value = '0.';
        } else if (!displayNum.includes('.')) {
            display.value += '.';
        }
        container.dataset.previousKeyType = 'decimal';
    }

    // OPERATOR BUTTONS
    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        const firstValue = container.dataset.firstValue;
        const operator = container.dataset.operator;
        const currentValue = display.value;


        if (firstValue && operator && prevKey !== 'operator' && prevKey !== 'calculate') {
            const result = calculate(firstValue, operator, currentValue);
            display.value = result;
            container.dataset.firstValue = result;
        } else {
            container.dataset.firstValue = currentValue;
        }

        container.dataset.operator = action;
        container.dataset.previousKeyType = 'operator';
    }

    // EQUALS BUTTON
    if (action === 'calculate') {
        let firstValue = container.dataset.firstValue;
        const operator = container.dataset.operator;
        let secondValue = display.value;

        if (!firstValue || !operator) return;

        if (prevKey === 'calculate') {
            firstValue = display.value;
            secondValue = container.dataset.modValue;
        }

        const result = calculate(firstValue, operator, secondValue);
        display.value = result;
        container.dataset.firstValue = null;
        container.dataset.modValue = secondValue;
        container.dataset.previousKeyType = 'calculate';
    }

    // CLEAR BUTTON
    if (action === 'clear') {
        display.value = '0';
        container.dataset.firstValue = '';
        container.dataset.modValue = '';
        container.dataset.operator = '';
        container.dataset.previousKeyType = '';
    }

    // BACKSPACE BUTTON
    if (action === 'backspace') {
        if (display.value.length === 1 || display.value === 'Error') {
            display.value = '0';
        } else {
            display.value = display.value.slice(0, -1);
        }
        container.dataset.previousKeyType = 'backspace';
    }
});
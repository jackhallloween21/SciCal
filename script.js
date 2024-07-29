const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentValue += value;
            updateDisplay();
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('func')) {
            handleFunction(value);
        }
    });
});

function updateDisplay() {
    display.textContent = currentValue || '0';
}

function handleOperator(op) {
    if (currentValue !== '') {
        if (previousValue !== '') {
            calculate();
        } else {
            previousValue = currentValue;
        }
        operator = op;
        currentValue = '';
    }
}

function handleFunction(func) {
    if (func === 'AC') {
        clear();
    } else if (func === '+/-') {
        currentValue = (parseFloat(currentValue) * -1).toString();
        updateDisplay();
    }
    // Add more function handlers as needed
}

function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = '';
    previousValue = '';
    updateDisplay();
}

function clear() {
    currentValue = '';
    operator = '';
    previousValue = '';
    updateDisplay();
}

updateDisplay();

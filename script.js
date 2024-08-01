const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';
let memory = 0;
let isRadians = true;

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
    switch(func) {
        case 'AC':
            clear();
            break;
        case '+/-':
            currentValue = (parseFloat(currentValue) * -1).toString();
            break;
        case '%':
            currentValue = (parseFloat(currentValue) / 100).toString();
            break;
        case 'π':
            currentValue = Math.PI.toString();
            break;
        case 'e':
            currentValue = Math.E.toString();
            break;
        case 'sin':
            currentValue = Math.sin(parseFloat(currentValue) * (isRadians ? 1 : Math.PI / 180)).toString();
            break;
        case 'cos':
            currentValue = Math.cos(parseFloat(currentValue) * (isRadians ? 1 : Math.PI / 180)).toString();
            break;
        case 'tan':
            currentValue = Math.tan(parseFloat(currentValue) * (isRadians ? 1 : Math.PI / 180)).toString();
            break;
        case 'log':
            currentValue = Math.log10(parseFloat(currentValue)).toString();
            break;
        case 'ln':
            currentValue = Math.log(parseFloat(currentValue)).toString();
            break;
        case 'x!':
            currentValue = factorial(parseFloat(currentValue)).toString();
            break;
        case '√':
            currentValue = Math.sqrt(parseFloat(currentValue)).toString();
            break;
        case 'x²':
            currentValue = Math.pow(parseFloat(currentValue), 2).toString();
            break;
        case 'Rad':
            isRadians = !isRadians;
            button.textContent = isRadians ? 'Rad' : 'Deg';
            return;
        case 'Rand':
            currentValue = Math.random().toString();
            break;
        // Add more functions as needed
    }
    updateDisplay();
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
        case 'xy':
            result = Math.pow(prev, current);
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

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

updateDisplay();

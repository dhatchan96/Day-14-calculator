var calculator = document.querySelector('.calculator');
var memory = localStorage.getItem('memory') || 0;


var buttons = [
    '1', '2', '3', '+',
    '4', '5', '6', '-',
    '7', '8', '9', '*',
    '0', '.', '/', 'C',
    '=', 'M+', 'M-', 'MC'
];

buttons.forEach(function(buttonValue) {
    var button = document.createElement('input');
    button.type = 'button';
    button.value = buttonValue;
    button.addEventListener('click', function() {
        if (buttonValue === 'C') {
            clearResult();
        } else if (buttonValue === '=') {
            calculate();
        } else if (buttonValue === 'M+') {
            addToMemory();
        } else if (buttonValue === 'M-') {
            subtractFromMemory();
        } else if (buttonValue === 'MC') {
            clearMemory();
        } else {
            appendToResult(buttonValue);
        }
    });
    calculator.appendChild(button);
});

// Add event listener to input field to prevent non-numeric input
document.getElementById('result').addEventListener('keydown', function(event) {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
        alert("Only numbers are allowed");
    }
});

function appendToResult(value) {
    document.getElementById("result").value += value;
}

function clearResult() {
    document.getElementById("result").value = "";
}

function calculate() {
    var result = document.getElementById("result").value;
    var finalResult = eval(result); // Use of eval can be risky in production code
    document.getElementById("result").value = finalResult;
}

function addToMemory() {
    var currentValue = parseFloat(document.getElementById('result').value);
    memory += currentValue;
    localStorage.setItem('memory', memory);
}

function subtractFromMemory() {
    var currentValue = parseFloat(document.getElementById('result').value);
    memory -= currentValue;
    localStorage.setItem('memory', memory);
}

function clearMemory() {
    memory = 0;
    localStorage.setItem('memory', memory);
}
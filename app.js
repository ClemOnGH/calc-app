const buttons = document.getElementById('buttons');
const preview = document.getElementById('preview');
buttons.style.padding = '0.2rem';
const buttonSymbols = ['AC', '±', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '⇐', '0', '.', '='];
let currentInput = '',
    previousInput = '',
    operator = '';

const previewBack = document.createElement('p');
previewBack.id = 'preview-back';
const previewCurr = document.createElement('p');
previewCurr.id = 'preview-curr';
preview.appendChild(previewBack);
preview.appendChild(previewCurr);

for (i = 0; i < 20; i++) {
    const btn = document.createElement('div');

    if (i >= 0 && i <= 2) {
        btn.style.color = 'var(--teal)';
    } else if (i === 3 || i === 7 || i === 11 || i === 15 || i === 19) {
        btn.style.color = 'var(--red)';
    } else {
        btn.style.color = 'white';
    }

    btn.textContent = buttonSymbols[i];
    buttons.appendChild(btn);
}
const calcButtons = document.querySelectorAll('#buttons div');

calcButtons.forEach((el) => {
    el.onmouseover = (e) => {
        const t = e.target.textContent;
        if (t === 'AC' || t === '±' || t === '%') {
            e.target.style.border = '2px solid var(--teal)';
        } else if (t === '/' || t === '*' || t === '-' || t === '+' || t === '=') {
            e.target.style.border = '2px solid var(--red)';
        } else {
            e.target.style.border = '2px solid rgba(255,255,255,0.8)';
        }
    };

    el.onmouseleave = (e) => {
        e.target.style.border = '2px solid transparent';
    };

    el.onclick = (e) => {
        updatePreview(e.target.textContent);
    };
});

function updatePreview(key) {
    if (!isNaN(key)) {
        currentInput += key;
        previewCurr.innerHTML = currentInput;
    } else {
        previewBack.textContent = previousInput;
        previewCurr.innerHTML = '';

        switch (key) {
            case '+':
            case '-':
            case '*':
            case '/':
                operator = key;
                previousInput = currentInput;
                currentInput = '';
                break;
            case '=':
                if (previousInput && operator) {
                    console.log(`${Number(currentInput)} ${operator} ${Number(previousInput)}`);
                    console.log(eval(`${Number(currentInput)} ${operator} ${Number(previousInput)}`));
                    previewCurr.innerHTML = eval(`${Number(currentInput)} ${operator} ${Number(previousInput)}`);
                    operator = '';
                }
                break;
            case 'AC':
                currentInput = '';
                previousInput = '';
                operator = '';
                break;
        }
    }
}

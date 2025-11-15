class Tabs {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.tabHeader = this.container.querySelector('.tabs-header')
        this.tabButtons = this.container.querySelectorAll('.tabs_button');
        this.tabContent = this.container.querySelectorAll('.tabs-content');
        this.init();
    }

    init() {

        this.tabHeader.addEventListener('click', (e) => {
            const clickedButton = e.target.closest('.tabs_button');

            if (!clickedButton) return;

            e.preventDefault();
            const index = clickedButton.dataset.tabIndex;
            if (index !== undefined) {
                this.activateTab(index)
            }

        });
        this.activateTab(0);
    }

    activateTab(index) {
        this.tabButtons.forEach((btn, i) => {
            if (i == index) {
                btn.classList.add('is-active');
            } else {
                btn.classList.remove('is-active');
            }
        });

        this.tabContent.forEach((content, i) => {
            if (i == index) {
                content.classList.add('is-active');
            } else {
                content.classList.remove('is-active');
            }
        });
    }
}

function encrypt(text, cols) {
      
    const rows = Math.ceil(text.length / cols);

    return [...Array(cols).keys()].reduce((result, j) => {

        const rowss = [...Array(rows).keys()].reduce((rowssult, i) => {
            const index = i * cols + j;
            if (index < text.length) {
                return rowssult + text[index];
            } else {
                return rowssult + "!";
            }
        }, '');
        return result + rowss;
    }, '');

}

    //розшифрування
function decrypt(text, cols) {
    const rows = Math.ceil(text.length / cols);
    
    return [...Array(rows).keys()].reduce((result, i) => { 
        const rowss = [...Array(cols).keys()].reduce((rowssult, j) => {
            const index = (j * rows) + i;
            return rowssult + text[index];
        }, '');
        return result + rowss;
    }, '');

}



document.addEventListener('DOMContentLoaded', () => {

    new Tabs('#main-tabs');

    const keyEncrypt = document.getElementById('key-encrypt');
    const keyDecrypt = document.getElementById('key-decrypt');
    const inputTextEncrypt = document.getElementById('inputText-encrypt');
    const inputTextDecrypt = document.getElementById('inputText-decrypt');
    const sufr = document.getElementById('sufr');
    const undsufr = document.getElementById('undsufr');
    const outputTextEncrypt = document.getElementById('outputText-encrypt');
    const outputTextDecrypt = document.getElementById('outputText-decrypt');

    sufr.addEventListener('click', () => {
    const text = inputTextEncrypt.value;
    const cols = parseInt(keyEncrypt.value, 10);

    if (!text || !cols || cols <= 1) {
        alert("Будь ласка, введіть текст та коректний ключ (кількість стовпців > 1).");
        return;
    }

    outputTextEncrypt.value = encrypt(text, cols);
    });

    // Кнопка Розшифрувати
    undsufr.addEventListener('click', () => {
    const text = inputTextDecrypt.value;
    const cols = parseInt(keyDecrypt.value, 10);

    if (!text || !cols || cols <= 1) {
        alert("Будь ласка, введіть текст та коректний ключ (кількість стовпців > 1).");
        return;
    }else if(text.length % cols !=0){
        alert("Будь ласка, введіть текст та коректний ключ так щоб при діленні кількості символів на ключ виходило ціле значення.");
        return;
    }
        
    outputTextDecrypt.value = decrypt(text, cols);
    });

});

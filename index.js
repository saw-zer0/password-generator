
class PasswordGenerator {
    constructor() {
        let unicodeOfA = 65;
        let unicodeOfa = 97;
        this.numbers = Array.from(Array(10).keys());
        this.lowercase = Array.from(Array(26).keys()).map((elem, index) => String.fromCharCode(index + unicodeOfa));
        this.uppercase = Array.from(Array(26).keys()).map((elem, index) => String.fromCharCode(index + unicodeOfA));
        this.symbols = Array.from('!@#$%^&*-_+=/');

        this.characterPool = {};
        this.requireNumber = false;
        this.requireLowercase = false;
        this.requireUppercase = false;
        this.requireSymbols = false;
    };

    addToCharacterPool(charType) {

        switch (charType) {
            case 'lowercase':
                this.characterPool.lower = this.lowercase;
                break;
            case 'uppercase':
                this.characterPool.upper = this.uppercase;
                break;
            case 'numbers':
                this.characterPool.number = this.numbers;
                break;
            case 'symbols':
                this.characterPool.symbol = this.symbols;
                break;
        };
    };

    removeFromPool(charType) {
        switch (charType) {
            case 'lowercase':
                this.characterPool.lower = undefined;
                break;
            case 'uppercase':
                this.characterPool.upper = undefined;
                break;
            case 'numbers':
                this.characterPool.number = undefined;
                break;
            case 'symbols':
                this.characterPool.symbol = undefined;
                break;
        }
    }

    generate(passwordLength, displayElement) {
        let password = ''
        let charPoolArr = Array.from(Object.values(this.characterPool));

        if (charPoolArr === [] || charPoolArr.every(elem => elem === undefined)) {
            charPoolArr = this.lowercase;
        }
        charPoolArr = charPoolArr.filter(elem => elem !== undefined);
        for (let i = 0; i < passwordLength; i++) {
            let randomType = Math.floor(Math.random() * charPoolArr.length);
            let randomValue = Math.floor(Math.random() * charPoolArr[randomType].length);
            password += charPoolArr[randomType][randomValue];
        }

        displayElement.innerText = password;
    }


    darkMode() {
        const body = document.getElementById('body');
        body.style.backgroundColor = 'black';
        body.children.forEach(elem => {
            elem.style.color = 'white';
        })
    }

    lightMode() {
        const body = document.getElementById('body');
        body.style.backgroundColor = 'white';
        body.children.forEach(elem => {
            elem.style.color = 'black';
        })
    }
};

const inst = new PasswordGenerator();
const lengthSlider = document.getElementById('slider');
const lengthInput = document.getElementById('password-length-input');
const toggles = document.querySelectorAll('[data-toggle]');
const generate = document.getElementById('generate');
const displayPassword = document.getElementById('display-password');
const darkMode = document.getElementById('darkmode-toggle');


toggles.forEach(elem => {
    elem.addEventListener('click', () => {
        if (elem.checked) {
            inst.addToCharacterPool(elem.id, elem);
        } else {
            inst.removeFromPool(elem.id, elem);
        };
    });
});


generate.addEventListener('click', () => {
    inst.generate(lengthSlider.value, displayPassword);
});

lengthSlider.addEventListener('input', () => {
    if (displayPassword.innerText) {
        inst.generate(lengthSlider.value, displayPassword);
    };
    lengthInput.value = lengthSlider.value;
});

lengthInput.addEventListener('change',()=>{
    lengthSlider.value = lengthInput.value;
})

darkMode.addEventListener('click', () => {
    document.getElementById('body').classList.toggle('dark-mode');
});




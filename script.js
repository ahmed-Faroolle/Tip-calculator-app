const form = document.querySelector('.tip__precent');
const billnput = document.querySelector('[name="bill"]');
const number__of__people = document.querySelector('[name="number__of__people"]');
const customPrecent = document.querySelector('[name="custom"]');
const errors = document.querySelectorAll('.error');
const tip__per__person = document.querySelector('.tip__per__person');
const total__bill = document.querySelector('.total__bill');
const resetBtn = document.querySelector('.reset__btn');

errors.forEach(errorEl => {
    errorEl.classList.add('hidden')
})

const isEmpty = function (input) {
    if (input === '') {
        return true;
    }

    return false;
}
const activateError = function (el, elToValidate, error) {
    el.classList.remove('hidden');
    elToValidate.classList.add('input__error');
    el.textContent = `${error}`;
}
const resetError = function (el, elToValidate) {
    el.classList.add('hidden')
    elToValidate.classList.remove('input__error');
    el.textContent = ``;
}


const validateInput = function(el) {
    const billErrorEl = el.previousElementSibling.querySelector('.error');

    if (isEmpty(el.value)) {
        activateError(billErrorEl, el, "it's not number");
        return false;
    } else if (el.value < 1) {
        activateError(billErrorEl, el, "Can't be zero");
        return false;
    } else {
        resetError(billErrorEl, el);
        return el.value;
    }
}

const formEventHandler = function (e) {
    e.preventDefault();
    const clicked = e.target.dataset.precent;
    if (!clicked) return;
    calcAndDisplayTip(clicked);
    
}
form.addEventListener('click', formEventHandler)

const calcAndDisplayTip = function (tipPrecentage) {
    const bill = validateInput(billnput);
    const numberOfPeople = validateInput(number__of__people);

    if (bill && numberOfPeople) {
        const tip = (tipPrecentage / 100) * bill;
        tip__per__person.textContent = `$${(tip / numberOfPeople).toFixed(2)}`;
        total__bill.textContent = `$${(+bill + tip).toFixed(2)}`;
    }
}

const setCustomTip = function (inputCustomTipEl, tipPrecentage) {
    if (tipPrecentage < 1) {
        inputCustomTipEl.value = 1;
    }

    if (tipPrecentage >= 100) {
        inputCustomTipEl.value = 100;
    }
}

const customPrecentEvent = function (e) {
        const tipPrecentage = e.target.value;
        setCustomTip(e.target, tipPrecentage);
        calcAndDisplayTip(tipPrecentage);
}

const resetFn = function (e) {
    total__bill.textContent = '$0.00';
    tip__per__person.textContent = '$0.00';
    number__of__people.value = '';
    billnput.value = '';
    customPrecent.value = '';
}
customPrecent.addEventListener('keyup', customPrecentEvent)
customPrecent.addEventListener('mouseenter', customPrecentEvent)
resetBtn.addEventListener('click', resetFn)

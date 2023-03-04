function showInputError(inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, inputErrorClass, errorClass) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, btnElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        btnElement.setAttribute('disabled', true);
        btnElement.classList.add(inactiveButtonClass);
    }
    else {
        btnElement.removeAttribute('disabled');
        btnElement.classList.remove(inactiveButtonClass);
    }
}

function checkInputValidity(inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
    else {
        hideInputError(inputElement, inputErrorClass, errorClass);
    }
}

function setInputEventListeners(formElement, props) {
    const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
    const btnElement = formElement.querySelector(props.submitButtonSelector);
    toggleButtonState(inputList, btnElement, props.inactiveButtonClass);
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, btnElement, props.inactiveButtonClass);
        }, 0);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, props.inputErrorClass, props.errorClass);
            toggleButtonState(inputList, btnElement, props.inactiveButtonClass);
        });
    });
}

function enableValidation(props) {
    const formList = Array.from(document.forms);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setInputEventListeners(formElement, props);
    });
}

enableValidation(classesAndSelectors);


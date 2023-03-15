export default class FormValidator {
    constructor(formElement, classesAndSelectors) {
        this._formElement = formElement;
        this._classesAndSelectors = classesAndSelectors;
    }
    enableValidation() {
        this._setInputEventListeners();
    }

    _showInputError(inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement, inputErrorClass, errorClass) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, btnElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            btnElement.setAttribute('disabled', true);
            btnElement.classList.add(inactiveButtonClass);
        }
        else {
            btnElement.removeAttribute('disabled');
            btnElement.classList.remove(inactiveButtonClass);
        }
    }

    _checkInputValidity(inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        }
        else {
            this._hideInputError(inputElement, inputErrorClass, errorClass);
        }
    }

    _setInputEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._classesAndSelectors.inputSelector));
        const btnElement = this._formElement.querySelector(this._classesAndSelectors.submitButtonSelector);
        this._toggleButtonState(inputList, btnElement, this._classesAndSelectors.inactiveButtonClass);
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, btnElement, this._classesAndSelectors.inactiveButtonClass);
            }, 0);
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement, this._classesAndSelectors.inputErrorClass, this._classesAndSelectors.errorClass);
                this._toggleButtonState(inputList, btnElement, this._classesAndSelectors.inactiveButtonClass);
            });
        });
    }
}





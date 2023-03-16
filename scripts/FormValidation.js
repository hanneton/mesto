export default class FormValidator {
    constructor(formElement, classesAndSelectors) {
        this._formElement = formElement;
        this._classesAndSelectors = classesAndSelectors;
    }

    enableValidation() {
        this._setInputEventListeners();
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._classesAndSelectors.inputErrorClass);
        errorElement.classList.add(this._classesAndSelectors.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._classesAndSelectors.inputErrorClass);
        errorElement.classList.remove(this._classesAndSelectors.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._btnElement.setAttribute('disabled', true);
            this._btnElement.classList.add(this._classesAndSelectors.inactiveButtonClass);
        }
        else {
            this._btnElement.removeAttribute('disabled');
            this._btnElement.classList.remove(this._classesAndSelectors.inactiveButtonClass);
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _setInputEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._classesAndSelectors.inputSelector));
        this._btnElement = this._formElement.querySelector(this._classesAndSelectors.submitButtonSelector);
        this._toggleButtonState();
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}





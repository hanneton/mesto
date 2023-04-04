import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super();
        this.handleSubmit = handleSubmit;
        this._popup = document.querySelector(popupSelector);
    }

    _getInputValues() {
        [this._firstInput, this._secondInput] = Array.from(this._popup.querySelectorAll('.form__item'));
        return { firstInputValue: this._firstInput.value, secondInputValue: this._secondInput.value };
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(this._getInputValues());//saveEditInfo or saveAddInfo
        });
        super.setEventListeners();
    }

    close() {
        this._getInputValues();
        this._firstInput.value = '';
        this._secondInput.value = '';
        super.close();
    }
}
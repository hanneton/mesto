import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this.handleSubmit = handleSubmit;
        this._saveBtn = this._popup.querySelector('.popup__save-button');
        this._saveBtnTxt = this._saveBtn.textContent;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._popup.querySelectorAll('.form__item'));
    }

    renderLoading(isLoading, loadingTxt = "Сохранение...") {
        if (isLoading) {
            this._saveBtn.textContent = loadingTxt;

        }
        else {
            this._saveBtn.textContent = this._saveBtnTxt;
        }
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setInputValues(info) {
        this._inputList.forEach(input => {
            input.value = info[input.name];
        })
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (e) => {
            e.preventDefault();
            this.renderLoading(true);
            this.handleSubmit(this._getInputValues());//saveEditInfo or saveAddInfo
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}
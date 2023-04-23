import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this.handleSubmit = handleSubmit;
        this.deleteBtn = this._popup.querySelector('.popup__save-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this.deleteBtn.addEventListener('click', () => {
            this.handleSubmit(this._cardId);
        });
    }

    open(cardId) {
        this._cardId = cardId;
        super.open();
    }
}
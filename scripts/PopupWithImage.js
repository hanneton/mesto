import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector, title, link) {
        super();
        this._popup = document.querySelector(popupSelector);
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupPic = this._popup.querySelector('.popup__pic');
        this._title = title;
        this._link = link;
    }

    open() {
        this._popupText.textContent = this._title;
        this._popupPic.src = this._link;
        this._popupPic.alt = this._title;
        super.open();
    }
}
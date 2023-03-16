export default class Card {
    constructor(title, src, templateSelector, showEnlargePopup) {
        this._title = title;
        this._src = src;
        this._templateSelector = templateSelector;
        this._showEnlargePopup = showEnlargePopup;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => { this._toggleLike() });
        this._cardPic.addEventListener('click', () => { this._showEnlargePopup(this._title, this._src) });
        this._cardTrash.addEventListener('click', () => { this._deleteCard() });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardPic = this._element.querySelector('.element__pic');
        this._cardLike = this._element.querySelector('.element__like-button');
        this._cardTrash = this._element.querySelector('.element__trash-btn');
        this._setEventListeners();
        this._cardPic.alt = this._title;
        this._cardPic.src = this._src;
        this._element.querySelector('.element__name').textContent = this._title;
        return this._element;
    }

    _toggleLike() {
        this._cardLike.classList.toggle('element__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
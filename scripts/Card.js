import {
    popupEnlarge,
    popupEnlargeText,
    popupEnlargePic,
    openPopup
} from './index.js';

//======================================================================

export default class Card {
    constructor(title, src, templateSelector) {
        this._title = title;
        this._src = src;
        this._templateSelector = templateSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners(cardLike, cardPic, cardTrash) {
        cardLike.addEventListener('click', () => { this._toggleLike(cardLike) });
        cardPic.addEventListener('click', () => { this._showEnlargePopup() });
        cardTrash.addEventListener('click', () => { this._deleteCard(this._element) });
    }

    createCard() {
        this._element = this._getTemplate();
        const cardPic = this._element.querySelector('.element__pic');
        const cardLike = this._element.querySelector('.element__like-button');
        const cardTrash = this._element.querySelector('.element__trash-btn');
        this._setEventListeners(cardLike, cardPic, cardTrash);
        cardPic.alt = this._title;
        cardPic.src = this._src;
        this._element.querySelector('.element__name').textContent = this._title;
        return this._element;
    }
    _toggleLike(cardLike) {
        cardLike.classList.toggle('element__like-button_active');
    }
    _showEnlargePopup() {
        popupEnlargeText.textContent = this._title;
        popupEnlargePic.src = this._src;
        popupEnlargePic.alt = this._title;
        openPopup(popupEnlarge);
    }
    _deleteCard(cardElement) {
        cardElement.classList.add('element_disactive');
    }
}
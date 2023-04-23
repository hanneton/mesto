

export default class Card {
    constructor({ name, link, templateSelector, showEnlargePopup, likes, handleConfirmPopup, cardOwnerId, personalId, cardId, api }) {
        this._title = name;
        this._personalId = personalId;
        this._link = link;
        this._numberOfLikes = likes.length;
        this._isLiked = likes.some(el => el['_id'] === this._personalId);
        this._templateSelector = templateSelector;
        this._showEnlargePopup = showEnlargePopup;
        this._handleConfirmPopup = handleConfirmPopup;
        this._cardOwnerId = cardOwnerId;
        this._cardId = cardId;
        this._api = api;
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
        this._cardPic.addEventListener('click', () => { this._showEnlargePopup(this._title, this._link) });
        this._cardTrash.addEventListener('click', () => {
            this._handleConfirmPopup(this._element.id);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardPic = this._element.querySelector('.element__pic');
        this._cardLike = this._element.querySelector('.element__like-button');
        this._cardLikeCounter = this._element.querySelector('.element__like-counter');
        if (this._isLiked) {
            this._addLike();
        }
        this._cardTrash = this._element.querySelector('.element__trash-btn');
        this._unsetTrashBtn();
        this._setEventListeners();
        this._element.id = this._cardId;
        this._cardPic.alt = this._title;
        this._cardPic.src = this._link;
        this._cardLikeCounter.textContent = this._numberOfLikes;
        this._element.querySelector('.element__name').textContent = this._title;
        return this._element;
    }

    _addLike() {
        this._cardLike.classList.add('element__like-button_active');
    }

    _toggleLike() {
        if (this._isLiked) {
            this._api.unlikeCard(this._cardId)
                .then((data) => {
                    this._deleteLike();
                    this._isLiked = !this._isLiked;
                    this._cardLikeCounter.textContent = data.likes.length;
                })
                .catch(err => console.log(err));

        }
        else {
            this._api.likeCard(this._cardId)
                .then((data) => {
                    this._addLike();
                    this._isLiked = !this._isLiked;
                    this._cardLikeCounter.textContent = data.likes.length;
                })
                .catch(err => console.log(err));
        }
    }

    _deleteLike() {
        this._cardLike.classList.remove('element__like-button_active');
    }

    _unsetTrashBtn() {
        if (this._cardOwnerId !== this._personalId) {
            this._cardTrash.classList.add('element__trash-btn_disactive');
        }
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
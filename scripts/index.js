let btnEdit = document.querySelector('.user-profile__edit-button');
let btnClose = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let userName = document.querySelector('.user-profile__name');
let userOccupation = document.querySelector('.user-profile__occupation');
let inputName = popup.querySelector('.form__item_el_name');
let inputOccupation = popup.querySelector('.form__item_el_occupation');

function showPopup() {
    popup.classList.add('popup_opened');
    inputName.value = userName.textContent;
    inputOccupation.value = userOccupation.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveInfo(e) {
    e.preventDefault();
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup();
}

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', saveInfo);

/* 6 cards feature */

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];




function addCard(src, name) {
    let elementsContainer = document.querySelector('.elements');
    let cardTemplate = document.querySelector('#card').content;
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__pic').src = src;
    elementsContainer.append(cardElement);
}

initialCards.forEach(el => {
    addCard(el.link, el.name);
})
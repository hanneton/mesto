let btnEdit = document.querySelector('.user-profile__edit-button');
let btnsClose = document.querySelectorAll('.popup__close-button');
let btnsSave = document.querySelectorAll('.popup__save-button');
let btnAdd = document.querySelector('.user-profile__add-button');
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let formElements = document.querySelectorAll('.form');
let userName = document.querySelector('.user-profile__name');
let userOccupation = document.querySelector('.user-profile__occupation');
let inputName = popupEdit.querySelector('.form__item_el_name');
let inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
let inputTitle = popupAdd.querySelector('.form__item_el_title');
let inputSrc = popupAdd.querySelector('.form__item_el_src');

let elementsContainer = document.querySelector('.elements');


function showPopup(e) {
    e.target === btnEdit ? (
        popupEdit.classList.add('popup_opened'),
        inputName.value = userName.textContent,
        inputOccupation.value = userOccupation.textContent
    ) : (
        popupAdd.classList.add('popup_opened')
    )
}

function closePopup(e) {
    let btnCloseOnEdit = btnsClose[0];
    let btnCloseOnAdd = btnsClose[1];
    let btnSaveOnEdit = btnsSave[0];
    let btnSaveOnAdd = btnsSave[1];
    e.target === btnCloseOnEdit || e.target === btnSaveOnEdit ? popupEdit.classList.remove('popup_opened') : popupAdd.classList.remove('popup_opened');
}

function saveInfo(e) {
    e.preventDefault();
    let formOnEdit = formElements[0];
    let formOnAdd = formElements[1];
    e.target === formOnEdit ? (
        userName.innerText = inputName.value,
        userOccupation.innerText = inputOccupation.value
    ) : (
        console.log(inputSrc.value, inputTitle.value),
        addCard(inputSrc.value, inputTitle.value)
    )
    closePopup();
}

btnEdit.addEventListener('click', showPopup);
btnsClose.forEach(item => {
    item.addEventListener('click', closePopup)
})
btnsSave.forEach(item => {
    item.addEventListener('click', closePopup)
});
btnAdd.addEventListener('click', showPopup);
formElements.forEach(item => {
    item.addEventListener('submit', saveInfo);
})

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
    let cardTemplate = document.querySelector('#card').content;
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__pic').src = src;
    elementsContainer.prepend(cardElement);
}

initialCards.forEach(el => {
    addCard(el.link, el.name);
})
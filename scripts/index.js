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
const btnEdit = document.querySelector('.user-profile__edit-button');
const btnsClose = document.querySelectorAll('.popup__close-button');
const btnsSave = document.querySelectorAll('.popup__save-button');
const btnAdd = document.querySelector('.user-profile__add-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formElements = document.querySelectorAll('.form');
const userName = document.querySelector('.user-profile__name');
const userOccupation = document.querySelector('.user-profile__occupation');
const inputName = popupEdit.querySelector('.form__item_el_name');
const inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
const inputTitle = popupAdd.querySelector('.form__item_el_title');
const inputSrc = popupAdd.querySelector('.form__item_el_src');

const cardTemplate = document.querySelector('#card').content;
const elementsContainer = document.querySelector('.elements');
initialCards.forEach(el => {
    addCard(el.link, el.name);
})





let likeBtns = elementsContainer.querySelectorAll('.element__like-button');

function addCard(src, name) {
    let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__like-button').addEventListener('click', toggleLike);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__pic').src = src;
    elementsContainer.prepend(cardElement);
}



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
likeBtns.forEach(item => {
    item.addEventListener('click', toggleLike);
})


/* 6 cards feature */










function toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
}

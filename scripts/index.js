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
const popupEnlarge = document.querySelector('.popup_type_enlarge');
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

const likeBtns = elementsContainer.querySelectorAll('.element__like-button');
const trashBtns = elementsContainer.querySelectorAll('.element__trash-btn');
const pics = elementsContainer.querySelectorAll('.element__pic');

function addCard(src, name) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__like-button').addEventListener('click', toggleLike);
    cardElement.querySelector('.element__pic').addEventListener('click', showPopup);
    cardElement.querySelector('.element__trash-btn').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__pic').src = src;
    elementsContainer.prepend(cardElement);
}

function showPopup(e) {
    e.target === btnEdit ? (
        popupEdit.classList.add('popup_opened'),
        inputName.value = userName.textContent,
        inputOccupation.value = userOccupation.textContent
    ) : e.target === btnAdd ? (
        popupAdd.classList.add('popup_opened')
    ) : (
        popupEnlarge.querySelector('.popup__text').textContent = e.target.nextElementSibling.firstElementChild.textContent,
        popupEnlarge.querySelector('.popup__pic').src = e.target.src,
        popupEnlarge.classList.add('popup_opened')
    )
}

function closePopup(e) {
    e.target.parentElement.parentElement.classList.remove('popup_opened');
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

function toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
}

function deleteCard(e) {
    e.target.parentElement.classList.add('element_disactive');
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
trashBtns.forEach(item => {
    item.addEventListener('click', deleteCard);
})
pics.forEach(item => {
    item.addEventListener('click', showPopup);
})



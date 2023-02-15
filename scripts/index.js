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
const formEdit = formElements[0];
const formAdd = formElements[1];
const userName = document.querySelector('.user-profile__name');
const userOccupation = document.querySelector('.user-profile__occupation');
const inputName = popupEdit.querySelector('.form__item_el_name');
const inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
const inputTitle = popupAdd.querySelector('.form__item_el_title');
const inputSrc = popupAdd.querySelector('.form__item_el_src');
const cardTemplate = document.querySelector('#card').content;
const elementsContainer = document.querySelector('.elements');

initialCards.forEach(el => {
    addCard(elementsContainer, createCard(el.link, el.name));
})

const likeBtns = elementsContainer.querySelectorAll('.element__like-button');
const trashBtns = elementsContainer.querySelectorAll('.element__trash-btn');
const pics = elementsContainer.querySelectorAll('.element__pic');

function addCard(parent, card) {
    parent.prepend(card);
}

function createCard(src, name) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__like-button').addEventListener('click', toggleLike);
    cardElement.querySelector('.element__pic').addEventListener('click', showEnlargePopup);
    cardElement.querySelector('.element__trash-btn').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__pic').alt = name;
    cardElement.querySelector('.element__pic').src = src;
    return cardElement;
}

function showEditPopup() {
    openPopup(popupEdit);
    inputName.value = userName.textContent;
    inputOccupation.value = userOccupation.textContent;
}

function showAddPopup() {
    openPopup(popupAdd);
}

function showEnlargePopup(e) {
    console.log(e.target, e.currentTarget, e);
    popupEnlarge.querySelector('.popup__text').textContent = e.target.closest('.element').querySelector('.element__name').textContent;
    popupEnlarge.querySelector('.popup__pic').src = e.target.src;
    openPopup(popupEnlarge);
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(e) {
    e.target.closest('.popup').classList.remove('popup_opened');
}

function saveEditInfo(e) {
    e.preventDefault();
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup(e);
}

function saveAddInfo(e) {
    e.preventDefault();
    addCard(elementsContainer, createCard(inputSrc.value, inputTitle.value));
    closePopup(e);
    e.target.reset();
}

function toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
}

function deleteCard(e) {
    e.target.parentElement.classList.add('element_disactive');
}


btnEdit.addEventListener('click', showEditPopup);
formEdit.addEventListener('submit', saveEditInfo);
formAdd.addEventListener('submit', saveAddInfo);
btnsClose.forEach(item => {
    item.addEventListener('click', closePopup)
})
btnAdd.addEventListener('click', showAddPopup);




import Card from './Card.js';
import FormValidator from './FormValidation.js';

//================================================================================

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
const btnAdd = document.querySelector('.user-profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const btnAddSave = popupAdd.querySelector('.popup__save-button');
const popupEnlarge = document.querySelector('.popup_type_enlarge');
const popupEnlargeText = document.querySelector('.popup__text');
const popupEnlargePic = document.querySelector('.popup__pic');
const formList = Array.from(document.forms);
const formEdit = document.forms['form-edit'];
const formAdd = document.forms['form-add'];
const userName = document.querySelector('.user-profile__name');
const userOccupation = document.querySelector('.user-profile__occupation');
const inputName = popupEdit.querySelector('.form__item_el_name');
const inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
const inputTitle = popupAdd.querySelector('.form__item_el_title');
const inputSrc = popupAdd.querySelector('.form__item_el_src');
const elementsContainer = document.querySelector('.elements');
const classesAndSelectors = {
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active',
};

//===============================================================================

const renderCards = () => {
    initialCards.forEach(item => {
        const card = new Card(item.name, item.link, '#card');
        const cardElement = card.createCard();
        addCard(elementsContainer, cardElement);
    })
}

renderCards();

formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    const validationInstance = new FormValidator(formElement, classesAndSelectors);
    validationInstance.enableValidation();
});

//================================================================================

function addCard(parent, card) {
    parent.prepend(card);
}

function showEditPopup() {
    openPopup(popupEdit);
    inputName.value = userName.textContent;
    inputOccupation.value = userOccupation.textContent;
}

function showAddPopup() {
    openPopup(popupAdd);
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(openedPopup) {
    openedPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function saveEditInfo(e) {
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup(e.target.closest('.popup_opened'));
}

function saveAddInfo(e) {
    addCard(elementsContainer, new Card(inputTitle.value, inputSrc.value, '#card').createCard());
    closePopup(e.target.closest('.popup_opened'));
    e.target.reset();
}

//================================================================================

btnEdit.addEventListener('click', showEditPopup);
btnAdd.addEventListener('click', showAddPopup);
formEdit.addEventListener('submit', saveEditInfo);
formAdd.addEventListener('submit', saveAddInfo);
popups.forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
        if ((e.target === e.currentTarget) || (e.target.classList.contains('popup__close-button'))) {
            closePopup(popup);
        }
    })
})

//================================================================================

export {
    btnAddSave,
    popupEnlarge,
    popupEnlargeText,
    popupEnlargePic,
    openPopup
};



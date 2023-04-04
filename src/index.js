import '../pages/index.css'
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidation.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';



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
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formEdit = document.forms['form-edit'];
const formAdd = document.forms['form-add'];
const inputName = popupEdit.querySelector('.form__item_el_name');
const inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
const inputTitle = popupAdd.querySelector('.form__item_el_title');
const inputSrc = popupAdd.querySelector('.form__item_el_src');
const classesAndSelectors = {
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__save-button',
    cardsContainerSelector: '.elements',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active',
    editPopupSelector: '.popup_type_edit',
    addPopupSelector: '.popup_type_add',
    enlargePopupSelector: '.popup_type_enlarge',
    userNameSelector: '.user-profile__name',
    userInfoSelector: '.user-profile__occupation'
};

//================================================================================

const editPopup = new PopupWithForm(classesAndSelectors.editPopupSelector, saveEditInfo);
const addPopup = new PopupWithForm(classesAndSelectors.addPopupSelector, saveAddInfo);
const userInfo = new UserInfo(classesAndSelectors.userNameSelector, classesAndSelectors.userInfoSelector);

function createCard(title, link, templateSelector, showEnlargePopup) {
    const card = new Card({
        title: title, link: link, templateSelector: templateSelector, showEnlargePopup: showEnlargePopup
    });
    return card.generateCard();
}

function showEditPopup() {
    editPopup.open();
    const { userName, userOccupation } = userInfo.getUserInfo();
    inputName.value = userName;
    inputOccupation.value = userOccupation;
    profileValidation.resetValidation();
}

function showAddPopup() {
    newCardValidation.resetValidation();
    addPopup.open();
}

function showEnlargePopup(title, link) {
    const newEnlargePopup = new PopupWithImage(classesAndSelectors.enlargePopupSelector, title, link);
    newEnlargePopup.setEventListeners();
    newEnlargePopup.open();
}

function saveEditInfo({ firstInputValue, secondInputValue }) {
    userInfo.setUserInfo(firstInputValue, secondInputValue);
    editPopup.close();
}

function saveAddInfo() {
    const newCard = new Section({
        items: [{
            name: inputTitle.value,
            link: inputSrc.value
        }], renderer: (item) => {
            const cardElement = createCard(item.name, item.link, '#card', showEnlargePopup);
            newCard.addItem(cardElement);
        }
    }, classesAndSelectors.cardsContainerSelector);
    newCard.renderItems();
    addPopup.close();
}

//================================================================================

btnEdit.addEventListener('click', showEditPopup);
btnAdd.addEventListener('click', showAddPopup);

editPopup.setEventListeners();
addPopup.setEventListeners();

//================================================================================

const defaultCardList = new Section({
    items: initialCards, renderer: (item) => {
        const cardElement = createCard(item.name, item.link, '#card', showEnlargePopup);
        defaultCardList.addItem(cardElement);
    }
}, classesAndSelectors.cardsContainerSelector);

defaultCardList.renderItems();


const profileValidation = new FormValidator(formEdit, classesAndSelectors);
const newCardValidation = new FormValidator(formAdd, classesAndSelectors);

profileValidation.enableValidation();
newCardValidation.enableValidation();

//====================================================================================================================



import '../pages/index.css';
import {
    initialCards,
    btnEdit,
    btnAdd,
    formEdit,
    formAdd,
    classesAndSelectors
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidation.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

//================================================================================

const defaultCardList = new Section({
    items: initialCards, renderer: (item) => {
        const cardElement = createCard(item.title, item.src, '#card', showEnlargePopup);
        defaultCardList.addItem(cardElement);
    }
}, classesAndSelectors.cardsContainerSelector);
defaultCardList.renderItems();

const profileValidation = new FormValidator(formEdit, classesAndSelectors);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(formAdd, classesAndSelectors);
newCardValidation.enableValidation();

const editPopup = new PopupWithForm(classesAndSelectors.editPopupSelector, saveEditInfo);
editPopup.setEventListeners();

const addPopup = new PopupWithForm(classesAndSelectors.addPopupSelector, saveAddInfo);
addPopup.setEventListeners();

const enlargePopup = new PopupWithImage(classesAndSelectors.enlargePopupSelector);
enlargePopup.setEventListeners();

const userInfo = new UserInfo(classesAndSelectors.userNameSelector, classesAndSelectors.userOccupationSelector);

//================================================================================

function createCard(title, link, templateSelector, showEnlargePopup) {
    const card = new Card({
        title: title, link: link, templateSelector: templateSelector, showEnlargePopup: showEnlargePopup
    });
    return card.generateCard();
}

function showEditPopup() {
    editPopup.open();
    const { name, occupation } = userInfo.getUserInfo();
    editPopup.setInputValues({ name, occupation })
    profileValidation.resetValidation();
}

function showAddPopup() {
    newCardValidation.resetValidation();
    addPopup.open();
}

function showEnlargePopup(title, link) {
    enlargePopup.open(title, link);
}

function saveEditInfo({ name, occupation }) {
    userInfo.setUserInfo(name, occupation);
    editPopup.close();
}

function saveAddInfo({ title, src }) {
    defaultCardList.renderer({ title, src });
    addPopup.close();
}

//================================================================================

btnEdit.addEventListener('click', showEditPopup);
btnAdd.addEventListener('click', showAddPopup);

//================================================================================


import './index.css';
import {
    btnEdit,
    btnAdd,
    btnUpdateAvatar,
    formEdit,
    formAdd,
    formUpdateAvatar,
    classesAndSelectors,
    cohort,
    token,
    personalId,
    userPic
} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidation.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js'


//================================================================================

const defaultCardList = new Section({
    items: [], renderer
}, classesAndSelectors.cardsContainerSelector);

const profileValidation = new FormValidator(formEdit, classesAndSelectors);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(formAdd, classesAndSelectors);
newCardValidation.enableValidation();

const updateAvatarValidation = new FormValidator(formUpdateAvatar, classesAndSelectors);
updateAvatarValidation.enableValidation();

const editPopup = new PopupWithForm(classesAndSelectors.editPopupSelector, saveEditInfo);
editPopup.setEventListeners();

const addPopup = new PopupWithForm(classesAndSelectors.addPopupSelector, saveAddInfo);
addPopup.setEventListeners();

const updateAvatarPopup = new PopupWithForm(classesAndSelectors.updateAvatarSelector, saveUpdateAvatar);
updateAvatarPopup.setEventListeners();

const enlargePopup = new PopupWithImage(classesAndSelectors.enlargePopupSelector);
enlargePopup.setEventListeners();

const confirmPopup = new PopupWithConfirm(classesAndSelectors.confirmPopupSelector, confirmDeletion);
confirmPopup.setEventListeners();

const userInfo = new UserInfo({
    userNameSelector: classesAndSelectors.userNameSelector,
    userOccupationSelector: classesAndSelectors.userOccupationSelector,
    userPicSelector: classesAndSelectors.userPicSelector
});

//==============================================================================================================

const api = new Api(`https://nomoreparties.co/v1/${cohort}`, {
    authorization: token,
    "Content-type": "application/json"
});

Promise.all([api.getInitialInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
        userInfo.setUserInfo(info);
        userInfo.setUserPic(info);
        defaultCardList.items = cards;
        defaultCardList.renderItems();
    })
    .catch(err => console.log(err));

//================================================================================

function renderer(item) {
    const cardElement = createCard({
        api,
        name: item.name,
        link: item.link,
        cardOwnerId: item.owner._id,
        templateSelector: '#card',
        showEnlargePopup,
        likes: item.likes,
        handleConfirmPopup,
        personalId, cardId: item._id
    });
    defaultCardList.addItem(cardElement);
}

function createCard(params) {
    const card = new Card(params);
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

function showUpdateAvatarPopup() {
    updateAvatarValidation.resetValidation();
    updateAvatarPopup.open()
}

function showEnlargePopup(title, link) {
    enlargePopup.open(title, link);
}

function handleConfirmPopup(cardId) {
    confirmPopup.open(cardId);
}

function saveEditInfo({ name, occupation }) {
    api.editProfileInfo(name, occupation)
        .then(data => {
            userInfo.setUserInfo(data);
            editPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            editPopup.renderLoading(false);
        })
}

function saveAddInfo({ name, link }) {
    api.addCard(name, link)
        .then(data => {
            defaultCardList.renderer(data);
            addPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            addPopup.renderLoading(false);
        })
}

function saveUpdateAvatar({ link }) {
    api.updateUserPic(link)
        .then(data => {
            userInfo.setUserPic(data);
            updateAvatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            updateAvatarPopup.renderLoading(false);
        })
}

function confirmDeletion(cardId) {
    api.deleteCard(cardId)
        .then(() => {
            document.getElementById(cardId).remove();
            confirmPopup.close();
        })
        .catch(err => console.log(err));
}
//================================================================================

btnEdit.addEventListener('click', showEditPopup);
btnAdd.addEventListener('click', showAddPopup);
btnUpdateAvatar.addEventListener('click', showUpdateAvatarPopup);


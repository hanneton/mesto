export const initialCards = [
    {
        title: 'Архыз',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
export const userPic = document.querySelector('.user-profile__avatar');
export const btnEdit = document.querySelector('.user-profile__edit-button');
export const btnAdd = document.querySelector('.user-profile__add-button');
export const btnUpdateAvatar = document.querySelector('.user-profile__link');
export const formEdit = document.forms['form-edit'];
export const formAdd = document.forms['form-add'];
export const formUpdateAvatar = document.forms['form-update-avatar'];
export const token = "82ccf489-73be-49e6-aa2f-f3838da9c83f";
export const personalId = "4cdb4ded8b52d1c3bd6243c8";
export const cohort = "cohort-64";
export const classesAndSelectors = {
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__save-button',
    cardsContainerSelector: '.elements',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active',
    editPopupSelector: '.popup_type_edit',
    addPopupSelector: '.popup_type_add',
    updateAvatarSelector: '.popup_type_update-avatar',
    confirmPopupSelector: '.popup_type_confirm',
    enlargePopupSelector: '.popup_type_enlarge',
    userNameSelector: '.user-profile__name',
    userOccupationSelector: '.user-profile__occupation',
    userPicSelector: '.user-profile__avatar'
};
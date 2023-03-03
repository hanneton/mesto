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
const btnAdd = document.querySelector('.user-profile__add-button');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupEnlarge = document.querySelector('.popup_type_enlarge');
const popupEnlargeText = document.querySelector('.popup__text');
const popupEnlargePic = document.querySelector('.popup__pic');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const userName = document.querySelector('.user-profile__name');
const userOccupation = document.querySelector('.user-profile__occupation');
const inputName = popupEdit.querySelector('.form__item_el_name');
const inputOccupation = popupEdit.querySelector('.form__item_el_occupation');
const inputTitle = popupAdd.querySelector('.form__item_el_title');
const inputSrc = popupAdd.querySelector('.form__item_el_src');
const cardTemplate = document.querySelector('#card').content;
const elementsContainer = document.querySelector('.elements');
const inputs = document.querySelectorAll('.form__item');

initialCards.forEach(el => {
    addCard(elementsContainer, createCard(el.link, el.name));
})


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
    const btnEditSave = popupEdit.querySelector('.popup__save-button');
    toggleButtonState([inputName, inputOccupation], btnEditSave);
}

function showAddPopup() {
    openPopup(popupAdd);
}

function showEnlargePopup(e) {
    popupEnlargeText.textContent = e.target.closest('.element').querySelector('.element__name').textContent;
    popupEnlargePic.src = e.target.src;
    popupEnlargePic.alt = e.target.alt;
    openPopup(popupEnlarge);
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(openedPopup) {
    openedPopup.classList.remove('popup_opened');
    openedPopup.querySelectorAll('.form__item').forEach(input => {
        hideInputError(input);
    })
}

function saveEditInfo(e) {
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup(e.target.closest('.popup_opened'));
}

function saveAddInfo(e) {
    addCard(elementsContainer, createCard(inputSrc.value, inputTitle.value));
    closePopup(e.target.closest('.popup_opened'));
    e.target.reset();
}

function toggleLike(e) {
    e.target.classList.toggle('element__like-button_active');
}

function deleteCard(e) {
    e.target.parentElement.classList.add('element_disactive');
}

document.addEventListener('keydown', (e) => {
    const openedPopup = document.querySelector('.popup_opened');
    if ((e.key === 'Escape') && (openedPopup !== null)) {
        closePopup(openedPopup);
    }
})
btnEdit.addEventListener('click', showEditPopup);
formEdit.addEventListener('submit', saveEditInfo);
formAdd.addEventListener('submit', saveAddInfo);
btnsClose.forEach(item => {
    item.addEventListener('click', (e) => closePopup(e.target.closest('.popup_opened')));
});
popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closePopup(popup);
        }
    })
})
btnAdd.addEventListener('click', showAddPopup);

function showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__item_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__item_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, btnElement) {
    if (hasInvalidInput(inputList)) {
        btnElement.setAttribute('disabled', true);
        btnElement.classList.add('popup__save-button_inactive');
    }
    else {
        btnElement.removeAttribute('disabled');
        btnElement.classList.remove('popup__save-button_inactive');
    }
}

function checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(inputElement);
    }
}

function setInputEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__item'));
    const btnElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, btnElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, btnElement);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.forms);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setInputEventListeners(formElement);
    });
}

enableValidation();


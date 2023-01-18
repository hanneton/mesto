let btnEdit = document.querySelector('.user-profile__edit-button');
let btnClose = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let userName = document.querySelector('.user-profile__name');
let userOccupation = document.querySelector('.user-profile__occupation');
let inputName = popup.querySelector('.form__item_el_name');
let inputOccupation = popup.querySelector('.form__item_el_occupation');

function showPopup() {
    popup.classList.add('popup_opened');
    inputName.value = userName.textContent;
    inputOccupation.value = userOccupation.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveInfo(e) {
    e.preventDefault();
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup();
}

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', saveInfo);
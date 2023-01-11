let editBtn = document.querySelector('.edit-button');
let saveBtn = document.querySelector('.save-button');
let closeBtn = document.querySelector('.close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let userName = document.querySelector('.user-profile__name');
let userOccupation = document.querySelector('.user-profile__occupation');
let inputName = popup.querySelector('.form__item_el_name');
let inputOccupation = popup.querySelector('.form__item_el_occupation');

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', closePopup);
saveBtn.addEventListener('click', saveInfo);

function showPopup() {
    popup.classList.add('popup_opened');
    inputName.value = userName.textContent;
    inputOccupation.value = userOccupation.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveInfo(evt) {
    evt.preventDefault();
    userName.innerText = inputName.value;
    userOccupation.innerText = inputOccupation.value;
    closePopup();
}



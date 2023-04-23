export default class UserInfo {
    constructor({
        userNameSelector,
        userOccupationSelector,
        userPicSelector
    }) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
        this._userPic = document.querySelector(userPicSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            occupation: this._userOccupation.textContent
        }
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userOccupation.textContent = about;
    }

    setUserPic({ avatar }) {
        this._userPic.src = avatar;
    }
}
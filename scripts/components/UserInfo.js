export default class UserInfo {
    constructor(userNameSelector, userOccupationSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            occupation: this._userOccupation.textContent
        }
    }

    setUserInfo(inputNameValue, inputInfoValue) {
        this._userName.textContent = inputNameValue;
        this._userOccupation.textContent = inputInfoValue;
    }
}
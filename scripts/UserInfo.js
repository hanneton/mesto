export default class UserInfo {
    constructor(userNameSelector, userOccupationSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userOccupation: this._userOccupation.textContent
        }
    }

    setUserInfo(inputNameValue, inputInfoValue) {
        this._userName.textContent = inputNameValue;
        this._userOccupation.textContent = inputInfoValue;
    }
}
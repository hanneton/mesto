export default class UserInfo {
    constructor({
        userNameSelector,
        userOccupationSelector,
        userpicSelector
    }, api) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
        this._userpic = document.querySelector(userpicSelector);
        this._api = api;
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

    setInitialUserpic(src) {
        this._userpic.src = src;
    }

    setUserpic(src) {
        this._api.updateUserpic(src)
            .then((data) => {
                this._userpic.src = data.avatar;
            })
    }
}
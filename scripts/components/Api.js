export default class Api {
    constructor(urlBase, headers) {
        this._urlBase = urlBase;
        this._headers = headers;
    }

    getInitialInfo() {
        return fetch(`${this._urlBase}/users/me`, {
            headers: this._headers,
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    getInitialCards() {
        return fetch(`${this._urlBase}/cards`, {
            headers: this._headers,
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    editProfileInfo(name, about) {
        return fetch(`${this._urlBase}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    addCard(name, link) {
        return fetch(`${this._urlBase}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }
    deleteCard(id) {
        return fetch(`${this._urlBase}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    getCardLikeState(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    likeCard(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    unlikeCard(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    updateUserpic(avatarSrc) {
        return fetch(`${this._urlBase}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                {
                    avatar: avatarSrc
                }
            )
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }
}

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  addCard(data) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  putLike(cardId) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.putLike(cardId);
    }
    return this.deleteLike(cardId);
  }

  setAvatar(data) {
    const token = localStorage.getItem('jwt');
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
}

const api = new Api(
  "http://localhost:3000",
);

export default api;

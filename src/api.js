class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  } 

  getGamesList() {
    return fetch(`${this._url}/games`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  _createRequestUrl(formValue) {
    let url = `${this._url}/games?`;
    if(formValue.platform) {
      url += `platform=${formValue.platform}&`
    }
    if(formValue.category) {
      url += `category=${formValue.category}&`
    }
    if(formValue.sorting) {
      url += `sort-by=${formValue.sorting}`
    }
    return url;
  }

  getSelectedCards(formValue) {
    const url = this._createRequestUrl(formValue)
    return fetch(`${url}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

  getSpecificGame(gameId) {
    return fetch(`${this._url}/game?id=${gameId}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export default new Api({
  url: "https://free-to-play-games-database.p.rapidapi.com/api",
  headers: {
    'X-RapidAPI-Key': 'c407b693dfmsh00aa9a20afe2075p19035ajsn790d880a65ae',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
});

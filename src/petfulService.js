import config from './config'

const petfulService={



  getPeople() {
    return fetch(`${config.API_ENDPOINT}`)///people
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },

  getDogs() {
    return fetch(`${config.API_ENDPOINT}/dog`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  getCats() {
    return fetch(`${config.API_ENDPOINT}/cat`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  functi() {
    return fetch(`${config.API_ENDPOINT}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },




};

export default petfulService;

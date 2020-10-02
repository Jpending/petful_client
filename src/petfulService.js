import config from './config'

const petfulService={

  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  postPerson(person) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(person),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  deletePerson() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },

  getDogs() {
    return fetch(`${config.PET_ENDPOINT}/dogs`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  getCats() {
    return fetch(`${config.PET_ENDPOINT}/cats`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  adoptCat() {
    return fetch(`${config.API_ENDPOINT}/cats`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  adoptDog() {
    return fetch(`${config.API_ENDPOINT}/dogs`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },

};

export default petfulService;

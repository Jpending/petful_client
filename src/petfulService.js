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
  postPerson(name) {
    const newPerson={'person': name}
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newPerson),
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

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json
      )
  },

  getDogs() {
    return fetch(`${config.API_ENDPOINT}/pets/dogs`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  getCats() {
    return fetch(`${config.API_ENDPOINT}/pets/cats`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  adoptCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cats`, {
      method: 'DELETE',

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json
      )
  },
  adoptDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dogs`, {
      method: 'DELETE',

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json
      )
  },

};

export default petfulService;

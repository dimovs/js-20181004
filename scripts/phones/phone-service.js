// const API_URL = `http://localhost:3000/api`;
const API_URL = `https://dimovs.github.io/js-20181004/api`;

const PhoneService = {

	getAll({query, orderBy} = {}) {
    return this.fetchData('/phones')
      .then((phones) => {
        const filteredPhones = this._filter(phones, query);
        const sortedPhones = this._sort(filteredPhones, orderBy);
        return sortedPhones;
      })
	},

	getOneById(phoneId) {
    return this.fetchData(`/phones/${phoneId}`);
	},

  fetchData(url, params = {}) {
    return fetch(`${API_URL}${url}.json`, params)
      .then((response) => response.json())
  },

  _filter(phones, query) {
    if (!query) {
      return phones;
    }
    const normalizedQuery = query.toLowerCase();
    return phones.filter(phone => phone.name.toLowerCase().includes(normalizedQuery));
  },

  _sort(phones, orderBy) {
    if (!orderBy) {
      return phones;
    }
    return phones.slice().sort((phone1, phone2) => {
      return (phone1[orderBy] > phone2[orderBy]) ? 1 : -1;
    })
  }
}

export default PhoneService;
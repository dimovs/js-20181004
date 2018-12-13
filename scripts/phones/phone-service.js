const PhoneService = {

	getAll({query, orderBy} = {}) {
    return fetch('api/phones.json')
      .then((response) => response.json())
      .then((phones) => {
        const filteredPhones = this._filter(phones, query);
        const sortedPhones = this._sort(filteredPhones, orderBy);
        return sortedPhones;
      })
	},

	getOneById(phoneId) {
    return fetch(`api/phones/${phoneId}.json`)
      .then((response) => response.json());
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
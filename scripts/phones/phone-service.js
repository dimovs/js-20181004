const PhoneService = {

	getAll({query, orderBy} = {}) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'api/phones.json', true);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status != 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          const phones = JSON.parse(xhr.responseText);
          const filteredPhones = this._filter(phones, query);
          const sortedPhones = this._sort(filteredPhones, orderBy);
          resolve(sortedPhones);
        }
      }
    });
	},

	getOneById(phoneId) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `api/phones/${phoneId}.json`, true);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status != 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(JSON.parse(xhr.responseText));
        }
      }
    })
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
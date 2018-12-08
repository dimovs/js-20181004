export default class PhoneCatalog {
	constructor({element, phones}) {
		this._element = element;
		this._phones = phones;
		this._render();
		this._element.addEventListener('click', (event) => {
			let phoneElement = event.target.closest('[data-element="phone-item"]');
			if (!phoneElement) {
				return;
			}
			console.log(phoneElement.dataset.phoneId);
		})
	}

	_render() {
		this._element.innerHTML = `
      <ul class="phones">
	      ${this._phones.map(phone => `
	      	<li class="thumbnail" data-element="phone-item" data-phone-id=${phone.id}>
	          <a href="#${phone.id}" class="thumb">
	            <img alt="${phone.name}">
	          </a>

	          <div class="phones__btn-buy-wrapper">
	            <a class="btn btn-success">
	              Add
	            </a>
	          </div>

	          <a href="#${phone.id}">${phone.name}</a>
	          <p>${phone.snippet}</p>
	        </li>
	      `).join('')}
      </ul>
		`;
	}
}
import Component from '../../component.js';

export default class PhoneViewer extends Component {
	constructor({element, onAdd, onBack}) {
		super({element});
		this._onAdd = onAdd;
		this._onBack = onBack;

		this._element.addEventListener('click', (event) => {
			const smallImage = event.target.closest('[data-element="small-image"]');
			if (!smallImage) {
				return;
			}
			this._currentImage = smallImage.src;
			this._render();
		});

		this._element.addEventListener('click', (event) => {
			const button = event.target.closest('[data-element="back-button"]');
			if (!button) {
				return;
			}
			this._onBack();
		});

		this._element.addEventListener('click', (event) => {
			const button = event.target.closest('[data-element="add-button"]');
			if (!button) {
				return;
			}
			this._onAdd(this._phone.id);
		});
	}

	show(phone) {
		this._phone = phone;
		this._currentImage = phone.images[0];
		this._render();
		super.show();
	}

	_render() {
		const {name, description, images} = this._phone;
		this._element.innerHTML = `
	    <img class="phone" src="${this._currentImage}">

	    <button data-element="back-button">Back</button>
	    <button data-element="add-button">Add to basket</button>

	    <h1>${name}</h1>

	    <p>${description}</p>

	    <ul class="phone-thumbs">
	    	${images.map(image => `
		      <li>
		        <img src="${image}" data-element="small-image">
		      </li>
	    	`).join('')}
	    </ul>
		`;
	}
}
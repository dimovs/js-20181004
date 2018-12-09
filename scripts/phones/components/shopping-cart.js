import Component from '../../component.js';

export default class ShoppingCart extends Component {
	constructor({element}) {
		super({element});
		this._items = {};
		this._render();

		this.on('click', 'remove-button', (event) => {
			const item = event.target.closest('[data-element="item"]');
			this.remove(item.dataset.itemId);
		});
	}

	add(itemId) {
		if (!this._items[itemId]) {
			this._items[itemId] = 0;
		}
		this._items[itemId] += 1;
		this._render();
	}

	remove(itemId) {
		this._items[itemId] -= 1;
		if (this._items[itemId] === 0) {
			delete this._items[itemId];
		}
		this._render();
	}

	_render() {
		this._element.innerHTML = `
      <section>
        <p>Shopping Cart</p>
        <ul>
        	${Object.entries(this._items).map(([id, quantity]) => `
						<li data-element="item" data-item-id="${id}">${id} (${quantity})
							<button type="button" data-element="remove-button">X</button>
						</li>
        	`).join('')}
        </ul>
      </section>
		`
	}
}
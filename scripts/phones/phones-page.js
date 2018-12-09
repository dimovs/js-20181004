import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './phone-service.js';

export default class PhonesPage {
	constructor({element}) {
		this._element = element;
		this._render();

		this._initCatalog();
		this._initViewer();
		this._initShoppingCart();
	}

	_initCatalog() {
		this._catalog = new PhoneCatalog({
			element: this._element.querySelector('[data-component="phone-catalog"]'),
			phones: PhoneService.getAll(),
		});

		this._catalog.subscribe('add', (event) => {
			const phoneId = event.detail;
			this._cart.add(phoneId);
		},)

		this._catalog.subscribe('phone-selected', (event) => {
			const phoneId = event.detail;
			const phoneDetails = PhoneService.getOneById(phoneId);
			this._catalog.hide();
			this._viewer.show(phoneDetails);
		});
	}

	_initViewer() {
		this._viewer = new PhoneViewer({
			element: this._element.querySelector('[data-component="phone-viewer"]'),
			onBack: () => {
				this._catalog.show();
				this._viewer.hide();
			},
			onAdd: (phoneId) => {
				this._cart.add(phoneId);
			},
		});		
	}

	_initShoppingCart() {
		this._cart = new ShoppingCart({
			element: this._element.querySelector('[data-component="shopping-cart"]'),
		});
	}

	_render() {
		this._element.innerHTML = `
	    <div class="row">

	      <!--Sidebar-->
	      <div class="col-md-2">
	        <section>
	          <p>
	            Search:
	            <input>
	          </p>

	          <p>
	            Sort by:
	            <select>
	              <option value="name">Alphabetical</option>
	              <option value="age">Newest</option>
	            </select>
	          </p>
	        </section>

					<div data-component="shopping-cart"></div>
	      </div>

	      <!--Main content-->
	      <div class="col-md-10">
	      	<div data-component="phone-catalog"></div>
	      	<div data-component="phone-viewer"></div>
	      </div>

	    </div>
		`;
	}
}
 
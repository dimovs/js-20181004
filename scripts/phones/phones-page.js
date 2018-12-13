import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage {
	constructor({element}) {
		this._element = element;
		this._render();

		this._initCatalog();
		this._initViewer();
		this._initShoppingCart();
		this._initFilter();
	}

	_initCatalog() {
		this._catalog = new PhoneCatalog({
			element: this._element.querySelector('[data-component="phone-catalog"]'),
		});

		this._showFilteredPhones();

		this._catalog.subscribe('add', (phoneId) => {
			this._cart.add(phoneId);
		});

		this._catalog.subscribe('phone-selected', (phoneId) => {
			PhoneService.getOneById(phoneId)
				.then(
					(phoneDetails) => {
						this._catalog.hide();
						this._viewer.show(phoneDetails);
					},
					(error) => {
						console.log(error)
					}
				);
		});
	}

	_initViewer() {
		this._viewer = new PhoneViewer({
			element: this._element.querySelector('[data-component="phone-viewer"]'),
		});

		this._viewer.subscribe('back', () => {
			this._showFilteredPhones();
			this._viewer.hide();
		});

		this._viewer.subscribe('add', (phoneId) => {
			this._cart.add(phoneId);
		});
	}

	_initShoppingCart() {
		this._cart = new ShoppingCart({
			element: this._element.querySelector('[data-component="shopping-cart"]'),
		});
	}

	_initFilter() {
		this._filter = new Filter({
			element: document.querySelector('[data-component="filter"]'),
		});

		this._filter.subscribe('filter', (query) => {
			this._currentQuery = query;
			this._showFilteredPhones();
		});

		this._filter.subscribe('change-order', (orderBy) => {
			this._currentOrderBy = orderBy;
			this._showFilteredPhones();
		});
	}

	_showFilteredPhones() {
		PhoneService.getAll({
			query: this._currentQuery,
			orderBy: this._currentOrderBy
		})
			.then((phones) => {
				this._catalog.show(phones);
			})
	}

	_render() {
		this._element.innerHTML = `
	    <div class="row">

	      <!--Sidebar-->
	      <div class="col-md-2">
					<div data-component="filter"></div>
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
 
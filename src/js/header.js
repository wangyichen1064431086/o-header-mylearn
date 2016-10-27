const DomDelegate = require('dom-delegate');

function Header(rootEl, config = {headerClassName: 'o-header'}) {
	const oHeader = this;

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		const rootDelegate = new DomDelegate(rootEl);

		oHeader.delegate = rootDelegate;
		oHeader.rootEl = rootEl;

		preventScroll();
		toggle();
		selected();
	}

	function selected() {
		const selectAttribute = '[data-o-header-selectable]';
		const selectableEls = oHeader.rootEl.querySelectorAll(selectAttribute);

		oHeader.delegate.on('click', selectAttribute, (e, selectable) => {
			for (let i = 0; i < selectableEls.length; i++) {
				selectableEls[i].setAttribute('aria-selected', 'false');
			}
			selectable.setAttribute('aria-selected', 'true');
		});
	}

	function preventScroll() {
		const navToggle = oHeader.rootEl.querySelector('[data-o-header-togglable-nav]');
// add class name on body when pressed.
		const navOpenClass = config.headerClassName + '--nav-open';

		if (navToggle) {
			navToggle.addEventListener('click', function(e) {
				document.documentElement.classList.toggle(navOpenClass);
				document.body.classList.toggle(navOpenClass);
			});
		}
	}

	function toggle() {
		const toggleAttribute = '[data-o-header-togglable]';

		oHeader.delegate.on('click', toggleAttribute, (e, togglerEl) => {
			const togglerElState = togglerEl.getAttribute('aria-pressed');
			if (togglerElState === 'true') {
				togglerEl.setAttribute('aria-pressed', 'false');
			} else if (togglerElState === 'false' || !togglerElState) {
				togglerEl.setAttribute('aria-pressed', 'true');
			}
		});
	}
	
	init();
}

Header.init = function (el) {
	const headerInstances = [];
	if (!el) {
		el =document.body;
	} else if (!el instanceof HTMLElement) {
		el = document.querySelector(el);
	}

	const headerElements = el.querySelectorAll('[data-o-component=o-header]');

	for (let i = 0; i < headerElements.length; i++) {
		if (!headerElements[i].hasAttribute('data-o-header--js')) {
			headerInstances.push(new Header(headerElements[i]));
		}
	}

	return headerInstances;
}

module.exports = Header;
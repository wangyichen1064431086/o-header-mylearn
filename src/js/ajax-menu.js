const ajax = require('./ajax');

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/*
navItems = {
	home: {
		'selected': true,
		items: <ol class="nav-items">
	},
	global: {
		'selected': false,
		items: <ol class="nav-items">
	}
}

navItemsFrags = {
  "home": <li class="nav-item mobile"><a class="nav-link" href="">FT中文网首页</a></li>...,

   "global": <li class="nav-item mobile"><a class="nav-link" href="">频道首页</a></li>...,
}
append contents[k] to navItems[k].items for every selected:false.
*/
function AjaxMenu(rootEl, url, config={sectionAttribute: '[data-section]', navItemsClassName: '.nav-items'}) {
	const oMenu = this;

	function init() {
		oMenu.rootEl = rootEl;
		oMenu.navItems = getNavItemsEls(rootEl);
		oMenu.generatedEls = {};

		ajax.getData(url, function(contents) {
			//contents = JSON.parse(contents);
			console.log('Received contents is of type: ' + typeof contents);
			if (typeof contents === 'string') {
				try {
					contents = JSON.parse(contents);
				} catch(e) {
					console.log(e.message);
				}
			}

// Get the object, turn the value of each contents[k] into a collection of elements in a fragment.
// Then append the fragment to corresponding `li.nav-items`
			for (let k in contents) {

				oMenu.generatedEls[k] = transformJsonToEl(contents[k]);

				if (!oMenu.generatedEls[k]) {
					return;
				}
			}

			zip(oMenu.navItems, oMenu.generatedEls);
		});

	}

	function getNavItemsEls(rootEl) {
		const navSectionEls = rootEl.querySelectorAll(config.sectionAttribute);

		const navItems = {};
		for (let i = 0, len = navSectionEls.length; i < len; i++) {
			const navSectionEl = navSectionEls[i];

			const section = navSectionEl.getAttribute('data-section');
			const isSelected = navSectionEl.getAttribute('aria-selected');

			const navItemsEl = navSectionEl.querySelector(config.navItemsClassName);
			

			navItems[section] = {'selected': isSelected, 'items': navItemsEl};
		}

		return navItems;
	}

	function transformJsonToEl(arr) {
		const frag = document.createDocumentFragment();
		if (arr && Array.isArray(arr)) {
			for (let i = 0, len = arr.length; i < len; i++) {
				const navItemEl = createNavItemEl(arr[i].url, arr[i].name, arr[i].mobile);
				frag.appendChild(navItemEl);
			}
			return frag;
		}
		return null;
	}

	function createNavItemEl(url, name, mobile) {
		const liEl = document.createElement('li');
		liEl.className = 'nav-item';
		if (mobile) {
			liEl.className = 'nav-item mobile';
		}

		const aEl = document.createElement('a');
		aEl.className = 'nav-link';
		aEl.href = url;
		aEl.innerHTML = name;

		liEl.appendChild(aEl);

		return liEl;
	}

	// objA and objB should have same keys.
	// only append to objA whose selected == false.
	// If selected == true, items already exist.
	function zip(objA, objB) {

		for (let k in objA) {

			if (!objA[k].selected && (objB[k] instanceof Node)) {

				try {
					objA[k].items.appendChild(objB[k]);
				} catch(e) {
					console.log(e.message);
				}
			}
		}
	}

	init();
}


module.exports = AjaxMenu;







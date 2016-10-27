import oGrid from 'o-grid';

const Header = require('../main');
const oHeader = Header.header;
const oSwitcher = Header.switcher
const oSticky = Header.sticky;
const oMenu = Header.menu;

oHeader.init();
oSwitcher.init();

function getElementOffset(e) {

	function getPageOffset(w) {
		w = w || window;
		var x = (w.pageXOffset !== undefined) ? w.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
		var y = (w.pageYOffset !== undefined) ? w.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		return {x: x, y: y};
	}

	if (!(e instanceof HTMLElement)) {
		e = document.querySelector(e);
	}
	var box = e.getBoundingClientRect();
	var offset = getPageOffset();
	var x1 = box.left + offset.x;
	var x2 = box.right + offset.x;
	var y1 = box.top + offset.y;
	var y2 = box.bottom + offset.y;

	return {xLeft: x1,  xRight: x2, yTop: y1,yBottom: y2};
}

const headerEl = document.querySelector('.o-header');
const navEl = headerEl.querySelector('.o-header__secondary');
const navElOffset = getElementOffset(navEl);
console.log(navElOffset);

new oSticky(navEl, navElOffset.yTop);

const headerNavEl = headerEl.querySelector('.o-header__nav');
const menu = new oMenu(headerNavEl, 'data/nav-section.json');

/******** demo1 */
const containerOneOffset = getElementOffset('.container-1');
const fixedOne = document.querySelector('.fixed-1')
new oSticky(fixedOne, containerOneOffset.yTop-45, containerOneOffset.yBottom-45-fixedOne.offsetHeight);

/*  demo2 */
const containerTwoOffset = getElementOffset('.container-2');
const fixedTwo = document.querySelector('.fixed-2')
new oSticky(fixedTwo, containerTwoOffset.yTop-45, containerTwoOffset.yBottom-45-fixedTwo.offsetHeight);

/*  demo3 */
const containerThreeOffset = getElementOffset('.container-3');
const fixedThree = document.querySelector('.fixed-3')
new oSticky(fixedThree, containerThreeOffset.yTop-45, containerThreeOffset.yBottom-45-fixedThree.offsetHeight);

/*  demo4 */
const containerFourOffset = getElementOffset('.container-4');
const fixedFour = document.querySelector('.fixed-4')
new oSticky(fixedFour, containerFourOffset.yTop-45, containerFourOffset.yBottom-45-fixedFour.offsetHeight);
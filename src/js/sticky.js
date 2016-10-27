function Sticky(fixedEl, startDistance, endDistance) {
	const oSticky = this;
	const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) }


	function init() {	
		oSticky.lastPosition = -1;
		if (!startDistance) {
			startDistance = 0;
		}
		oSticky.start = startDistance;
		oSticky.end = endDistance;
		if (!(fixedEl instanceof HTMLElement)) {
			fixedEl = document.querySelector(fixedEl);
		}
		oSticky.fixedEl = fixedEl;
	}

	function loop(){
	    // Avoid calculations if not needed
	    var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

	    if (oSticky.lastPosition == scrollY) {
	        rAF(loop);
	        return false;
	    } else {
	    	oSticky.lastPosition = scrollY;
	    }

	    var abovePeak = oSticky.lastPosition < oSticky.start;

	    var underTrough = oSticky.lastPosition > oSticky.end;

	    var between = !abovePeak && !underTrough;

	    console.log('abovePeak: ' + abovePeak + ', between: ' + between + ', underTrough: ' + underTrough);

	    //var withinRange = oSticky.end ? ((oSticky.lastPosition > oSticky.start) && (oSticky.lastPosition < oSticky.end)) : (oSticky.lastPosition > oSticky.start);

	    var sticked = oSticky.fixedEl.getAttribute('aria-sticky');
	    var troughed = oSticky.fixedEl.getAttribute('aria-troughed');

	    if (between && !sticked) {
	    	oSticky.fixedEl.setAttribute('aria-sticky', 'true');
	    } else if (!between && sticked) {
	    	oSticky.fixedEl.removeAttribute('aria-sticky');
	    }

	    if (underTrough && !troughed) {
	    	oSticky.fixedEl.setAttribute('aria-troughed', 'true');
	    } else if (!underTrough && troughed) {
	    	oSticky.fixedEl.removeAttribute('aria-troughed');
	    }

	    rAF( loop );
	}
	init();
	loop();
}

module.exports = Sticky;
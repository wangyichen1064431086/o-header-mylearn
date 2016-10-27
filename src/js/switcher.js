const Delegate = require('dom-delegate');

function Switcher(rootEl, config={openClass: 'switch-open'}) {
  const switcher = this;

  function init() {
    if (!rootEl) {
      rootEl = document.body;
    } else if (!(rootEl instanceof HTMLElement)) {
      rootEl = document.querySelector(rootEl);
    }

      switcher.bodyDomDelegate = new Delegate(document.body);

      const switchButton = rootEl.querySelector('[data-switch-button]');
      if (!switchButton) { return; }

      switcher.button = switchButton;
      switcher.isOpen = false;
  }

  function handleToggle() {
    switcher.isOpen = !switcher.isOpen;
    rootEl.classList.toggle(config.openClass);
    if (switcher.isOpen) {
      switcher.button.setAttribute('aria-expanded', 'true');
    } else {
      switcher.button.setAttribute('aria-expanded', 'false');
    }
  }

  function handleEsc(e) {
    if (switcher.isOpen && e.keyCode === 27) {
        handleToggle();
    }
  }

  function handleClick(e) {
    if (switcher.isOpen && !rootEl.contains(e.target)) {
      handleToggle();
    }
  }

  init();

  this.bodyDomDelegate.on('click',handleClick);

  this.bodyDomDelegate.on('keydown', handleEsc);

  this.button.addEventListener('click', handleToggle);
}

Switcher.init = function(el) {
  const switcherInstances = [];

  if (!el) {
    el = document.body;
  } else if (!(el instanceof HTMLElement)) {
    el = document.querySelector(el);
  }

  const switcherEls = el.querySelectorAll('[data-o-component=o-switch]');

  for (let i = 0; i < switcherEls.length; i++) {
    switcherInstances.push(new Switcher(switcherEls[i]));
  }

  return switcherInstances
}

module.exports = Switcher;
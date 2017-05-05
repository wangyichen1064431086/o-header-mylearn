import search from './search';
import mega from './mega';
import drawer from './drawer';
import subnav from './subnav';
import sticky from './sticky';

class Header {
	constructor (headerEl) {
		/**
		 * @param headerEl:
		 */

		//MARK:先处理参数，得到this.header为本html中属性data-o-component为"o-header"的元素
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component]="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		if (headerEl.hasAttribute('data-o-header--js')) {
			return;
		}

		this.headerEl = headerEl;

		//MARK:使用该元素（即this.header）初始化其他几个子模块组件
		search.init(this.headerEl);
		mega.init(this.headerEl);
		drawer.init(this.headerEl);
		subnav.init(this.headerEl);
		sticky.init(this.headerEl);

		//MARK:处理该元素的属性设置，移除'data-o-header--no-js'属性，添加'data-o-header--js'属性
		this.headerEl.removeAttribute('data-o-header--no-js');
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl) {
		/**
		 * @param rootEl:TYPE HTMLElement or String, Eg：document.body
		 */
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLELement)) {
			rootEl = document.querySelector(rootEl);
		}

		// MARK:如果rootEl的属性data-o-component的值含有单词o-beader，则返回一个 new Header(rootEl)
		if (/\bo-header\b/.test(rootEl.getAttribute('data-o-component'))) {
			// KNOWLEDGE:\b 匹配单词边界；\B 匹配非单词边界
			return new Header(rootEl);
		}

		// MARK: 如果本DOM中的具有属性'data-o-component = "o-header"'的元素el，还不具有属性'data-o-header--js'那么就返回一个new Header(el),这样就得到了一系列的new Header(el),然后过滤掉其中为undefined的new Header(el)
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), el => {
			// KNOWLEDGE: 注意还可以像这样用call的写法来使用数组的map方法
			if(!el.hasAttribute('data-o-header--js')) {
				return new Header(el);
			}
		}).filter((header) => {
			return header !== undefined;
		});
	}
}

export default Header;
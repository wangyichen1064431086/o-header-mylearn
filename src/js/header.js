import search from './search';
import mega from './mega';
import drawer from './drawer';
import subnav from './subnav';
import sticky from './sticky';

class Header {
	constructor (headerEl) {
		/**
		 * @param headerEl:Type string或为空或为Element.Type string,Eg:'[data-o-component]="o-header"]'
		 */

		//MARK:先处理参数，得到this.header为本html中属性data-o-component为"o-header"的元素
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component]="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		//MARK:如果headerEl含有属性'data-o-header--js'，则return,即表明已经添加了header相关的js不用在做以下任何工作了。
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
		 * @param rootEl:TYPE HTMLElement or String.TYPE HTMLELement, Eg：document.body; TYPE String: the string of document.querySelector
		 */
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLELement)) {
			rootEl = document.querySelector(rootEl);
		}

		// MARK:如果rootEl本身含有属性data-o-componen=o-beader，则返回一个 new Header(rootEl)
		if (/\bo-header\b/.test(rootEl.getAttribute('data-o-component'))) {
			// KNOWLEDGE:\b 匹配单词边界；\B 匹配非单词边界
			return new Header(rootEl);
		}

		// MARK: 如果rootEl本身不含属性data-o-component=o-header,但其下的子元素中含有属性'data-o-component = "o-header"'，如果这些子元素不具有属性'data-o-header--js'那么就返回一个new Header(el),这样就得到了一系列的new Header(el),然后过滤处理其中不为undefined的new Header(el)
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), el => {
			// KNOWLEDGE: 注意还可以像这样用call的写法来使用数组的map方法
			if(!el.hasAttribute('data-o-header--js')) {
				return new Header(el);
			}
		}).filter((header) => {
			return header !== undefined;//QUET:为什么会出现为undefined的new Header()呢？; ANSWER: 因为new Header(el)处理已经具有属性'data-ftc-header--js'的元素时，会直接return,那么这个new Header(el)的结果就是undefined
		});
	}
}

export default Header;
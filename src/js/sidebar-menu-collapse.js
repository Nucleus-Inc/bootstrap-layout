import { SIDEBAR_MENU_SELECTORS } from './config'

export class SidebarMenuCollapse {
	
	/**
	 * SidebarMenuCollapse constructor
	 * @return {[type]}         [description]
	 */
	constructor () {
		jQuery(SIDEBAR_MENU_SELECTORS.collapse).each((index, el) => this.init(el))
	}

	/**
	 * Get a jQuery element
	 * @param  {String|jQuery} elementOrSelector 	jQuery element or DOM selector
	 * @return {jQuery}                   			A jQuery element
	 */
	_element (elementOrSelector) {
		return elementOrSelector instanceof jQuery ? elementOrSelector : jQuery(elementOrSelector)
	}

	/**
	 * Click event listener
	 * @param  {MouseEvent} e Mouse Event
	 */
	_onClick (e) {
		const button = jQuery(e.currentTarget)
		if (button.next('ul').html()) {
			e.preventDefault()
			const parent = button.parent()
			// Toggle Open Classes
			if (parent.hasClass('open')) {
				parent.removeClass('open')
			} 
			else {
				const nav = button.closest(SIDEBAR_MENU_SELECTORS.menu)
				const submenuOpen = nav.find(`${ SIDEBAR_MENU_SELECTORS.item }.open`)
				// Close Parent Open Submenus
				submenuOpen.removeClass('open')
				parent.addClass('open')
			}
		}
	}

	/**
	 * Initialize a sidebar menu
	 * @param  {String|jQuery} el jQuery element or DOM selector
	 */
	init (el) {
		this._element(el).on('click', this._onClick)
	}
}

// EXPORT INSTANCE
export let sidebarMenuCollapse = new SidebarMenuCollapse()
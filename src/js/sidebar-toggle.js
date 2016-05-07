import { Sidebar } from './sidebar'
import { SIDEBAR_TOGGLE_SELECTOR } from './config'

class SidebarToggle {
	
	constructor () {
		this.sidebar = new Sidebar()
		this.init()
	}

	init () {
		jQuery(SIDEBAR_TOGGLE_SELECTOR).on('click', e => this._onClick(e))
	}

	_onClick (e) {
		e.stopPropagation()
		const sidebar = jQuery(e.currentTarget).data('target')
		this.sidebar.toggle(sidebar)
	}

	destroy () {
		jQuery(SIDEBAR_TOGGLE_SELECTOR).off('click', e => this._onClick(e))
	}
}

// export instance
export default new SidebarToggle()

// export class
export { SidebarToggle }
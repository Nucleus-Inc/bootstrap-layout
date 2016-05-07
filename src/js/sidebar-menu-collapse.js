import Sidebar from './sidebar'
import { SIDEBAR_MENU_SELECTORS } from './config'

class SidebarMenuCollapse {
	
	constructor (sidebar) {
		this.sidebarInst = Sidebar
		this.sidebar = this.sidebarInst._sidebar(sidebar)

		// initialize
		if (this.sidebar) {
			this.sidebar.find(SIDEBAR_MENU_SELECTORS.button).on('click', this._onCollapse)
		}
	}

	_onCollapse (e) {
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

	destroy () {
		if (this.sidebar) {
			this.sidebar.find(SIDEBAR_MENU_SELECTORS.button).off('click', this._onCollapse)
		}
	}
}

export default SidebarMenuCollapse
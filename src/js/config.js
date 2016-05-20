/* eslint spaced-comment: 0 */

////////////////////
// SIDEBAR TOGGLE //
////////////////////

// DOM selectors
export const SIDEBAR_TOGGLE_SELECTOR = '[data-toggle="sidebar"]'

////////////
// LAYOUT //
////////////

// Class names
export const LAYOUT_SIDEBAR_CLASS = 'layout-sidebar'

// DOM selectors
export const LAYOUT_CONTAINER_SELECTOR = '.layout-container'

/////////////
// SIDEBAR //
/////////////

export const SIDEBAR_VISIBLE_CLASS = 'sidebar-visible'
export const SIDEBAR_SIZE_CLASS = 'sidebar-size'

// DOM selectors
export const SIDEBAR_SELECTOR = '.sidebar'

// DATA API
export const SIDEBAR_DATA_KEY = 'bl.sidebar'

// EVENTS
export const SIDEBAR_EVENTS = {
	show: `show.${ SIDEBAR_DATA_KEY }`,
	shown: `shown.${ SIDEBAR_DATA_KEY }`,
	hide: `hide.${ SIDEBAR_DATA_KEY }`,
	hidden: `hidden.${ SIDEBAR_DATA_KEY }`
}

// SIDEBAR MENU

// DOM selectors
export const SIDEBAR_MENU_SELECTORS = {
	menu: '.sidebar-menu',
	submenu: '.sidebar-submenu',
	item: '.sidebar-menu-item',
	button: '.sidebar-menu-button'
}
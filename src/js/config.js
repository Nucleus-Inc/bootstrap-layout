/* eslint spaced-comment: 0 */

////////////////////
// SIDEBAR TOGGLE //
////////////////////

// DOM selectors
export const SIDEBAR_TOGGLE_SELECTOR = '[data-toggle="sidebar"]'

////////////////
// SCROLLABLE //
////////////////

// DOM selectors
export const SCROLLABLE_SELECTOR = '[data-scrollable]'

// DATA API
export const SCROLLABLE_DATA_KEY = 'bl.scrollable'
export const SCROLLABLE_DATA = {
	scrollTimer: `scrollTimer.${ SCROLLABLE_DATA_KEY }`
}

// EVENTS
export const SCROLLABLE_EVENTS = {
	scroll: `scroll.${ SCROLLABLE_DATA_KEY }`,
	scrollEnd: `scrollEnd.${ SCROLLABLE_DATA_KEY }`,
	scrollTo: `scrollTo.${ SCROLLABLE_DATA_KEY }`
}

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
	item: '.sidebar-menu-item',
	button: '.sidebar-menu-button'
}
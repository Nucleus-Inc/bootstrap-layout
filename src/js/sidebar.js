import forOwn from 'mout/object/forOwn'
import unique from 'mout/array/unique'
import 'breakpoints'

/**
 * Class Sidebar
 */
class Sidebar {
	
	/**
	 * Contruct Sidebar
	 * @return {Sidebar} The Sidebar instance
	 */
	constructor () {
		// INTERNAL OPTIONS
		this.SCREEN_SIZE = null
		this.SCREEN_DESKTOP = null
		this.UPDATE_SCREEN_DEBOUNCE = 30
		this.BREAKPOINTS = {
			320: ['xs', 'xs-up'],
			480: ['xs', 'xs-up'],
			554: ['xs', 'xs-up'],
			768: ['sm', 'sm-up'],
			992: ['md', 'md-up'],
			1200: ['lg', 'lg-up'],
			1600: ['xl', 'xl-up']
		}
		this.VISIBLE_CLASS = 'si-vi'

		// DOM SELECTORS
		this.LAYOUT_CONTAINER_SELECTOR = '.layout-container'
		this.SELECTOR = '.sidebar'
		this.TOGGLE_SELECTOR = '[data-toggle=sidebar]'
		this.NAV_SELECTOR = '.sidebar-menu'
		this.NAV_ITEM_SELECTOR = '.sidebar-menu-item'
		this.NAV_BUTTON_SELECTOR = '.sidebar-menu-button'

		// INTERNAL TIMERS
		this._updateScreenDebounce = null
	}

	/**
	 * Get the sidebar options for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Object}
	 */
	_options (sidebar) {
		sidebar = this._sidebar(sidebar)
		const position = sidebar.data('position') || 'left'
		const size = (sidebar.data('size') || 3) + ''
		const direction = position.charAt(0)
		const visible = sidebar.data('visible') || 'md-up'
		const id = sidebar.attr('id')
		return {
			id,
			position,
			direction,
			size,
			visible
		}
	}

	/**
	 * Initialize screen size breakpoints
	 * @param  {Boolean} reset 	Remove the breakpoints
	 */
	_breakpoints (reset) {
		const _values = Object.keys(this.BREAKPOINTS).map((v) => parseInt(v, 10))

		if (typeof $.fn.setBreakpoints !== 'undefined') {
			$(window).setBreakpoints({ breakpoints: _values })
		}

		this._each((sidebar) => {
			forOwn(this.BREAKPOINTS, (values, key, object) => {
				this._visibleOptions(sidebar).forEach((visible) => {
					if (values.indexOf(visible) !== -1) {
						let isUp = visible.indexOf('up') !== -1
						let up = _values.filter((v) => v > key)

						let down = _values.filter((v) => v < key)
						down.forEach((breakpoint) => {
							$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, () => this.hide(sidebar))
						}, this)

						if (isUp) {
							up.unshift(key)
							up.forEach((breakpoint) => {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, () => this.show(sidebar, false))
							}, this)
						}
						else {
							$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ key }`, () => this.show(sidebar, false))
							up.forEach((breakpoint) => {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, () => this.hide(sidebar))
							}, this)
						}
					}
				}, this)
			})
		})
	}

	/**
	 * Join a classes Array into a String
	 * @param  {Array} classes
	 * @return {String}
	 */
	_classString (classes) {
		return classes.join(' ')
	}

	/**
	 * Get the layout classes for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_layoutClasses (sidebar) {
		const options = this._options(sidebar)
		let classes = []
		this._visibleOptions(sidebar).map((v) => {
			this._sizeOptions(sidebar).map((s) => {
				let className = `si-${ options.direction }${ s }`
				let matchVisible = s.match(/([a-zA-Z-]+)/ig)
				if (matchVisible) {
					matchVisible = matchVisible.pop().replace(/^\-/, '')
				}
				if (s.indexOf(v) === -1 && !matchVisible) {
					className = `${ className }-${ v }`
				}
				else if (matchVisible && v.indexOf(matchVisible) === -1) {

				}
				classes.push(className)
			})
		})
		return unique(classes)
	}

	/**
	 * Get the sidebar classes for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_sidebarClasses (sidebar) {
		const options = this._options(sidebar)
		const classes = [
			`sidebar-${ options.position }`
		]
		const sizeClasses = this._sizeOptions(sidebar).map((s) => `si-si-${ s }`)
		return classes.concat(sizeClasses)
	}

	/**
	 * Get a size options Array for a sidebar
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_sizeOptions (sidebar) {
		const options = this._options(sidebar)
		return options.size.split(' ')
	}

	/**
	 * Get a visible options Array for a sidebar
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_visibleOptions (sidebar) {
		const options = this._options(sidebar)
		if (options.visible === 'none') {
			return []
		}
		return options.visible.split(' ')
	}

	/**
	 * Get the closest layout container element for a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 * @return {jQuery}         		A jQuery element
	 */
	_layout (sidebar) {
		sidebar = this._sidebar(sidebar)
		return sidebar.closest(this.LAYOUT_CONTAINER_SELECTOR)
	}

	/**
	 * Toggle a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	toggle (sidebar) {
		sidebar = this._sidebar(sidebar)
		sidebar.hasClass(this.VISIBLE_CLASS) ? this.hide(sidebar) : this.show(sidebar)
	}

	/**
	 * Show a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 * @param  {Boolean} transition 	Use transition (default true)
	 */
	show (sidebar, transition = true) {
		sidebar = this._sidebar(sidebar)
		const visibleClass = this.VISIBLE_CLASS
		const options = this._options(sidebar)

		// show
		$('body').trigger('show.bl.sidebar', [options])

		if (!sidebar.hasClass(visibleClass)) {

			// layout classes
			this._layout(sidebar).addClass(this._classString(this._layoutClasses(sidebar)))

			// USE TRANSITION
			if (transition) {
				sidebar.addClass('sidebar-transition')
				return setTimeout(() => {
					sidebar.addClass(visibleClass)
					// shown
					$('body').trigger('shown.bl.sidebar', [options])
				}, 10)
			}

			// WITHOUT TRANSITION
			sidebar.addClass(visibleClass)

			// shown
			$('body').trigger('shown.bl.sidebar', [options])
		}
	}

	/**
	 * Hide a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	hide (sidebar) {
		sidebar = this._sidebar(sidebar)
		const visibleClass = this.VISIBLE_CLASS
		const options = this._options(sidebar)

		if (sidebar.hasClass(visibleClass)) {

			// hide
			$('body').trigger('hide.bl.sidebar', [options])

			// layout classes
			this._layout(sidebar).removeClass(this._classString(this._layoutClasses(sidebar)))

			// sidebar visibility
			sidebar.removeClass(visibleClass)

			// transition
			if (sidebar.hasClass('sidebar-transition')) {
				setTimeout(() => {
					sidebar.removeClass('sidebar-transition')
					// hidden
					$('body').trigger('hidden.bl.sidebar', [options])
				}, 450)	
			}
			else {
				// hidden
				$('body').trigger('hidden.bl.sidebar', [options])
			}
		}
	}

	/**
	 * Internal helper that always returns a jQuery element
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or String DOM selector
	 * @return {jQuery}         		A sidebar jQuery element
	 */
	_sidebar (sidebar) {
		if (sidebar instanceof jQuery === true) {
			return sidebar
		}
		return $(sidebar)
	}

	/**
	 * Run callback on each sidebar element
	 * @param  {Function} callback The callback
	 */
	_each (callback) {
		$(this.SELECTOR).each((k, sidebar) => callback.call(this, $(sidebar)))
	}

	/**
	 * Internal method to keep track of the screen size
	 */
	_updateScreen () {
		clearTimeout(this._updateScreenDebounce)
		this._updateScreenDebounce = setTimeout(() => {
			this.SCREEN_SIZE = $(window).width()
			this.SCREEN_DESKTOP = $(window).width() >= 768
		}, this.UPDATE_SCREEN_DEBOUNCE)
	}

	/**
	 * Body touchstart or click event handler when on mobile
	 * @param  {DOMEvent} e 	The DOM event
	 */
	_closeBody (e) {
		this._each((sidebar) => {
			if (sidebar.hasClass(this.VISIBLE_CLASS) && !this.SCREEN_DESKTOP || sidebar.hasClass('closable-desktop')) {
				// if the target of the click is NOT the sidebar container
				// or a descendant of the sidebar container
				if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
					this.hide(sidebar)
				}
			}
		})
	}

	/**
	 * Initialize Sidebars
	 */
	init () {

		this._breakpoints()

		// active toggle button
		$('body').on('show.bl.sidebar', (e, options) => {
			if (options) {
				const button = $(this.TOGGLE_SELECTOR + '[data-target="#' + options.id + '"]')
				button.addClass('active')
			}
		})
		.on('hide.bl.sidebar', (e, options) => {
			if (options) {
				const button = $(this.TOGGLE_SELECTOR + '[data-target="#' + options.id + '"]')
				button.removeClass('active')
			}
		})

		this._each((sidebar) => {
			// layout classes
			this._layout(sidebar).addClass(this._classString(this._layoutClasses(sidebar)))
			// sidebar classes
			sidebar.addClass(this._classString(this._sidebarClasses(sidebar)))
		})

		// UPDATE THE INITIAL SCREEN SIZE
		this._updateScreen()

		// KEEP TRACK OF THE SCREEN SIZE
		$(window).resize(this._updateScreen.bind(this))

		// SIDEBAR COLLAPSE MENUS
		$(this.NAV_BUTTON_SELECTOR).on('click', (e) => {
			const button = $(e.currentTarget)
			if (button.next('ul').html()) {
				e.preventDefault()
				const parent = button.parent()
				// Toggle Open Classes
				if (parent.hasClass('open')) {
					parent.removeClass('open')
				} 
				else {
					const nav = button.closest(this.NAV_SELECTOR)
					const submenuOpen = nav.find(`${ this.NAV_ITEM_SELECTOR }.open`)
					// Close Parent Open Submenus
					submenuOpen.removeClass('open')
					parent.addClass('open')
				}
			}
		})

		// TOGGLE SIDEBAR
		$(this.TOGGLE_SELECTOR).on('click', (e) => {
			e.stopPropagation()
			const sidebar = $($(e.currentTarget).data('target'))
			if (sidebar) {
				this.toggle(sidebar)
			}
		})

		// CLOSE SIDEBAR ON MOBILE OR FLOATING WHEN BODY IS CLICKED
		$('body').on('click touchstart', this._closeBody.bind(this))
	}
}

export default Sidebar
module.exports = exports.default
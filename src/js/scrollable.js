import { 
	SCROLLABLE_SELECTOR, 
	SCROLLABLE_DATA_KEY, 
	SCROLLABLE_DATA, 
	SCROLLABLE_EVENTS 
} from './config'

class Scrollable {

	constructor () {
		jQuery(SCROLLABLE_SELECTOR).each(el => this.init(jQuery(el)))
	}

	init (el) {

		if (jQuery.fn.simplebar === undefined) {
			return
		}		
		
		if (el.data(SCROLLABLE_DATA_KEY)) {
			return
		}

		el.data(SCROLLABLE_DATA_KEY, true)
		el.addClass('simplebar')
		if (el.data('scrollable-direction') === 'horizontal') {
			el.addClass('simplebar-horizontal')
		}
		el.simplebar()

		el.simplebar().on('scroll', (e) => {
			const scrollable = jQuery(e.target)
			const scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
			scrollable.trigger(SCROLLABLE_EVENTS.scroll, [scrollTop])

			clearTimeout(scrollable.data(SCROLLABLE_DATA.scrollTimer))
			scrollable.data(SCROLLABLE_DATA.scrollTimer, setTimeout(() => {
				let scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
				scrollable.trigger(SCROLLABLE_EVENTS.scrollEnd, [scrollTop])
			}, 100))
		})
		
		el.on(SCROLLABLE_EVENTS.scrollTo, (id) => {
			const toElement = document.querySelector(id)
			if (toElement) {
				el.simplebar('getScrollElement').animate({
					scrollTop: toElement.offsetTop
				})
			}
		})
	}

	destroy (el) {
		el.off([SCROLLABLE_EVENTS.scroll, SCROLLABLE_EVENTS.scrollTo, SCROLLABLE_EVENTS.scrollEnd].join(' '))
		el.removeData([SCROLLABLE_DATA.scrollTimer, SCROLLABLE_DATA_KEY])
	}
}

// export instance
export default new Scrollable()

// export class
export { Scrollable }
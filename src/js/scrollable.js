import 'simplebar/src/simplebar'

export default function () {

	$.fn.blScrollable = function () {
		if (!this.length) return
		if (this.length > 1) {
			this.each(function () {
				$(this).blScrollable()
			})
			return
		}

		var el = this
		el.addClass('simplebar')

		if (el.data('horizontal')) {
			el.addClass('horizontal')
		}

		el.simplebar()
		el.simplebar().on('scroll', function () {
			var scrollable = $(this)
			let scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
			$('body').trigger('scrolling.bl.scrollable', [scrollTop])
			clearTimeout(this.scrollTimer)
			this.scrollTimer = setTimeout(function () {
				let scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
				$('body').trigger('end-scrolling.bl.scrollable', [scrollTop])
			}, 100)
		})
		el.on('scroll-to.bl.scrollable', (id) => {
			let toElement = document.querySelector(id)
			if (toElement) {
				el.simplebar('getScrollElement').animate({
					scrollTop: toElement.offsetTop
				})
			}
		})
	}
	
	$('[data-scrollable]').blScrollable()
}

module.exports = exports.default
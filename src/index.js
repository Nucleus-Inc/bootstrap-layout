// STYLING
import './sass/style'

// COMPONENTS
import Sidebar from './js/sidebar'
import Scrollable from './js/scrollable'

// LIBRARY
const BootstrapLayout = {
	Sidebar: new Sidebar(),
	Scrollable
}

// EXPORT ES6
export default BootstrapLayout

// EXPORT ES5
module.exports = exports.default
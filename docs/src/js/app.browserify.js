// Vendor libraries
// jQuery
window.$ = window.jQuery = require('jquery');

// Tether (required by Bootstrap 4)
window.Tether = require('tether');

// Bootstrap 4
require('bootstrap');

// Simplebar
require('simplebar/dist/simplebar.min');

// Bootstrap Layout
require('bootstrap-layout');

// Bootstrap Layout Scrollable
require('bootstrap-layout-scrollable')

// Anchor.js
var AnchorJS = require('anchor-js');

var anchorsAlways = new AnchorJS({ visible: 'always' })
anchorsAlways.add('.layout-content h2')

var anchorsHover = new AnchorJS({ visible: 'hover' })
anchorsHover.add('.layout-content h3')
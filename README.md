# bootstrap-layout

Bootstrap layout with sidebar navigation, skins, transitions, custom scrollbars, sidebar menu utilities and other advanced features.

## Usage

### Basic install
> Simple install via npm:

```bash
npm install bootstrap-layout
```

### Basic usage

```html
<!-- Before closing the <head> tag -->
<!-- After Bootstrap's CSS -->
<style rel="stylesheet" href="dist/bootstrap-layout.css">

<!-- Before closing the <body> tag -->
<!-- After jQuery -->
<script src="dist/bootstrap-layout.js"></script>
```

### Using the source (Sass)

#### Dependencies

> If you need to use to customise the Sass source files, you also have to install some dependencies:

```bash
npm install bootstrap-layout \
	bootstrap@v4.0.0-alpha.2 \
	sass-md-colors
```

#### Importing Sass files from node_modules

> We import Sass files from other packages installed through npm.

```sass
// For example, load bootstrap variables from node_modules/bootstrap:
@import 'bootstrap/scss/variables';
```

For this to work with your Sass compiler, you'll need to use something like [sass-importer-npm](https://github.com/themekit/sass-importer-npm) (for node-sass)


### Layout
> At minimum, the following structure is required:

- `html` tags require the `.bootstrap-layout` class
- a layout wrapper container with the `.layout-container` class (also works when applied to `body`)
- a layout content container with the `.layout-content` class

```html
<!DOCTYPE html>
<html class="bootstrap-layout">
<head>
	...
</head>

<body class="layout-container">
  
  <!-- Content -->
  <div class="layout-content">
    <div class="container-fluid">
    	...
    </div>
  </div>
  
</body>
</html>
```

### Sidebar

- sidebars require the `.sidebar` class
- sidebars require a unique `id` attribute
- Add `data-position="left|right"` for positioning (defaults to left)
- Add `data-size="2|3"` for the sidebar width (defaults to 3)
- Add `data-visible="..."` attribute for automatic sidebar toggle on screen size breakpoints, for example `md lg md-up lg-up` in any combination. Defaults to `md-up`. Can also be `none` to disable.

```html
<div class="sidebar" 
	id="my-sidebar"
	data-position="left"
	data-size="3"
	data-visible="md-up">
	... 
</div>
```

#### JavaScript

```js
// Enable sidebars
BootstrapLayout.Sidebar.init()
```

#### Sidebar toggle buttons

> Note the sidebar container element requires a unique `id` attribute.

```html
<button class="btn btn-default" 
	data-toggle="sidebar" 
	data-target="#my-sidebar">
	Toggle
</button>
```

### Custom scrollbars

#### HTML

Add `data-scrollable` HTML5 attribute to any element to enable custom scrollbars. Also, recommended for `.layout-content` and `.sidebar` elements.

#### JavaScript

```js
// Enable custom scrollbars
BootstrapLayout.Scrollable()
```
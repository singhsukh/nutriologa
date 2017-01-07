# Sylvie
## Content
1. Prerequirements
2. Before coding
3. Project structure
4. Stylus naming and usage
5. Nunjucks: extends, include, blocks
6. Dynamic content inside templates
7. Installing bower packages (third-party libraries)
8. Not in this README

## Prerequirements
- NodeJS Installed (6.9.1) [Suggestion: Use nvm to avoid common installation errors]
- Gulp (global installation)
```
npm install -g gulp
```
- JSHint (global installation)
```
npm install -g jshint
```
- Stylus (global installation)
```
npm install -g stylus
```
- Bower (global installation)
```
npm install -g bower
```

## Before coding
Modify **packages.json** and **bower.json** files on line 2 (both files) to change the project name. Also, modify **bower.json** on line 5 to edit the authors of the project.

Install local node dependencies
```
npm install
```
Install bower packages
```
bower install
```
Run gulp
```
gulp
```
Open your browser and write localhost:8080 in the url bar

## Project structure
Unless you need to change the gulp default configuration or add third-party libraries, you will only need to work in the /src directory. This directory contains the following folders:
### templates
Nunjucks files (.njk), separated into /partials and /sections subfolders.

- **/partials** contains general components of the html structure
  - **navbar.njk** only contains html code for nav tag
  - **footer.njk** only contains html code for footer tag
  - **base.njk** contains the base structure that will be used for all sections, it includes the navbar.njk and footer.njk files, as well as link and script tags that import css and js files (previously compiled by gulp). Important: by default, script imports are commented.
- **/sections** contains specific html code for each section (index, contact, etc.)

### styl
Stylus files, including /partials and /sections subfolders.

- **vars.styl** contains stylus global variables (color names and font weights)
- **mixins.styl** contains stylus mixins that are useful to avoid code repetition
  - **center-block()**: Centers a display:block element
  - **remify(pxsize)**: Transforms a pixel-based size into a rem-based one (useful for responsive styles)
  - **simple-border(side, width, colour, style)**: Generates element borders. It could receive 'all', 'top', 'bottom', 'left', 'right', 'topbottom', 'leftright', 'notop', 'nobottom', 'noleft', 'noright' values for side parameter. If it is not provided, style=solid
- **fonts.styl** contains declaration of custom fonts
- **utils.styl** contains css utility classes. By default, there are just two (.cover and .simple-parallax) and commented imports for some bootstrap code
- **base.styl** contains general styles for the website (buttons, links, lists, etc.)
- **main.styl** imports all the other files
- **/partials** contains navbar.styl and footer.styl files
- **/sections** contains specific styles for each section

**base.styl and all the files inside /partials and /sections should contain their own respective media queries at the end of code**

### js
Contains all js files of the project (except libraries)

**JS code should be separated into small single files**

**Important:** By default, js file is not imported into the website. If you wrote any js code you will need to uncomment /templates/partials/base.njk file on line 21.

### fonts
Contains all font files used in /styl/fonts.styl

### img
Contains all image files. Suggestion: create separated folders, such as covers, icons, etc.

**favicon.ico must be placed directly inside of /src, not in /src/img**

## Stylus naming and usage
### Variables
In order to make it clear that you are using a stylus variable, they should be declared using the following format:
```
$red = #d23f31

// Usage
.some-class
  color $red
```

### Mixins
Mixins are declared with the following syntax:
```
mixin-name(parameter1, parameter2, ...)
  code
```
Once that they are declared you can use them by either brackets syntax or css-alike syntax.
```
// Brackets
.some-class
  mixin-name(parameter1, parameter2, ...)

// Css-alike
.some-class
  mixin-name parameter1 parameter2
```
There are two types of mixin, one that returns a value and the other that doesn't.
The first one must be used as a css property value and with brackets syntax, and the second one as a css propery name.
```
// If mixin returns a value
.some-class
  css-property mixin-name(parameter1, parameter2, ...)

// If mixin doesn't return a value
.some-class
  mixin-name(parameter1, parameter2, ...)
  // or
  mixin-name parameter1 parameter2
```
### Fonts
Fonts must be declared in the following way:

```
@font-face
  font-family 'Font Name'
  src url('../fonts/fontfile.extension')
  font-style normal
  font-weight $light
```

If a font family has more than one variant, each variant must be declared individually using the same syntax. In order to make it easier to set the font-weight value, there are some predefined variables in the vars.styl file.

## Nunjucks: extends, include, blocks
Nunjucks is a tool that lets you have a modularized html code and avoid repetition (especially for navbar and footer content). It provides you simple ways to include the code of other nunjucks files and to make a file extends the code of another one by using blocks.

A block is a region defined in the base file that is dynamically filled, depending on what section is currently extending that file.

By default, the **/partials/base.njk** file contains 3 blocks (meta, title and content) that can be used in every single nunjucks file that extends from /partials/base.njk (usually all files extends from it).

- **meta** (optional) contains the meta tags of the section (viewport and charset are already set in base.njk)
- **title** contains the text that will be displayed in the title html tag
- **content** contains the section code itself

You can create more blocks if you need them.

This is the base structure of a section file:
```
{% extends "partials/base.njk" %}

{% block meta %}
{% endblock %}

{% block title %}
{% endblock %}

{% block content %}
{% endblock %}
```

## Dynamic content inside templates
In some cases, the html code generated by nunjucks shouldn't be the same for all sections. This behavior is particullary frequent inside the nav html tag because of the following two reasons:

- The homepage navbar being different from the others sections one.
- The current section link usually has a css 'active' class that sets a different text color.

As it would be a really bad idea to create a different navbar for each section, we have to use some nunjucks additional code to generate different html content for each .njk section file.

By default, each nunjucks file inside the sections folder has access to its own filename via a nunjucks variable called **section**. You can use this variable, combined with an **if** statement to tell nunjucks to compile a different portion of code for each section, as in the following example:

```
<nav>
  <ul>
    <li class="navbar-link {% if section == 'index' %}active{% endif %}"><a>Home</a></li>
    <li class="navbar-link {{ 'active' if section == 'contact' }}"><a>Contact Us</a></li>
</nav>
```

As you can notice, you can use the full syntax of the **if** statement or the inline one, they both will work and they will add the **active** class to the list element only if the current section name matches with the one that was written in the condition.

**Important:** Remember that the section variable contains the nunjucks section file name without the extension. For example, 'index.njk' makes the variable value to be 'index', and 'about-us.njk' makes it to be 'about-us'.

## Installing bower packages (third-party libraries)
If you need any js or css third-pary library (jquery and jquery-validate are already included in the project), you can search in the bower packages list: https://bower.io/search/ and install it with the following command

```
bower install --save package-name
```

This command will download the package source and add the package name to the bower.json file.

**Important:** Even if you downloaded the package it won't be added to the final website. You need to manually include the package name to the css or js bower group, depending on what kind of file you want to import (some libraries may be included in both groups). To do this, you need to edit the bower.json file and find the "group" section.

```
  "group": {
    "css": {},
    "js": [
      "jquery",
      "jquery-validation"
    ]
  }
```

By doing this, the main source files of the library are included in the final css or js files generated by gulp.
For css libraries, you will also need to edit **gulptasks/build.bower.js** file and uncomment lines from 10 to 14.
For both css and js libraries, you will also need to edit **src/templates/partials/base.njk** and uncomment lines 7 (css) or 20 (js).
Afther doing this, you may need to rerun gulp.

If you need to use bootstrap modals, tooltips, or any other js bootstrap module, you need to add bootstrap to the js group (it is already included as a bower dependency and just needs to be added to the group) and edit /src/styl/utils.styl to import their respective styles. Here is a list of some of the different bootstrap style modules:

- 'bootstrap/tooltip'
- 'bootstrap/popover'
- 'bootstrap/modals'
- 'bootstrap/dropdowns'

The full list of bootstrap components is availible in
http://getbootstrap.com/components, and their respective stylus files in
https://github.com/maxmx/bootstrap-stylus/tree/master/bootstrap


All the components except glyphicons will work fine

## Not in this README
If you have any problem or doubt that is not included in this file, please contact me by sending a message to alan@blick.mx

## README ##

### Detailed documentation will be availalble soon. **Please be a patient!** ###

It's a new version of Clean UI Admin Template. Refactored and improved.
Now it's full modular and it on BEM (block-element-modifier) - each module and component are separated from each other.
After final release we will start to develop new modules that replicate the functionality of popular services such as YouTube, Facebook, etc. You can easily implement it after - since all styles and selectors are unique and not break your UI.

Enjoy!


### Issues Tracker ###

Please use Issues Tracker for post issues / founded bugs or write to [support@cleanuitemplate.com](mailto:support@cleanuitemplate.com)

### Prebuilt Pages ###

* /version_html/dist/versions/ page templates
* /version_html/dist/modules/ clean ui assets (modules)
* /version_html/dist/vendors/ vendors assets

### Installing Environment ###

* Install Node.js 7.5.0 ([https://nodejs.org](https://nodejs.org))
* Install Gulp and Bower "npm install --global bower gulp"

### Static version serving ###

* "cd version_html/" enter to static version folder
* "npm install" install node plugins (once)
* "bower install" install vendors plugins (once)
* "gulp" for live serving

### Angular version serving ###

* "npm install -g angular/cli" install Angular CLI globally
* "cd version_angular/" enter to angular version folder
* "npm install" install node plugins (once)
* "ng start" for live serving
* "ng build --prod --aot" for production build (/dist/ folder)

### Roadmap ###

* "21 FEB 2017" Ng-Bootstrap directives, Themes Module
* "22 FEB 2017" Apps Pages Module, Ng-Bootstrap directives
* "23 FEB 2017" Dashboards Module (draggable, widgets, etc.)
* "25 FEB 2017" Detailed Documentation / Code Documentation
* "27 FEB 2017" Bug Fixes, Final 2.0.0 Release
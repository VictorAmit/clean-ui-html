'use strict';

/*
 * CLEAN UI HTML ADMIN TEMPLATE GULP FILE
 */

/////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

var cleanui = {
    "templateName": "Clean UI Admin Template HTML",
    "pageTitle": "Clean UI Admin Template HTML",
    "description": "Clean UI HTML – a modern professional admin template, based on Bootstrap 4 framework. Clean UI is a powerful and super flexible tool, which suits best for any kind of web application: Web Applications; CRM; CMS; Admin Panels; Dashboards; etc.",
};



/////////////////////////////////////////////////////////////////////////////
// GULP PLUGINS

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    ignore = require('gulp-ignore'),
    rimraf = require('gulp-rimraf'),
    browserSync = require("browser-sync"),
    wrap = require('gulp-wrap'),
    template = require('gulp-template'),
    data = require('gulp-data'),
    print = require('gulp-print'),
    replace = require('gulp-replace-task'),
    promise = require('gulp-promise'),
    fs = require('fs');



/////////////////////////////////////////////////////////////////////////////
// GULP PATHS

var path = {
    src: {
        versions: 'src/versions/',
        pages: 'src/pages/**/*.html',
        components: 'src/components/',

        templates: 'src/components/**/**/*.html',
        img: 'src/components/**/img/**/*.*',
        css: 'src/components/**/**/*.scss',
        js: 'src/components/**/**/*.js',
        favicon: 'src/components/dummy-assets/img/favicon.ico',

        vendors_by_bower: 'src/vendors/by_bower/**/*.*',
        vendors_by_hands: 'src/vendors/by_hands/**/*.*'
    },
    build: {
        versions: 'dist/versions/',
        components: 'dist/components/',
        vendors: 'dist/vendors/'
    },
    clean: ['dist/*']
};



/////////////////////////////////////////////////////////////////////////////
// PRINT ERRORS

function printError(error) {
    console.log(error.toString()); // print error
    this.emit('end'); // end task
}



/////////////////////////////////////////////////////////////////////////////
// BROWSERSYNC SERVE

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./dist/", // base dir path
            directory: true // show as directory
        },
        tunnel: false, // tunnel
        host: 'localhost', // host
        port: 9000, // port
        logPrefix: "frontend", // console log prefix
    }); // run BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// BUILD PAGES


gulp.task('build:versions', function () {
    
    var tasks = [];
    var arrayHtml = fs.readdirSync(path.src.versions).filter(function(e) { return e !== 'head.html' }); //  get template versions path excluding head.html
    
    for (var i in arrayHtml) {
        tasks.push(
            new Promise(function(resolve, reject) {
                gulp.src(path.src.pages) // get pages templates
                    .pipe(ignore.exclude('**/head.html')) // exclude mixins.scss file
                    .pipe(data({
                        templateName: cleanui.templateName,
                        pageTitle: cleanui.pageTitle,
                        productVersion: cleanui.version
                    })) // set variables
                    .pipe(wrap({src: path.src.versions + arrayHtml[i]})) // insert all pages to layout
                    .pipe(rigger()) // include component templates to generated pages
                    .pipe(template()) // replace DATA variables
                    .pipe(rename(function (path) {
                        var prefix = path.dirname;
                        path.dirname = "/";
                        path.basename = prefix + '-' + path.basename;
                    })) // rename pages
                    .on('error', printError) // print error if found
                    .pipe(gulp.dest(path.build.versions + arrayHtml[i].replace('.html', ''))) // copy generated pages to build folder
                    .on('end', resolve)
            })
        )
    }

    return Promise.all(tasks).then(function () {
        browserSync.reload(); // reload BrowserSync
    });;
});



/////////////////////////////////////////////////////////////////////////////
// VENDORS BUILD

gulp.task('build:vendors', function() {
    gulp.src([path.src.vendors_by_bower, path.src.vendors_by_hands]) // get folders with vendors components
        .pipe(gulp.dest(path.build.vendors)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT BUILD

gulp.task('build:js', function () {
    gulp.src(path.src.js, {base: path.src.components}) // get folder with js
        .pipe(gulp.dest(path.build.components)) // copy to destination folder
        .on('end', function(){ browserSync.reload(); }) // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// STYLES BUILD

gulp.task('build:css', function () {
    gulp.src(path.src.css, {base: path.src.components}) // get folder with css
        .pipe(ignore.exclude('**/mixins.scss')) // exclude mixins.scss file
        .pipe(sass({outputStyle: 'expanded', indentWidth: 4})) // css formatting
        .on('error', printError) // print error if found
        .pipe(autoprefix({
            browsers: ['last 30 versions', '> 1%', 'ie 9'],
            cascade: true
        })) // add cross-browser prefixes
        .pipe(gulp.dest(path.build.components))  // copy sources
        .on('end', function(){ browserSync.reload(); }) // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// IMAGES BUILD

gulp.task('build:img', function () {
    gulp.src(path.src.img, {base: path.src.components}) // get folder with images
        .pipe(ignore.exclude('**/favicon.ico')) // exclude favicon.css file
        .on('error', printError) // print error if found
        .pipe(gulp.dest(path.build.components)); // copy to destination folder

    gulp.src(path.src.favicon, {base: path.src.components}) // get favicon
        .pipe(gulp.dest(path.build.components)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// GLOBAL BUILD

gulp.task('build', [
    'build:versions', // run build:html task
    'build:css', // run build:css task
    'build:js', // run build:js task
    'build:img', // run build:img task
    'build:vendors' // run build:vendors task
]);



/////////////////////////////////////////////////////////////////////////////
// FILES CHANGE WATCHER

gulp.task('watch', function(){
    watch([path.src.versions, path.src.pages, path.src.templates], function() { // watch components, components, versions and templates folders
        gulp.start('build:versions'); // run build:versions task
    });
    watch([path.src.css], function() { // watch css folder
        gulp.start('build:css'); // run build:css task
    });
    watch([path.src.js], function() { // watch js folder
        gulp.start('build:js'); // run build:js task
    });
    watch([path.src.img], function() { // watch img folder
        gulp.start('build:img'); // run build:img task
    });
    watch([path.src.vendors_by_bower, path.src.vendors_by_hands], function() { // watch folder with vendors components
        gulp.start('build:vendors'); // run build:vendors task
    });
});



/////////////////////////////////////////////////////////////////////////////
// CLEAN PRODUCTION

gulp.task('clean', function () {
    return gulp.src(path.clean) // get build folder
        .pipe(rimraf()); // erase all
});



/////////////////////////////////////////////////////////////////////////////
// DEFAULT TASK

gulp.task('default', ['build', 'watch', 'serve']);

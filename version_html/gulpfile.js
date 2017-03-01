'use strict';

/*
 * CLEAN UI ADMIN TEMPLATE GULP FILE
 */

/////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

var cleanui = {
    "version": "2.0.0",
    "templateName": "Clean UI Admin Template Modular",
    "pageTitle": "Clean UI Admin Template Modular",
    "description": "Clean UI – a modern professional admin template, based on Bootstrap 4 framework. Clean UI is a powerful and super flexible tool, which suits best for any kind of web application: Web Applications; CRM; CMS; Admin Panels; Dashboards; etc.",
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
    mergeStream = require('merge-stream'),
    wrap = require('gulp-wrap'),
    template = require('gulp-template'),
    data = require('gulp-data'),
    print = require('gulp-print'),
    replace = require('gulp-replace-task'),
    reload = browserSync.reload,
    fs = require('fs');



/////////////////////////////////////////////////////////////////////////////
// GULP PATHS

var path = {
    src: {
        versions: 'src/templates/versions/',
        structure: 'src/templates/structure/**/*.*',
        
        modules: 'src/modules/',

        img: 'src/modules/**/img/**/*.*',
        fonts: 'src/modules/**/fonts/**/*.*',
        css: 'src/modules/**/css/**/*.*',
        js: 'src/modules/**/js/**/*.*',
        templates: 'src/modules/**/templates/**/*.*',
        txt: 'src/modules/**/*.txt',
        favicon: 'src/modules/core/img/favicon.ico',

        vendors_by_bower: 'src/vendors/by_bower/**/*.*',
        vendors_by_hands: 'src/vendors/by_hands/**/*.*'
    },
    build: {
        versions: 'dist/versions/',

        modules: 'dist/modules/',
        vendors: 'dist/vendors/',
        structure: 'dist/structure'
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

var config = {
    server: {
        baseDir: "./dist/", // base dir path
        directory: true // show as directory
    },
    tunnel: false, // tunnel
    host: 'localhost', // host
    port: 9000, // port
    logPrefix: "frontend", // console log prefix
    files: ['./dist/modules/**/*', './dist/versions/**/*'], // files path for changes watcher
    watchTask: true // watcher on/off
};

gulp.task('serve', function () {
    browserSync(config); // run BrowserSync
});


/////////////////////////////////////////////////////////////////////////////
// BUILD STRUCTURE

gulp.task('build:structure', function () {

    var tasks = [];

    var arrayHtml = fs.readdirSync(path.src.versions).filter(function(e) { return e !== '_head.html' }); //  get template versions path excluding _head.html
    for (var i in arrayHtml) {
        tasks.push(
            gulp.src(path.src.structure) // get structure templates
                .pipe(ignore.exclude('**/_head.html')) // exclude mixins.scss file
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
                .pipe(gulp.dest(path.build.versions + arrayHtml[i].replace('.html',''))) // copy generated pages to build folder
                .pipe(reload({stream: true})) // reload BrowserSync
        )
    }

    return mergeStream(tasks);
});



/////////////////////////////////////////////////////////////////////////////
// VENDORS BUILD

gulp.task('build:vendors', function() {
    return gulp.src([path.src.vendors_by_bower, path.src.vendors_by_hands]) // get folders with vendors components
        .pipe(gulp.dest(path.build.vendors)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT BUILD

gulp.task('build:js', function () {
    return gulp.src(path.src.js, {base: path.src.modules}) // get folder with js
        .pipe(gulp.dest(path.build.modules)) // copy to destination folder
        .pipe(reload({stream: true})); // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// STYLES BUILD

gulp.task('build:css', function () {
    return gulp.src(path.src.css, {base: path.src.modules}) // get folder with css
        .pipe(ignore.exclude('**/mixins.scss')) // exclude mixins.scss file
        .pipe(sass({outputStyle: 'expanded', indentWidth: 4})) // css formatting
        .on('error', printError) // print error if found
        .pipe(autoprefix({
            browsers: ['last 30 versions', '> 1%', 'ie 9'],
            cascade: true
        })) // add cross-browser prefixes
        .pipe(gulp.dest(path.build.modules))  // copy sources
        .pipe(reload({stream: true})); // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// IMAGES BUILD

gulp.task('build:img', function () {
    gulp.src(path.src.img, {base: path.src.modules}) // get folder with images
        .pipe(ignore.exclude('**/favicon.ico')) // exclude favicon.css file
        .on('error', printError) // print error if found
        .pipe(gulp.dest(path.build.modules)); // copy to destination folder

    gulp.src(path.src.favicon, {base: path.src.modules}) // get favicon
        .pipe(gulp.dest(path.build.modules)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// FONTS BUILD

gulp.task('build:fonts', function() {
    return gulp.src(path.src.fonts, {base: path.src.modules}) // get folder with fonts
        .pipe(gulp.dest(path.build.modules)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// MODULES TEMPLATE BUILD

gulp.task('build:templates', function() {
    return gulp.src(path.src.templates, {base: path.src.modules}) // get folder with fonts
        .pipe(gulp.dest(path.build.modules)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// README.TXT COPY

gulp.task('build:txt', function() {
    return gulp.src(path.src.txt, {base: path.src.modules}) // get folder with fonts
        .pipe(gulp.dest(path.build.modules)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// GLOBAL BUILD

gulp.task('build', [
    'build:structure', // run build:html task
    'build:css', // run build:css task
    'build:js', // run build:js task
    'build:fonts', // run build:fonts task
    'build:img', // run build:img task
    'build:txt', // run build:txt task
    'build:templates', // run build:templates task
    'build:vendors' // run build:vendors task
]);



/////////////////////////////////////////////////////////////////////////////
// FILES CHANGE WATCHER

gulp.task('watch', function(){
    watch([path.src.structure, path.src.versions, path.src.templates], function() { // watch components, components, versions and templates folders
        gulp.start('build:structure'); // run build:structure task
        gulp.start('build:templates'); // run build:templates task
    });
    watch([path.src.css], function() { // watch css folder
        gulp.start('build:css'); // run build:css task
    });
    watch([path.src.js], function() { // watch js folder
        gulp.start('build:js'); // run build:js task
    });
    watch([path.src.fonts], function() { // watch fonts folder
        gulp.start('build:fonts'); // run build:fonts task
    });
    watch([path.src.img], function() { // watch img folder
        gulp.start('build:img'); // run build:img task
    });
    watch([path.src.txt], function() { // watch txt files
        gulp.start('build:txt'); // run build:txt task
    });
    watch([path.src.vendors_by_bower, path.src.vendors_by_hands], function() { // watch folder with vendors components
        gulp.start('build:vendors'); // run build:vendors task
    });
});



/////////////////////////////////////////////////////////////////////////////
// STRUCTURE COMPILATION

gulp.task('build:structure:compile', function () {
    return gulp.src(path.src.structure)
        .pipe(data({
            templateName: cleanui.templateName,
            pageTitle: cleanui.pageTitle,
            productVersion: cleanui.version
        })) // set variables
        .pipe(template()) // replace DATA variables
        .pipe(rigger()) // include component templates to generated pages
        .pipe(gulp.dest(path.build.structure)); // copy pages from pages folder to angular version build folder
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


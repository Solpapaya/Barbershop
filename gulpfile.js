const { src, dest, watch , parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/img/**/*'
}

// Function that compiles SASS
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('./build/css') );
}

// Function that concatenates separate JavaScript files in one single file
// here, the new file will be called 'bundle.js'
function javaScript() {
    return src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js')) // final output file name
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./build/js'))
}

// Function that minifies the images 
function images() {
    return src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('build/img'))
}

// Function that converts images to webp format
function imagesWebp() {
    return src(paths.images)
        .pipe( webp() )
        .pipe(dest('build/img'))
}

/* Function that listens permanently for changes in SASS and JavaScript files. If a change has
been made it executes the compilation again.
It also watches if a new image is added to the image folder, if a new image is added to the
img folder it executes de images and imagesWebp function to convert and minify the 
new image */
function watchFiles() {
    watch( paths.scss, css );
    watch( paths.js, javaScript );
    watch( paths.images, images );
    watch( paths.images, imagesWebp );
}
  
exports.css = css;
exports.watchFiles = watchFiles;
exports.default = parallel(css, javaScript,  images, imagesWebp, watchFiles); 
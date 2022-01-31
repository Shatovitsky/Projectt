const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
/* const uglify = require('gulp-uglify-es').default; */


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}


/* function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
        .pipe(concat(main.min.js))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
} */
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

/* function build() {
    return src([
        'app/css/style.css',
        'app/fonts/**//* *', */
/*         'app/js/main.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
} 
 */


function watching() {
    watch(['app/scss/**/*.scss'], styles);
    /* watch(['app/js/main.js', '!app/js/main.min.js'], scripts); */
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
/* exports.scripts = scripts; */
/* exports.build = build; */
exports.default = parallel(browsersync, watching);
const { src, series, dest, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const cleanDist = () => src('./dist', {read: false}).pipe(clean());

const build = () =>  {
  return src('./app/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['cover 99.5%']))
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist'));
};

const html = () => src('./app/index.html').pipe(dest('./dist'));

const serve = () => {
  browserSync.init({
        server: "./dist"
    });
  watch('./app/*.scss', series(cleanDist, html, build)).on('change', browserSync.reload)
};

const deploy = () => series(html, build);

exports.deploy = deploy;
exports.serve = serve;
exports.build = build;
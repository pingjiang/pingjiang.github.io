const { src, dest, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const del = require('del');
const path = require('path');

const base = 'themes/matery/src';
const target = 'themes/matery/source';

const config = {
  fonts: [
    'libs/awesome/fonts/*',
  ],
  img: [
    'libs/lightGallery/img/*',
  ],
  css: [
    'libs/awesome/css/font-awesome.min.css',
    'libs/materialize/materialize.min.css',
    'libs/aos/aos.css',
    'libs/animate/animate.min.css',
    'libs/lightGallery/css/lightgallery.min.css',
    // 'libs/aplayer/APlayer.min.css',
    // 'libs/dplayer/DPlayer.min.css',
    // 'libs/gitalk/gitalk.css',
    // 'libs/jqcloud/jqcloud.css',
    'libs/tocbot/tocbot.css',
    path.resolve(__dirname, 'node_modules/prismjs/themes/prism-tomorrow.css'),

    'css/matery.css',
    'css/my.css',
  ],
  js: [
    'libs/jquery/jquery-2.2.0.min.js',
    'libs/materialize/materialize.min.js',
    'libs/masonry/masonry.pkgd.min.js',
    'libs/aos/aos.js',
    // 'libs/scrollprogress/scrollProgress.min.js',
    // 'libs/lightGallery/js/lightgallery-all.min.js',
    // 'libs/others/clicklove.js',
    // 'libs/others/busuanzi.pure.mini.js',
    // 'libs/aplayer/APlayer.min.js',
    // 'libs/dplayer/DPlayer.min.js',
    // 'libs/cryptojs/crypto-js.min.js',
    // 'libs/echarts/echarts.min.js',
    // 'libs/gitalk/gitalk.min.js',
    // 'libs/jqcloud/jqcloud-1.0.4.min.js',
    'libs/tocbot/tocbot.min.js',
    'js/search.js',
    'js/matery.js'
  ],
};

function withBase(items) {
  return items.map(v => v[0] !== '/' ? `${base}/${v}` : v);
}

function copyFonts() {
  return src(withBase(config.fonts))
    .pipe(dest(`${target}/fonts`))
}

function copyImg() {
  return src(withBase(config.img))
    .pipe(dest(`${target}/img`))
}

function js() {
  return src(withBase(config.js))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(dest(`${target}/js`))
}

function css() {
  return src(withBase(config.css))
    .pipe(concat('bundle.css'))
    // .pipe(csso())
    .pipe(dest(`${target}/css`))
}

function clean() {
  return del([`${target}/css/bundle.css`, `${target}/js/bundle.js`]);
}

const assets = parallel(copyFonts, copyImg);

exports.js = js;
exports.css = css;
exports.assets = assets;
exports.clean = clean;
exports.default = parallel(js, css, assets);

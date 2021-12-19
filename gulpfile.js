/**
 * Reference: https://www.typescriptlang.org/docs/handbook/gulp.html
 */

const browserify = require("browserify");
const del = require("del");
const fancy_log = require("fancy-log");
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const watchify = require("watchify");

const paths = {
  pages: ["src/views/*.html"],
};

const watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
)

function browserifyBundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
}

function bundle(cb) {
  browserifyBundle();
  cb();
}

function copyHtml(cb) {
  // `src` creates a stream for reading file objects
  gulp.src(paths.pages).pipe(gulp.dest("dist"));
  cb();
}

async function clean(cb) {
  await del(["./dist/**/*"]);
  cb();
}

exports.default = gulp.series(clean, gulp.parallel(
  copyHtml, 
  bundle
));
watchedBrowserify.on("update", browserifyBundle);
watchedBrowserify.on("log", fancy_log);

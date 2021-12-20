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
const livereload = require("gulp-livereload");

const paths = {
  pages: ["src/views/*.html"],
};

function bundle(cb) {
  livereload.listen();

  const watchedBrowserify = watchify(
    browserify({
      basedir: ".",
      debug: true,
      entries: ["src/ts/main.ts"],
      cache: {},
      packageCache: {},
    }).plugin(tsify)
  );
  watchedBrowserify.on("update", defaultTask);
  watchedBrowserify.on("log", fancy_log);

  watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
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

defaultTask = gulp.series(clean, gulp.parallel(
  copyHtml, 
  bundle
));

exports.default = defaultTask;

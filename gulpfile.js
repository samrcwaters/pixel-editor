/**
 * Reference: https://www.typescriptlang.org/docs/handbook/gulp.html
 */

const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const del = require("del");
const paths = {
  pages: ["src/views/*.html"],
};

function copyHtml(cb) {
  // `src` creates a stream for reading file objects
  gulp.src(paths.pages).pipe(gulp.dest("dist"));
  cb();
}

async function clean(cb) {
  await del(["./dist/**/*"]);
  cb();
}

function browserifySrc(cb) {
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
  cb();
}

exports.default = gulp.series(clean, gulp.parallel(copyHtml, browserifySrc));

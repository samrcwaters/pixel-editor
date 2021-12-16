/**
 * Reference: https://techblog.topdesk.com/coding/front-end-with-typescript-tutorial-step-6-gulp/
 */

const gulp = require("gulp");
const browserify = require("browserify");
const watchify = require("watchify");
const errorify = require("errorify");
const del = require("del");
const source = require("vinyl-source-stream");

function createBrowserifier(entry) {
  return browserify({
    basedir: ".",
    debug: true,
    entries: [entry],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .plugin(watchify)
    .plugin(errorify);
}

function bundle(browserifier, bundleName, destination) {
  return browserifier
    .bundle()
    .pipe(source(bundleName))
    .pipe(gulp.dest(destination));
}

async function clean(cb) {
  await del(["./src/javascript/**/*"]);
  cb();
}

function tscBrowserifySrc(cb) {
  bundle(createBrowserifier("./src/typescript/main.ts"), "bundle.js", "javascript");
  cb();
}

// function defaultTask(cb) {
//   runSequence(["clean", "installTypings"], "tsc-browserify-src", () => {
//     console.log("Watching...");
//     gulp.watch(["./src/typescript/**/*.ts"], ["tsc-browserify-src"]);
//   });
//   cb();
// }

exports.clean = clean;

exports.default = gulp.series(
  clean,
  tscBrowserifySrc
);

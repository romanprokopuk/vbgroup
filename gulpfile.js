let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer");

// app/scss/main.scss > app/css/main.css, compressed, rename  and return true for browser-sync
gulp.task("scss", function () {
  return gulp
    .src("./app/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

// app/**/*.html and return true for browser-sync
gulp.task("html", function () {
  return gulp.src("./app/**/*.html").pipe(browserSync.reload({ stream: true }));
});

// app/js/**/*.js and return true for browser-sync
gulp.task("script", function () {
  return gulp
    .src("./app/js/**/*.js")
    .pipe(browserSync.reload({ stream: true }));
});

//node_modules/../...js concat and uglify and return true for browser-sync
gulp.task("js", function () {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/slick-slider/slick/slick.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

// local server
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./app/",
    },
  });
});

//watch scss, html, js
gulp.task("watch", function () {
  gulp.watch("./app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("./app/**/*.html", gulp.parallel("html"));
  gulp.watch("./app/js/**/*.js", gulp.parallel("script"));
});

// gulp default
gulp.task("default", gulp.parallel("scss", "js", "browser-sync", "watch"));

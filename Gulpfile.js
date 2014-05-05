///////////////////////////////////////////
// DEPENDENCIES
///////////////////////////////////////////

var gulp = require('gulp');
var karma = require('gulp-karma')({
  configFile: 'test/karma.conf.js'
});
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var karma = require('gulp-karma');
var rimraf = require('gulp-rimraf');
var protractor = require("gulp-protractor").protractor;
var express = require('express');


///////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/app';
var LIVERELOAD_PORT = 35729;

var FILES_TO_WATCH = [
  'app/app.js',
  'app/index.html',
  'app/css/*.css',
  'app/scripts/**/*.js',
  'app/views/**/*.html',
  'test/**/*.js'
];

var TEMPLATE_FILES = [
  'app/views/*.html',
  'app/views/**/*.html'
];


///////////////////////////////////////////
// HELPERS
///////////////////////////////////////////

var app = express();
var server;
function startExpress() {
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  server = app.listen(EXPRESS_PORT);
}

function stopExpress() {
  server.close();
}

var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  lr.changed({body: {files: [fileName]}});
}


///////////////////////////////////////////
// GULP TASKS
///////////////////////////////////////////

gulp.task('clean', function() {
  return gulp.src('./dist', {read: false}).pipe(rimraf({force: true}));
});

gulp.task('live', function () {
  startExpress();
  startLivereload();
  gulp.watch(FILES_TO_WATCH, notifyLivereload);
});

gulp.task('build', ['clean'], function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [ngmin(), uglify()]
    }))
    .pipe(gulp.dest('dist/'));
  gulp.src(TEMPLATE_FILES).pipe(gulp.dest('dist/views'));
  gulp.src('./app/css/**/*').pipe(gulp.dest('dist/css'));
  gulp.src('./app/css/*.ttf').pipe(gulp.dest('dist'));
  gulp.src('./app/css/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('unit', function() {
  return karma.once();
});

gulp.task('listen', function() {
  startExpress();
});

gulp.task('_e2e', function() {
  return gulp.src(["./test/e2e/*.js"])  // return makes it synchronous
    .pipe(protractor({
      configFile: "test/protractor.config.js"
    }))
    .on('error', function(e) { throw e });
});

gulp.task('e2e', ['listen', '_e2e'], function() {
  return stopExpress();
});

gulp.task('test', ['unit', 'e2e']);

gulp.task('watch', function() {
  // Start a karma server, run tests, then watch with karma
  return karma.start({
    autoWatch: true
  });
});

gulp.task('default', ['test']);
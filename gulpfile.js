const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps')

gulp.task('server', function() {
    browserSync.init({
      server: {
        port: 9000,
        baseDir: "public"
      }
    });
  
    gulp.watch('public/**/*').on('change', browserSync.reload);
  });

  gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('public'))
  });

  gulp.task('styles:compile', function () {
    return gulp.src('source/styles/styles.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('public/css'));
  });


  gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*')
      .pipe(gulp.dest('public/images'));
  });

gulp.task('copy:fonts', function() {
  return gulp.src('./source/fonts/**/*.*')
    .pipe(gulp.dest('public/fonts'));
});


gulp.task('scripts', function () {
  return gulp.src([
    'source/ts/comment.ts',
    'source/ts/form.ts',
    'source/ts/navigation.ts'
  ]).pipe(ts({
          noImplicitAny: true,
          outFile: 'main.min.js'
      }))
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/js'));
});

  gulp.task('clean', function del(cb) {
    return rimraf('public', cb);
  });

  gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

  gulp.task('watch', function() {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/ts/**/*.ts', gulp.series('scripts'));
  });

  gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'copy', 'scripts'),
    gulp.parallel('watch', 'server')
    )
  );
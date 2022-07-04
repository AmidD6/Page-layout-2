const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const rimraf = require('rimraf');

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

  gulp.task('clean', function del(cb) {
    return rimraf('public', cb);
  });

  gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

  gulp.task('watch', function() {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    // gulp.watch('source/js/**/*.js', gulp.series('js'));
  });

  gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'copy'),
    gulp.parallel('watch', 'server')
    )
  );
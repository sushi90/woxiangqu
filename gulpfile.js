/**
 * Created by mdemo on 14-3-27.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var paths = {
    scripts: ['public/javascript/*', '!public/javascript/ace'],
    images: 'public/imgages/*.jpg'
};
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/js'));
});


gulp.task('default', ['scripts']);
var gulp = require('gulp');
var del = require('del');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('clean', function () {
    return del([
        '../LiveGreen/wwwroot/LiveGreen'
    ], {force:true});
});

gulp.task('deploy',
    ['clean'],
    function () {
        gulp.src(['dist/*.*'])
            .pipe(gulp.dest('../LiveGreen/wwwroot/LiveGreen'));
        gulp.src(['dist/assets/*.*'])
            .pipe(gulp.dest('../LiveGreen/wwwroot/LiveGreen/assets'));
    });


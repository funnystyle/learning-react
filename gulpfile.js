var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        browser: ["chrome", "firefox", "iexplore"],
        server: {
            baseDir: ''
        },
        port: 3000
    })
})

// Dev task with browserSync
gulp.task('default', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('**/*.js', browserSync.reload);
});

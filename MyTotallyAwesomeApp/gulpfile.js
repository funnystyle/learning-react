var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var jsFiles = {
    vendor: [
    ],
    source: [
        'src/index.jsx'
    ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
    return gulp.src(jsFiles.source)
               .pipe(eslint({
                   baseConfig: {
                       "ecmaFeatures": {
                           "jsx": true
                       }
                   }
               }))
               .pipe(eslint.format())
               .pipe(eslint.failAfterError());
});

gulp.task('webpack', function() {
    return gulp.src(jsFiles.source)
               .pipe(webpack(webpackConfig))
               .pipe(gulp.dest('dist'));
});

// Run everything
gulp.task('default', ['eslint', 'webpack']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        browser: ["chrome"], //  "iexplore", "firefox"
        server: {
            baseDir: ''
        },
        port: 3000
    });
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'eslint', 'webpack'], function() {
    gulp.watch('src/**/*.jsx', ['webpack']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('dist/**/*.js', browserSync.reload);
});

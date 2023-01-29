// import crypto from 'crypto';
// const buffer = crypto.publicDecrypt(publicKey, encrypted);

// import gulp from 'gulp';
// import gulpSassModule from 'gulp-sass';
// import sass from 'sass';
// const gulpSass = gulpSassModule(sass);
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';

const gulp = require('gulp');
// const babel = require('gulp-babel');
const gulpSass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');

gulp.task('css', function(){
    console.log("minifying css.........");
    gulp.src('./assets/sass/**/*.scss')
    .pipe(gulpSass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    // return gulp.src('./assets/**/*.css')
    // .pipe(rev())
    // .pipe(gulp.dest('./public/assets'))
    // .pipe(rev.manifest({
    //     cwd: publicDecrypt,
    //     merge: true
    // }))
    // .pipe(gulp.dest('./public/assets'));

    return gulp.src('./assets/**/*.css')
    .pipe(gulp.dest('./public/assets'))
    .pipe(gulp.dest('./public/assets'));
});

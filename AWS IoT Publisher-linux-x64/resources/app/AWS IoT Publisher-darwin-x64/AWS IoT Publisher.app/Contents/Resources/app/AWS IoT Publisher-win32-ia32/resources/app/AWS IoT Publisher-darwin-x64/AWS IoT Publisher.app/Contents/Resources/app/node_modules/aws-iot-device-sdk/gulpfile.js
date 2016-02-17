/*jshint node:true*/
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    mocha = require('gulp-mocha'),
    cover = require('gulp-coverage'),
    jscs = require('gulp-jscs');

gulp.task('default', ['test']);

gulp.task('test', ['jshint'], function() {
  console.log('Running unit tests');
  return gulp.src(['test/*unit-tests.js'], {read: false})
    .pipe(cover.instrument({
	pattern: ['common/lib/*.js','device/**/*.js','thing/*.js','index.js'],
	debugDirectory: 'debug'
    }))
    .pipe(mocha({
      reporter: 'spec',
      globals: {}
    }))
    .pipe(cover.gather())
    .pipe(cover.format())
    .pipe(gulp.dest('reports'))
    .once('end', function() {
      process.exit();
    });
});

gulp.task('jshint', function() {
  console.log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(['common/lib/*.js','examples/**/*.js', 'device/**/*.js','thing/*.js','index.js', '!node_modules/**/*.js', '!examples/**/node_modules/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs());
});

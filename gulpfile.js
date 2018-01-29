var gulp = require('gulp');
var exec = require('child_process').exec;
nodemon = require('gulp-nodemon');

//watch = require('gulp-watch');

gulp.task('default',['nodemon'], function (cb) {
  
  var client = ['build'];  
  gulp.watch('src/**/*.*',client);  

});

gulp.task('nodemon',['build'],function() {

  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('build',function (cb) {
  return exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err); 
  });
});


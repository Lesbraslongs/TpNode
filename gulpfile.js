var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');


var nodemonOptions = {
    script: '../server/app/server.js',
    ext: 'js',
    env: {'NODE_ENV': 'development'},
    verbose: false,
    ignore: [],
    watch: ['server/app/*']
};
gulp.task('start', function (callback) {
    runSequence(
        'install-dep',
        'install-server',
        'install-front',
        ['start-mongo',
            'start-server',
            'start-angular'],
        callback);
});

gulp.task('start-dev', function (callback) {
    runSequence(
        'install-server',
        'install-front',
        ['start-mongo',
            'start-server',
            'start-angular'],
        callback);
});

let dirs = {
    server: 'server/',
    front: './../front/'
};

gulp.task('install-dep', function (done) {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done);
});

process.chdir(dirs.server);
gulp.task('install-server', function (done) {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done);
});

process.chdir(dirs.front);
gulp.task('install-front', function (done) {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done)
});

gulp.task('start-mongo', function (done) {
    spawn('mongod.exe', {cwd: 'C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\', stdio: 'inherit'})
        .on('close', done);
});

gulp.task('start-server', function () {
    nodemon(nodemonOptions)
        .on('restart', function () {
            console.log('restarted!')
        });
});

gulp.task('start-angular', function (done) {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {stdio: 'inherit'})
        .on('close', done);
});
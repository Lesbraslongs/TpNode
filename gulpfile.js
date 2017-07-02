let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let spawn = require('child_process').spawn;
let runSequence = require('run-sequence');


let nodemonOptions = {
    script: '../server/app/server.js',
    ext: 'js',
    env: {'NODE_ENV': 'development'},
    verbose: false,
    ignore: [],
    watch: ['../server/app/*']
};

gulp.task('start', (callback) => {
    runSequence(
        'install-dep',
        'install-server',
        'install-front',
        ['start-mongo',
            'start-server',
            'start-angular'],
        callback);
});

gulp.task('start-dev', (callback) => {
    runSequence(
        'install-server-dev',
        'install-front-dev',
        ['start-mongo',
            'start-server',
            'start-angular'],
        callback);
});

gulp.task('start-services', (callback) => {
    runSequence(
        ['start-mongo',
            'start-server',
            'start-angular'],
        callback);
});

gulp.task('tests', (callback) => {
    runSequence(
        ['install-dep',
        'install-server-dev',
        'install-front-dev'],
        'test',
        callback);
});

let dirs = {
    server: 'server/',
    front: './../front/'
};

gulp.task('install-dep', (done) => {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('install-server-dev',  (done) => {
    process.chdir(dirs.server);
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install','--dev'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('install-front-dev',  (done) => {
    process.chdir(dirs.front);
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install','--dev'], {stdio: 'inherit'})
        .on('close', done)
});

gulp.task('install-server',  (done) => {
    process.chdir(dirs.server);
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('install-front',  (done) => {
    process.chdir(dirs.front);
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {stdio: 'inherit'})
        .on('close', done)
});

gulp.task('start-mongo',  (done) => {
    spawn('mongod.exe', {cwd: 'C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\', stdio: 'inherit'})
        .on('close', done);
});

gulp.task('start-server', () => {
    nodemon(nodemonOptions)
        .on('restart', () => {
            console.log('restarted!')
        });
});

gulp.task('start-angular', (done) => {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('test',  (done) => {
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['test'], {stdio: 'inherit'})
        .on('close', done)
});
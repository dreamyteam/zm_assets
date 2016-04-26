var gulp = require('gulp');
var sass = require('gulp-sass');

var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcss    = require('gulp-postcss');
// var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');


gulp.task('indexcss', function () {
    var scssSrc = './assets/scss/*.scss',
        cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];

    return gulp.src(['./assets/scss/index.scss'])
        .pipe(sass())
        .pipe(concat('index.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('searchrescss', function () {
    var cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];
    return gulp.src(['./assets/scss/searchresult.scss'])
        .pipe(sass())
        .pipe(concat('searchresult.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('programdetailpage', function () {
    var cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];
    return gulp.src(['./assets/scss/program_detail_page.scss'])
        .pipe(sass())
        .pipe(concat('program_detail_page.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('sidebar', function () {
    var cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];
    return gulp.src(['./assets/scss/sidebar.scss'])
        .pipe(sass())
        .pipe(concat('sidebar.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('rank', function () {
    var cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];
    return gulp.src(['./assets/scss/rank.scss'])
        .pipe(sass())
        .pipe(concat('rank_list.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('record', function () {
    var cssDst = './dist/css';
    var processors =[
        autoprefixer({ browsers: ['last 2 versions'] }),
        precss
    ];
    return gulp.src(['./assets/scss/record.scss'])
        .pipe(sass())
        .pipe(concat('record.css'))
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dist/') );
});

// 默认任务
gulp.task('default', function(){
    gulp.run('programdetailpage');
    // 监听文件变化
    gulp.watch('./assets/scss/*.scss', function(){
        gulp.run('programdetailpage');
    });
    gulp.watch('./assets/scss/components/*.scss', function(){
        gulp.run('programdetailpage');
    });
     gulp.watch('./assets/scss/common/*.scss', function(){
        gulp.run('programdetailpage');
    });
});
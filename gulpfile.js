let gulp = require('gulp');
let rename = require('gulp-rename');

//scss
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
//es6 ->es5
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let uglify = require('gulp-uglify')
//browser reload
let browserSync = require('browser-sync').create();
//let reload = browserSync.reload({stream:true});

const styleSrc =  'public/scss/style.scss';
const destStyle = 'public/css/'
const styleWatch = 'public/scss/**/*.scss'; //don't save files in the same directory of the source files

const jsSrc = 'index.js';
const jsFolder = 'public/js/';
const destJS = 'public/js/js-prod'
const jsWatch = 'public/js/*.js';  //don't save files in the same directory of the source files
const jsFiles = [jsSrc];

gulp.task('browser-sync',()=>{
    browserSync.init({
        server:{
            baseDir:'./',
            index:'index.html'
        },
        open:true,
        injectChanges:true,
    })
})

// every task returns a promise no matter which
gulp.task('scss',()=>{
    return new Promise((resolve,reject)=>{
        gulp.src(styleSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole:true,
            outputStyle:'compressed',
        }))
        .on('error',console.error.bind(console))
        .pipe(autoprefixer({
            browsers:['last 5 versions'],
            cascade:false,
        }))
        .pipe(rename({suffix:'-min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destStyle))
        .pipe(browserSync.stream());
        resolve('done');
    })
   
});
gulp.task('js',()=>{
    return new Promise((res,rej)=>{
        jsFiles.map((entry)=>{
            return browserify({     //translating modules
                entries:[jsFolder+entry],
            })
            .transform(babelify,{  //changing to the standard format
                presets:["@babel/preset-env"]
            })
            .bundle() //sending to one stream(bundling to 1 file)
            .pipe(source(entry)) //tucking
            .pipe(rename({extname:'.min.js'}))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps:true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destJS))
            .pipe(browserSync.stream());
        })
        res();
    });
})

gulp.task('default',gulp.series('scss','js'))

gulp.task('watch',gulp.series('default',/*'browser-sync',*/()=>{
    return new Promise((res,rej)=>{
        gulp.watch(styleWatch,gulp.series('scss')) //the 2ond argument must be a function passed by gulp.series

        gulp.watch(jsWatch,gulp.series('js'))
       
        res();
    })
    
}))
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({}),
    browserSync = require('browser-sync');
        
var dir = {
  public : './public'
}
    
var paths = {
  app : './', // parent directory
  publApp : dir.public+'/', // public directory
  
  // directories to watch
  htmlAll : ['./html/**/*.*'],
  lessAll : ['./less/**/*.less'],
  
  // files to compilate
  ejs : ['./html/*.ejs'],
  less: ['./less/main.less'],
  
  js : [
    './js/app/**.js',
    './js/plugins/**/*.js'
  ],
  
  img : {
    all : ['./img-dsgn/**', './img/**'],
    dsgn : ['./img-dsgn/**'],
    cnt : ['./img/**']
  },
  
  fonts : [
    // 'bower_components/bootstrap/fonts/**/*.*',
    // 'bower_components/fontawesome/fonts/**/*.*'
  ],
  
  // distributive/public folder
  public : {
    html : dir.public+'/',
    htmlMin : dir.public+'/html-min/',
    css: dir.public+'/css/',
    js: dir.public+'/js/',
    jsVendor: dir.public+'/js/',
    img : dir.public+'/img/',
    dsgn : dir.public+'/img-dsgn/',
    fonts : dir.public+'/fonts/'
  },
  
  clear : {
    html : [dir.public+'/*.html', dir.public+'/html/**'],
    css : [dir.public+'/css/'],
    js : [dir.public+'/js/**'],
    img : [dir.public+'/img/**'],
    imgDsgn : [dir.public+'/img-dsgn/**'],
  },
  
  vendor : [
    'js/vendor/**/*.*',
    'js/vendor/*.*'
    // 'bower_components/jquery/dist/jquery.min.**',
    // 'bower_components/modernizr/modernizr.js'
  ]
  
};



// Clean public text files
gulp.task('clean-html', function() {
  // gulp.src(paths.clear.html, { read: false })
  //   .pipe(plugins.rimraf());
});
gulp.task('clean-css', function() {
  // gulp.src(paths.clear.css, { read: false })
  //   .pipe(plugins.rimraf());
});
gulp.task('clean-js', function() {
  // gulp.src(paths.clear.js, { read: false })
  //   .pipe(plugins.rimraf());
});
// Clean public images
gulp.task('clean-imgCnt', function() {
  // gulp.src(paths.public.img, { read: false })
  //   .pipe(plugins.rimraf());
});
gulp.task('clean-imgDsgn', function() {
  // gulp.src(paths.public.dsgn, { read: false })
  //   .pipe(plugins.rimraf());
});



gulp.task('fonts', function () {
  gulp.src(paths.fonts)
    .pipe(plugins.clone())
    .pipe(gulp.dest(paths.public.fonts))
});
  
  

// LESS task
gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      paths: paths.lessAll
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.public.css))
    .pipe(plugins.filter('**/*.css'))
    // reloads main.css file
    .pipe(browserSync.reload({stream:true}))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'LESS compiled!'
    }))
});

// HTML
gulp.task('ejs', function() {
  gulp.src(paths.ejs)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.ejs())
    .pipe(gulp.dest(paths.public.html))
    .pipe(browserSync.reload({stream:true}))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'HTML compiled!'
    }));
});

// JS 
gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.jshint('.jshintrc'))
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'))
    .pipe(plugins.concat('all.js'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.public.js))
    .pipe(browserSync.reload({stream:true}))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'JS compiled!'
    }))
});


// Vendor task
gulp.task('vendor-js', function() {
  var 
    jsFilter = plugins.filter(['*.js']),
    nojsFilter = plugins.filter(['!*.js']);
  
  gulp.src(paths.vendor)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jsFilter)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify({mangle: false}))
    .pipe(jsFilter.restore())
    .pipe(nojsFilter)
    .pipe(nojsFilter.restore())
    .pipe(gulp.dest(paths.public.jsVendor))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'Vendor JS compiled!'
    }));
});

// Images
gulp.task('img-cnt', function(){
  gulp.src(paths.img.cnt)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    // .pipe(plugins.cached())
    .pipe(plugins.imagemin({
      // optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest(paths.public.img))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'Cnt images compiled!'
    }));
})
gulp.task('img-dsgn', function(){
  gulp.src(paths.img.dsgn)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    // .pipe(plugins.cached())
    .pipe(plugins.imagemin({
      // optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest(paths.public.dsgn))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'Dsgn images compiled!'
    }));
})



// Watch
gulp.task('watch', function() {
  gulp.watch(paths.lessAll, ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.htmlAll, ['ejs']);
  gulp.watch(paths.vendor.js, ['vendor-js']);
  gulp.watch(paths.img.cnt, ['img-cnt']);
  gulp.watch(paths.img.dsgn, ['img-dsgn']);
});



// Livereload, sync and local server
gulp.task('bs-sync', function() {
  notify: true,
  browserSync({
    proxy: "hackday.io",
    logLevel: "debug",
    logPrefix: "BrowserSync"
  });
});


// Production version compilation
gulp.task('tx-production', function(){
  
  // LESS Production
  gulp.src(paths.less)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      paths: paths.lessAll
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.public.css))
    // minify
    .pipe(plugins.clone())
    .pipe(plugins.csso())
    .pipe(plugins.rename({suffix: '.min'}))
    // writing sourcemaps
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.public.css))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'LESS for Production compiled!'
    }));
    
  // JS Production
  gulp.src(paths.js)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.concat('all.js'))
    .pipe(gulp.dest(paths.public.js))
    // minify
    .pipe(plugins.clone())
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public.js))
    .pipe(plugins.notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'JS for Production compiled!'
    }));
    
});



// cleaners
gulp.task('clean-tx', ['clean-hmtl', 'clean-js', 'clean-css']);
gulp.task('clean-img', ['clean-imgCnt', 'clean-imgDsgn']);

// images
gulp.task('img', ['clean-img', 'img-cnt', 'img-dsgn']);

// regular build
gulp.task('build', ['less', 'js', 'vendor-js', 'ejs']);
// production build
gulp.task('production', ['tx-production', 'img', 'fonts', 'vendor-js']);

// default
gulp.task('default', ['watch', 'build', 'bs-sync']);
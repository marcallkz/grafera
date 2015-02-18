var gulp = require("gulp"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	browserSync = require("browser-sync"),
	bower = require('gulp-bower'),
	plumber = require("gulp-plumber");

gulp.task("browser-sync", function() 
{
	browserSync({proxy: "grafera.localhost",port:8888});
});

gulp.task("css", function() 
{
	gulp.src("src/css/**/*.css").pipe(plumber()).pipe(cssmin()).pipe(concat("styles.min.css",{newLine:""})).pipe(gulp.dest("app/css")).pipe(browserSync.reload({stream:true}));
});

gulp.task("js", function() 
{
	gulp.src(["src/js/strict.js","src/js/**/*.js"]).pipe(plumber()).pipe(uglify({mangle:true})).pipe(concat("main.min.js",{newLine:""})).pipe(gulp.dest("app/js")).pipe(browserSync.reload({stream:true}));
});

gulp.task("bower", function() 
{
	return bower().pipe(gulp.dest("./bower_components"))
});

gulp.task("watch", function() 
{
	var log = function(event)
	{
		console.log("File " + event.path + " was " + event.type + ", running tasks...");
	}
	gulp.watch(["src/js/**/*.js"], ["js"]).on("change", log);
	gulp.watch(["src/css/**/*.css"], ["css"]).on("change", log);
	gulp.watch(["index.html"], ["js"]).on("change", log);
});

gulp.task("default", ["browser-sync","css","js","watch"]);
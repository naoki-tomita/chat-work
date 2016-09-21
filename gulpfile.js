var gulp = require( "gulp" ),
    webserver = require( "gulp-webserver" );

gulp.task( "webserver", function() {
  gulp.src( "" )
  .pipe( webserver( {
    host: "0.0.0.0",
    port: 8080
  } ) );
} );

gulp.task( "default", [ "webserver" ] )

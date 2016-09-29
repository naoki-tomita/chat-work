var gulp = require( "gulp" ),
    webserver = require( "gulp-webserver" ),
    ws = new require( "./server.js" ).websocket;

gulp.task( "webserver", function() {
  gulp.src( "" )
  .pipe( webserver( {
    host: "0.0.0.0",
    port: 8080
  } ) );
} );

gulp.task( "wsserver", function() {
  new ws();
} );

gulp.task( "default", [ "webserver", "wsserver" ] )

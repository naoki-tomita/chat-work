var webSocketServer = require( "websocket" ).server,
    http = require( "http" ),
    websocket, server, p;

websocket = function() {
  this.initializeServer();
  this.initializeWebSocketServer();
};

p = websocket.prototype;

p.initializeServer = function() {
  this.server = http.createServer( function( request, response ) {
    console.log( Date(), request.url );
    response.writeHead( 404 );
    response.end();
  } );
  this.server.listen( 10070, function() { console.log( Date(), "listning..." ) } );
};

p.initializeWebSocketServer = function() {
  var that = this;
  this.wsServer = new webSocketServer( {
    httpServer: this.server
  } );
  this.connections = [];
  this.wsServer.on( "request", function( request ) {
    var connection = request.accept( "chat-work-protocol", request.origin );
    connection.on( "message", function( message ) {
      that.broadcast( message.utf8Data );
    } );
    connection.on( "close", function() {
      that.broadcast( JSON.stringify( {
        name: connection.userName,
        message: "good bye!"
      } ) );
    } );
    that.connections.push( connection );
  } );
};

p.broadcast = function( message ) {
  for ( var i in this.connections ) {
    this.connections[ i ].sendUTF( message );
  }
};

module.exports.websocket = websocket;

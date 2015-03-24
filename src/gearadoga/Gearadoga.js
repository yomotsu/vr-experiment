
var Gearadoga = ( function () {

  var loader = new THREE.JSONLoader();
  var _geometry, _material;

  var Gearadoga = function ( scene ) {

    this.object = new THREE.Mesh( _geometry, _material );

  }

  Gearadoga.onready = function () {};
  Gearadoga.ready = false;

  loader.load( '/src/gearadoga/gearadoga.json', function ( geometry, materials ) {

    _geometry = geometry;
    _material = new THREE.MeshFaceMaterial( materials );
    Gearadoga.ready = true;
    Gearadoga.onready();

  } );

  return Gearadoga;

} )();

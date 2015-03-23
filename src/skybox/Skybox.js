
var Skybox = ( function () {

  var urls = [
    '/src/skybox/space_skybox_east.jpg',
    '/src/skybox/space_skybox_west.jpg',
    '/src/skybox/space_skybox_up.jpg',
    '/src/skybox/space_skybox_down.jpg',
    '/src/skybox/space_skybox_north.jpg',
    '/src/skybox/space_skybox_south.jpg'
  ];
  var materials = [];

  for ( var i = 0; i < 6; i ++ ) {

    materials.push( new THREE.MeshBasicMaterial( {
      map: THREE.ImageUtils.loadTexture( urls[ i ] ),
      side: THREE.BackSide,
      fog: false
    } ) );

  }

  var skyBoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  var skyBoxMaterial = new THREE.MeshFaceMaterial( materials );

  var Skybox = function ( size ) {

    this.object = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    this.object.scale.set( size, size, size );

  }

  return Skybox;

} )();

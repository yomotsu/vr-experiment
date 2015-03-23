var Cockpit = ( function () {

  var loader = new THREE.JSONLoader();

  var Cockpit = function () {

    THREE.EventDispatcher.prototype.apply( this );

    var that = this;
    this.object = new THREE.Object3D();
    this.object.rotation.y = THREE.Math.degToRad( 180 );
    this.cameraRecommendPosition = new THREE.Vector3( 0, 1, 0 );

    loader.load( '/src/cockpit/uc_mobuko.json', function( geometry, materials ) {

      var cockpit = new THREE.Mesh(
        geometry,
        // new THREE.MeshNormalMaterial()
        new THREE.MeshFaceMaterial( materials )
      );
      cockpit.position.set( 0, -.4, .1 );
      that.object.add( cockpit );

      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 2, 8, 8 ),
        new THREE.MeshBasicMaterial()
      );

      var mat = new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 22 ) );
      mat[ 7 ] = .5;
      sphere.geometry.applyMatrix( mat );

      var wireSphere = new THREE.EdgesHelper( sphere, 0xe68128 );
      that.object.add( wireSphere );

      that.dispatchEvent( { type: 'ready' } );

    } );

  }

  Cockpit.prototype.getEyePosition = function () {

    return new THREE.Vector3( 0, 1, 0 ).add( this.object.position );

  }

  return Cockpit;

} )();

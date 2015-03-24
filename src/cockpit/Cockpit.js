var Cockpit = ( function () {

  var loader = new THREE.JSONLoader();

  var Cockpit = function () {

    THREE.EventDispatcher.prototype.apply( this );

    var that = this;
    this.object = new THREE.Object3D();
    this.object.rotation.y = THREE.Math.degToRad( 180 );
    this.eyePosition = new THREE.Vector3( 0, 1.5, .1 );

    loader.load( '/src/cockpit/uc_mobuko.json', function( geometry, materials ) {

      var cockpit = new THREE.Mesh(
        geometry,
        // new THREE.MeshNormalMaterial()
        new THREE.MeshFaceMaterial( materials )
      );
      that.object.add( cockpit );

      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 2, 8, 8 ),
        new THREE.MeshBasicMaterial()
      );

      var mat1 = new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 22 ) );
      var mat2 = new THREE.Matrix4().makeTranslation( 0, 1, 0 );
      mat1.multiply( mat2 );

      sphere.geometry.applyMatrix( mat1 );

      var wireSphere = new THREE.EdgesHelper( sphere, 0xe68128 );
      that.object.add( wireSphere );

      that.dispatchEvent( { type: 'ready' } );

    } );

  }

  Cockpit.prototype.getEyePosition = function () {

    return this.eyePosition.clone().add( this.object.position );

  }

  return Cockpit;

} )();

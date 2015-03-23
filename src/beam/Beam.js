var Beam = ( function () {

  var LIFETIME = 2000;
  var COOLTIME = 1000;
  var audioType = !!( ( new Audio() ).canPlayType( 'audio/mp3;' ) ) ? 'mp3' : 'ogg';

  var i = 0;
  var beams = [];
  var nPlanes	= 4;
  var plane;
  var clock = new THREE.Clock();
  var lastShotTime = -COOLTIME * 0.001;
  var matrix = new THREE.Matrix4();

  var headGeometry = new THREE.PlaneBufferGeometry( .3, .3 );
  var bodyGeometry = new THREE.Geometry();

	for( i = 0; i < nPlanes; i ++ ){

    plane = new THREE.PlaneGeometry( 8, 1 );
    // console.log( 'Yes, I considered! ');
    matrix.makeRotationX( THREE.Math.degToRad( -i / nPlanes * 180 ) );
    plane.applyMatrix( matrix );
    bodyGeometry.merge( plane );

  }

  headGeometry.applyMatrix( matrix.makeTranslation( 0, 0, -4 ) );
  bodyGeometry.applyMatrix( matrix.makeRotationY( THREE.Math.degToRad( -90 ) ) );

  var headMaterial = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( '/src/beam/beam2.png' ),
    side		: THREE.DoubleSide,
    blending	: THREE.AdditiveBlending,
    depthWrite	: false,
    transparent	: true
  } );

  var bodyMaterial = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( '/src/beam/beam1.png' ),
    side : THREE.DoubleSide,
    blending : THREE.AdditiveBlending,
    depthWrite : false,
    transparent : true
  } );

  var se =  [ new Audio(), new Audio(), new Audio() ];
  var lastSeId = 0;

  se[ 0 ].src = '/src/beam/se.' + audioType;
  se[ 1 ].src = '/src/beam/se.' + audioType;
  se[ 2 ].src = '/src/beam/se.' + audioType;

  var Beam = function ( scene, position, direction, speed ) {

    this.deltaClock = new THREE.Clock();
    this.startTime = clock.getElapsedTime();

    if ( this.startTime < lastShotTime + COOLTIME * 0.001 ) {

      return;

    }

    lastShotTime = this.startTime;

    this.object = new THREE.Object3D();
    this.object.lookAt( direction );
    this.object.position.copy( position );

    this.direction = direction;
    this.speed = 30 + +speed;


  	var head = new THREE.Mesh(
      headGeometry,
      headMaterial
    );

    var body = new THREE.Mesh(
      bodyGeometry,
      bodyMaterial
    );

    this.object.add( head );
    this.object.add( body );

    scene.add( this.object );
    beams.push( this );
    se[ lastSeId ].play();
    lastSeId = ( lastSeId + 1 ) % 3;

  }

  Beam.prototype.update = function () {

    var now = clock.getElapsedTime();

    if ( LIFETIME < now - this.startTime ) {

      this.delete();
      return;

    };

    var distance = -this.speed * this.deltaClock.getDelta();

    this.object.position.sub( this.direction.clone().multiplyScalar( distance ) );

  }

  Beam.prototype.delete = function () {

    var i = l = 0;

    scene.remove( this.object.children[ 0 ] );
    scene.remove( this.object.children[ 1 ] );
    scene.remove( this.object );

    for ( i = 0, l = beams.length; i < l; i ++ ) {

      if ( beams[ i ] === this ) {

        beams.splice( i, 1 );
        break;

      }

    }

  }

  Beam.update = function () {

    var i = l = 0;

    for ( i = 0, l = beams.length; i < l; i ++ ) {

      if ( !!beams[ i ] ) {

        beams[ i ].update();

      }

    }

  }

  return Beam;

} )();

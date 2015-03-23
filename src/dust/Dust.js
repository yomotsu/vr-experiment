
var Dust = ( function () {

  // 極座標上のランダムな座標を作る
  // http://wasan.hatenablog.com/entry/2014/01/14/060137
  var randumPosition = function ( radius, min ) {

    min = min || 0;
    r = Math.cbrt( Math.random() * ( radius - min ) + min );
    cosTheta = Math.random() * 2 - 1;
    sinTheta = Math.sqrt( 1 - cosTheta * cosTheta );
    phi = Math.random() * 2 * Math.PI;

    return new THREE.Vector3(
      r * sinTheta * Math.cos( phi ),
      r * sinTheta * Math.sin( phi ),
      r * cosTheta
    );

  }

  var Dust = function ( center, radius, amount ) {

    this.radius = radius;

    var geometry = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial( {
      color: 0xcccccc,
      size: .1,
      map: THREE.ImageUtils.loadTexture( '/src/dust/dust.png' ),
      blending: THREE.AdditiveBlending,
      transparent: true
    } );

    var vertex;
    var r, cosTheta, sinTheta, phi;

    for ( var i = 0; i < amount; i++ ) {

      vertex = randumPosition( this.radius ).add( center );
      geometry.vertices.push( vertex );

    }

    this.object = new THREE.PointCloud( geometry, material );

  }


  Dust.prototype.update = function ( center ) {

    var to;
    var distance = this.object.position.distanceToSquared( center );

    if ( distance > this.radius * 3 ) {

      to = randumPosition( this.radius * 3, this.radius * 2.5 );
      this.object.position.copy( to.add( center ) );

    }

  }

  return Dust;

} )();

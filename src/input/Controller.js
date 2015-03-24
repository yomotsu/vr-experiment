var Controller = ( function () {

  var MAX_SPEED = 20;
  var DEG_180 = THREE.Math.degToRad( 180 );

  var Controller = function ( input ) {

    this.clock = new THREE.Clock();
    this.input = input;
    this.up           = new THREE.Vector3( 0, 1, 0 );
    this.frontAngle   = 0;
    this.direction    = new THREE.Vector3( 0, 0, -1 );
    this.speed        = 0;
    this.acceralation = 0.03;
    this.velocity     = new THREE.Vector3( 0, 0, 0 );
    this.position     = new THREE.Vector3( 0, 0, 0 );

  }

  Controller.prototype.update = function () {

    var velocityXZ;

    if ( this.input.isUp ) {

      // UP key
      this.speed = this.speed < MAX_SPEED ? this.speed + this.acceralation : MAX_SPEED;
      velocityXZ = this.direction.clone().multiplyScalar( this.speed );
      this.velocity.x = velocityXZ.x;
      this.velocity.z = velocityXZ.z;

    } else if ( this.input.isDown ) {

      // DOWN key
      this.speed = this.speed > 0 ? this.speed - this.acceralation * 2.5 : 0;
      velocityXZ = this.direction.clone().multiplyScalar( this.speed );
      this.velocity.x = velocityXZ.x;
      this.velocity.z = velocityXZ.z;

    }

    if ( this.input.isLeft ) {

      this.frontAngle += THREE.Math.degToRad( 1 );
      this.direction.x = Math.sin( this.frontAngle + DEG_180 );
      this.direction.z = Math.cos( this.frontAngle + DEG_180 );

    } else if ( this.input.isRight ) {

      this.frontAngle -= THREE.Math.degToRad( 1 );
      this.direction.x = Math.sin( this.frontAngle + DEG_180 );
      this.direction.z = Math.cos( this.frontAngle + DEG_180 );

    }

    if ( this.input.isHigh ) {

      this.velocity.y = Math.min( this.velocity.y + .1,  5 );

    } else if ( this.input.isLow ) {

      this.velocity.y = Math.max( this.velocity.y - .1, -5 );

    } else {

      this.velocity.y = this.velocity.y * 0.0001;
      // console.log(this.velocity.y )

    }

    var delta = this.clock.getDelta();
    this.position.add( this.velocity.clone().multiplyScalar( delta ) );

    // console.log( this.position );

  }

  return Controller;

} )();

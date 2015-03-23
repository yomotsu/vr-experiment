var Controller = ( function () {

  var MAX_SPEED = 3;
  var DEG_180 = THREE.Math.degToRad( 180 );

  var Controller = function ( input ) {

    this.clock = new THREE.Clock();
    this.input = input;
    this.up           = new THREE.Vector3( 0, 1, 0 );
    this.frontAngle   = 0;
    this.direction    = new THREE.Vector3( 0, 0, -1 );
    this.speed        = 0;
    this.acceralation = 0.01;
    this.velocity     = new THREE.Vector3( 0, 0, 0 );
    this.position     = new THREE.Vector3( 0, 0, 0 );

  }

  Controller.prototype.update = function () {

    if ( this.input.isUp ) {

      // UP key
      this.speed = this.speed < MAX_SPEED ? this.speed + this.acceralation : MAX_SPEED;
      this.velocity.copy( this.direction.clone().multiplyScalar( this.speed ) );

    } else if ( this.input.isDown ) {

      // DOWN key
      this.speed = this.speed > 0 ? this.speed - this.acceralation * 2.5 : 0;
      this.velocity.copy( this.direction.clone().multiplyScalar( this.speed ) );

    }

    if ( this.input.isLeft ) {
// console.log('l')
      this.frontAngle += THREE.Math.degToRad( 1 );
      this.direction.x = Math.sin( this.frontAngle + DEG_180 );
      this.direction.z = Math.cos( this.frontAngle + DEG_180 );

    } else if ( this.input.isRight ) {
      // console.log('r')
      this.frontAngle -= THREE.Math.degToRad( 1 );
      this.direction.x = Math.sin( this.frontAngle + DEG_180 );
      this.direction.z = Math.cos( this.frontAngle + DEG_180 );

    }
    // console.log(this.direction)

    var delta = this.clock.getDelta();
    this.position.add( this.velocity.clone().multiplyScalar( delta ) );

    // console.log( this.position );

  }

  return Controller;

} )();

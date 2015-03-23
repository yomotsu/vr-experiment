var VRWrapper = ( function () {


  var VRWrapper = function ( scene, camera, renderer, eyePosition ) {

    var that = this;
    this.useHMD = true;
    this.scene = scene;
    this.eyePosition = eyePosition;
    this.controls;
    this.position;

    var VREffectLoaded = function ( error ) {

      if ( error ) {

        that.useHMD = false;
        var params = {
          maxRadius: .03,
          minRadius: .03,
          radius   : .03,
          // offset   : eyePosition
        };
        that.controls = new TPSCameraControl( camera, new THREE.Object3D(), params );
        return;

      } else {

        that.useHMD = true;
        that.controls = new THREE.VRControls( camera );
        that.position = camera.position;
        return;

      }

    }

    this.vrEffect = new THREE.VREffect( renderer, VREffectLoaded );

    // 自動ではフルスクリーンにできないっぽい？
    // 何かのアクションがないといけなさそう
    window.addEventListener( 'keypress', function ( e ) {

      if ( e.charCode === 'f'.charCodeAt( 0 ) ) {

        that.setFullScreen( true );

      }

    } );

  }

  VRWrapper.prototype.update = function () {

    if ( !!this.controls ) {

      this.controls.update();

    }

  };

  VRWrapper.prototype.render = function () {

    this.vrEffect.render( scene, camera )

  };

  VRWrapper.prototype.setFullScreen = function ( bool ) {

    this.vrEffect.setFullScreen( bool );

  }

  return VRWrapper;

} )();

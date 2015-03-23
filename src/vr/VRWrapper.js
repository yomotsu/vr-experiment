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

        camera.position.copy( eyePosition );
        that.controls = new THREE.OrbitControls( camera );
        that.controls.center.copy( camera.position );
        that.controls.noZoom = true;
        that.controls.noPan = true;
        that.position = that.controls.center;
        camera.position.z += 0.03;
        return;

      } else {

        that.controls = new THREE.VRControls( camera );
        that.position = camera.position;
        that.useHMD = true;
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

  VRWrapper.prototype.updateAndRender = function () {

    if ( !!this.controls ) {

      this.controls.update();

    }

    this.vrEffect.render( scene, camera )

  };

  VRWrapper.prototype.setFullScreen = function ( bool ) {

    this.vrEffect.setFullScreen( bool );

  }

  return VRWrapper;

} )();

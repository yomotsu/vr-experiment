var Input = ( function () {

  'use strict';

  var KEY_W     = 87,
      KEY_UP    = 38,
      KEY_S     = 83,
      KEY_DOWN  = 40,
      KEY_A     = 65,
      KEY_LEFT  = 37,
      KEY_D     = 68,
      KEY_RIGHT = 39,
      KEY_SPACE = 32;

  Input = function () {

    THREE.EventDispatcher.prototype.apply( this );

    this.isDisabled = false;

    this.isUp    = false;
    this.isDown  = false;
    this.isLeft  = false;
    this.isRight = false;
    this.isHigh  = false;
    this.isLow   = false;
    this.isMoveKeyHolded = false;

    this._mousedownListener = onkeydown.bind( this );
    this._mouseupListener   = onkeyup.bind( this );

    window.addEventListener( 'keydown', this._mousedownListener, false );
    window.addEventListener( 'keyup',   this._mouseupListener,   false );

  }

  function onkeydown ( e ) {

    if ( this.isDisabled ) { return; }

    switch ( e.keyCode ) {

      case KEY_W :
        this.isUp = true;
        break;

      case KEY_S :
        this.isDown = true;
        break;

      case KEY_A :
        this.isLeft = true;
        break;

      case KEY_D :
        this.isRight = true;
        break;

      case KEY_UP :
        this.isHigh = true;
        break;

      case KEY_DOWN :
        this.isLow = true;
        break;

      // case KEY_SPACE :
      //   this.jump();
      //   break;

    }

    this.dispatchEvent( { type: 'movekeychange' } );

    if ( this.isUp || this.isDown || this.isLeft || this.isRight ) {

      this.isMoveKeyHolded = true;
      this.dispatchEvent( { type: 'movekeyhold' } );

    }

  }

  function onkeyup ( e ) {

    if ( this.isDisabled ) { return; }

    switch ( e.keyCode ) {

      case KEY_W :
        this.isUp = false;
        break;

      case KEY_S :
        this.isDown = false;
        break;

      case KEY_A :
        this.isLeft = false;
        break;

      case KEY_D :
        this.isRight = false;
        break;

      case KEY_UP :
        this.isHigh = false;
        break;

      case KEY_DOWN :
        this.isLow = false;
        break;

      // case KEY_SPACE :
      //   break;

    }

    this.dispatchEvent( { type: 'movekeychange' } );

    if ( !this.isUp && !this.isDown && !this.isLeft && !this.isRight &&
      (
           e.keyCode === KEY_W
        || e.keyCode === KEY_UP
        || e.keyCode === KEY_S
        || e.keyCode === KEY_DOWN
        || e.keyCode === KEY_A
        || e.keyCode === KEY_LEFT
        || e.keyCode === KEY_D
        || e.keyCode === KEY_RIGHT
      )
    ) {

      this.dispatchEvent( { type: 'movekeyrelease' } );

    }

  }

  return Input;

} )();

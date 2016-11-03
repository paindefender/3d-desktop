var renderer, scene, camera, pointerlockchange, pointerlockerror, controls; //if undef just add here
var blocker = document.getElementById( 'container' );
var instructions = document.getElementById( 'instructions' );
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {
  var element = document.body;
  var pointerlockchange = function ( event ) {
    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
      controlsEnabled = true;
      controls.enabled = true;
      blocker.style.display = 'none';
    } else {
      controls.enabled = false;
      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';
      instructions.style.display = '';
    }
  };
  var pointerlockerror = function ( event ) {
    instructions.style.display = '';
  };
  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerlockchange, false );
  document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'pointerlockerror', pointerlockerror, false );
  document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
  document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
  instructions.addEventListener( 'click', function ( event ) {
    instructions.style.display = 'none';
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    if ( /Firefox/i.test( navigator.userAgent ) ) {
      var fullscreenchange = function ( event ) {
        if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
          document.removeEventListener( 'fullscreenchange', fullscreenchange );
          document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
          element.requestPointerLock();
        }
      };
      document.addEventListener( 'fullscreenchange', fullscreenchange, false );
      document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
      element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
  }, false );
} else {
  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );
  controls.getObject().position.y = 150;
  controls.getObject().position.x = 150;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x90ff90 );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(renderer.domElement);

  //floor
    var floorGeo = new THREE.BoxGeometry( 700, 5, 700 );
    var floorMat = new THREE.MeshBasicMaterial( { color: 0x6615ff } );
    var floor = new THREE.Mesh( floorGeo, floorMat );
    floor.position.y = -200;
    scene.add( floor );
  //Table
    var TableTopGeo = new THREE.CubeGeometry( 300, 5, 500);
    TableTop = new THREE.Mesh( TableTopGeo, new THREE.MeshBasicMaterial({ color: 0x11f84f}) );
    TableTop.position.y = -10;
    scene.add(TableTop);
    var LegOneGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegOne = new THREE.Mesh( LegOneGeo, new THREE.MeshBasicMaterial({ color: 0x48f9e6}) );
    LegOne.position.y = -105;
    LegOne.position.x = -140;
    LegOne.position.z = -240;
    scene.add(LegOne);
    var LegTwoGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegTwo = new THREE.Mesh( LegTwoGeo, new THREE.MeshBasicMaterial({ color: 0xab46f8}) );
    LegTwo.position.x = 140;
    LegTwo.position.y = -105;
    LegTwo.position.z = 240;
    scene.add(LegTwo);
    var LegThreeGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegThree = new THREE.Mesh( LegThreeGeo, new THREE.MeshBasicMaterial({ color: 0x48f4e8}) );
    LegThree.position.y = -105;
    LegThree.position.x = -140;
    LegThree.position.z = 240;
    scene.add(LegThree);
    var LegFourGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegFour = new THREE.Mesh( LegFourGeo, new THREE.MeshBasicMaterial({ color: 0x4fe84f}) );
    LegFour.position.y = -105;
    LegFour.position.x = 140;
    LegFour.position.z = -240;
    scene.add(LegFour);
  //Paper
    var StackPaperGeo = new THREE.CubeGeometry( 80,20,60 );
    StackPaper = new THREE.Mesh( StackPaperGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    StackPaper.position.z = -10;
    StackPaper.position.x = 10;
    scene.add(StackPaper);
  //newPaper
    var newPaperGeo = new THREE.CubeGeometry(80,1,60);
    newPaper = new THREE.Mesh( newPaperGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5 }));
    newPaper.position.z = -50;
    newPaper.position.x = 100;
    newPaper.position.y = -7;
    scene.add(newPaper);

    window.addEventListener( 'resize', onWindowResize, false );
}

function render() {
  renderer.render(scene, camera);
};

function animate() {
  requestAnimationFrame(animate);
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
animate();

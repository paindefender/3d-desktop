var renderer, scene, camera, pointerlockchange, pointerlockerror, controls; //if undef just add here
var blocker = document.getElementById( 'container' );
var instructions = document.getElementById( 'instructions' );
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
var INTERSECTED;

//Some JQuery stuff
$( document ).ready(function() { //Check if logged in. if logged, in load notes
  getNotes();

  //Login form
  $("#login > form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
                type: "POST",
                url: "login",
                data: $("#login > form").serialize(),

                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    console.log("Success " + textStatus);
                    getNotes();
                    $("#login").hide();
                    $("#loginName").val('');
                    $("#loginPassword").val('');
                },

                error: function(jqXHR, textStatus, errorThrown){
                    console.log("Something really bad happened " + textStatus);
                    $("#loginName").val('');
                    $("#loginPassword").val('');
                }
            });
  })
  //ShowNotesForm
  $( "#closeNotes" ).click(function() {
    $("#showNotes").hide();
  });
  //AddNoteForm
  $( "#closeAddNotes" ).click(function() {
    $("#newNoteTitle").val('');
    $("#newNoteText").val('');
    $("#addNote").hide();
  });
  $("#addNote > form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
                type: "POST",
                url: "new",
                data: $("#addNote > form").serialize(),

                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    console.log("Success " + textStatus);
                    $("#newNoteTitle").val('');
                    $("#newNoteText").val('');
                    $("#addNote").hide();
                },

                error: function(jqXHR, textStatus, errorThrown){
                    console.log("Something really bad happened " + textStatus);
                    $("#newNoteTitle").val('');
                    $("#newNoteText").val('');
                },

                complete: function(jqXHR, textStatus){
                  getNotes();
                }
            });
  })
});



if ( havePointerLock ) { //Initial pointerLock setup
  var element = document.body;
  var pointerlockchange = function ( event ) {
    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
      controlsEnabled = true;
      controls.enabled = true;
      blocker.style.display = 'none';
    } else {
      controls.enabled = false;
      velocity.x = 0;
      velocity.z = 0;
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
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );

  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );
  controls.getObject().position.y = 150;
  controls.getObject().position.x = 150;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x90ff90 );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  var light = new THREE.PointLight( 0xffefa6, 1, 600 );
  light.position.set( 0, 250, 0 );
  scene.add( light );
  light = new THREE.HemisphereLight( 0xffefa6, 0x6615ff, 0.4 );
  scene.add( light );

  //floor
    var floorGeo = new THREE.CubeGeometry( 700, 5, 700 );
    var floor = new THREE.Mesh( floorGeo, new THREE.MeshPhongMaterial( { color: 0x6615ff } ) );
    floor.position.y = -200;

    scene.add( floor );
    var floor = new THREE.Mesh( floorGeo, new THREE.MeshPhongMaterial( {color: 0xaa30ff} ))
    floor.position.y = 300;
    scene.add( floor );
  //Table
    var TableTopGeo = new THREE.CubeGeometry( 300, 5, 500);
    TableTop = new THREE.Mesh( TableTopGeo, new THREE.MeshPhongMaterial({ color: 0x11f84f}) );
    TableTop.position.y = -10;


    scene.add(TableTop);
    var LegOneGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegOne = new THREE.Mesh( LegOneGeo, new THREE.MeshPhongMaterial({ color: 0x48f9e6}) );
    LegOne.position.y = -105;
    LegOne.position.x = -140;
    LegOne.position.z = -240;
    scene.add(LegOne);
    var LegTwoGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegTwo = new THREE.Mesh( LegTwoGeo, new THREE.MeshPhongMaterial({ color: 0xab46f8}) );
    LegTwo.position.x = 140;
    LegTwo.position.y = -105;
    LegTwo.position.z = 240;
    scene.add(LegTwo);
    var LegThreeGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegThree = new THREE.Mesh( LegThreeGeo, new THREE.MeshPhongMaterial({ color: 0x48f4e8}) );
    LegThree.position.y = -105;
    LegThree.position.x = -140;
    LegThree.position.z = 240;
    scene.add(LegThree);
    var LegFourGeo = new THREE.CubeGeometry( 10, 190, 10);
    LegFour = new THREE.Mesh( LegFourGeo, new THREE.MeshPhongMaterial({ color: 0x4fe84f}) );
    LegFour.position.y = -105;
    LegFour.position.x = 140;
    LegFour.position.z = -240;
    scene.add(LegFour);
  //Paper
    var StackPaperGeo = new THREE.CubeGeometry( 80,20,60 );
    StackPaper = new THREE.Mesh( StackPaperGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }));
    StackPaper.position.z = -10;
    StackPaper.position.x = 10;
    StackPaper.userData.id = 4; // FUNCTION ID


    scene.add(StackPaper);
  //newPaper
    var newPaperGeo = new THREE.CubeGeometry(80,1,60);
    newPaper = new THREE.Mesh( newPaperGeo, new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.5 }));
    newPaper.position.z = -50;
    newPaper.position.x = 100;
    newPaper.position.y = -7;
    newPaper.userData.id = 1; // FUNCTION ID


    scene.add(newPaper);
  // Walls
    var Wall1Geo = new THREE.BoxGeometry( 40, 500, 740 );
    Wall1 = new THREE.Mesh( Wall1Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall1.position.y = 50;
    Wall1.position.x = -350;
    Wall1.position.z = 0;
    scene.add(Wall1);
    var Wall2Geo = new THREE.BoxGeometry( 700, 500, 40 );
    Wall2 = new THREE.Mesh( Wall2Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall2.position.y = 50;
    Wall2.position.x = 0;
    Wall2.position.z = -350;
    scene.add(Wall2);
    var Wall3Geo = new THREE.BoxGeometry( 700, 500, 40 );
    Wall3 = new THREE.Mesh( Wall3Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall3.position.y = 50;
    Wall3.position.x = 0;
    Wall3.position.z = 350;
    scene.add(Wall3);
    var Wall4Geo = new THREE.BoxGeometry( 40, 500, 240 );
    Wall4 = new THREE.Mesh( Wall4Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall4.position.y = 50;
    Wall4.position.x = 350;
    Wall4.position.z = -250;
    scene.add(Wall4);
    var Wall5Geo = new THREE.BoxGeometry( 40, 500, 240 );
    Wall5 = new THREE.Mesh( Wall5Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall5.position.y = 50;
    Wall5.position.x = 350;
    Wall5.position.z = 250;
    scene.add(Wall5);
    var Wall6Geo = new THREE.BoxGeometry( 40, 100, 260 );
    Wall6 = new THREE.Mesh( Wall6Geo, new THREE.MeshPhongMaterial({ color: 0xaa30ff }) );
    Wall6.position.y = 250;
    Wall6.position.x = 350;
    Wall6.position.z = 0;
    scene.add(Wall6);
  // Door
    var DoorGeo = new THREE.BoxGeometry( 20, 400, 260 );
    Door = new THREE.Mesh( DoorGeo, new THREE.MeshPhongMaterial({ color: 0xff6030 }) );
    Door.position.y = 00;
    Door.position.x = 350;
    Door.position.z = 0;


    scene.add(Door);
    DoorKnob1 = new THREE.Mesh( new THREE.CylinderGeometry( 15, 05, 10, 90, 10 ), new THREE.MeshPhongMaterial( { color: 0x357574 }) );
    DoorKnob1.rotation.z = Math.PI / 2;
    DoorKnob1.position.set(335, 60, 70);
    DoorKnob1.userData.id = 13;
    DoorKnob1.castShadow = true;
    DoorKnob1.receiveShadow = false;
    scene.add(DoorKnob1);
    DoorKnob2 = new THREE.Mesh( new THREE.CylinderGeometry( 15, 05, 10, 90, 10 ), new THREE.MeshPhongMaterial( { color: 0x357574 }) );
    DoorKnob2.rotation.z = 3*Math.PI / 2;
    DoorKnob2.position.set(365, 60, 70);
    DoorKnob2.userData.id = 13;
    DoorKnob2.castShadow = true;
    DoorKnob2.receiveShadow = false;
    scene.add(DoorKnob2);
  //

    raycaster = new THREE.Raycaster();

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;
      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }

    };
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'click', onClick, false );
}//Create objects, models, lighting etc.

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

function render() {
  renderer.render(scene, camera);
};
var intVec;
var arrow;
function animate() {
  requestAnimationFrame(animate);

  if ( controls.enabled ) {
    intVec = new THREE.Vector3(0, 0, -1);
    intVec = camera.localToWorld(intVec);
    intVec.sub(controls.getObject().position); // Now vector is a unit vector with the same direction as the camera
    raycaster.set( controls.getObject().position, intVec );
    scene.remove ( arrow );
    arrow = new THREE.ArrowHelper( camera.getWorldDirection(), camera.getWorldPosition(), 100, Math.random() * 0xffffff );
    scene.add( arrow );
		var intersects = raycaster.intersectObjects( scene.children );
		if ( intersects.length > 0 ) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				INTERSECTED = intersects[ 0 ].object;
        console.log(INTERSECTED);
			}
		} else {
			INTERSECTED = null;
		}


    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 20.0 * delta;
    velocity.z -= velocity.z * 20.0 * delta;

    if ( moveForward && controls.enabled) velocity.z -= 1200.0 * delta;
    if ( moveBackward && controls.enabled) velocity.z += 1200.0 * delta;

    if ( moveLeft && controls.enabled) velocity.x -= 1200.0 * delta;
    if ( moveRight && controls.enabled) velocity.x += 1200.0 * delta;

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateZ( velocity.z * delta );


    prevTime = time;

  }

  render();
}//Update scene based on controls

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onClick(){
  if (controls.enabled === false){
    return;
  }
  if (!INTERSECTED.userData.id){
    return;
  } else {
    if (INTERSECTED.userData.id === 4){
      showNotes();
    } else if (INTERSECTED.userData.id === 1) {
      newNote();
    } else if (INTERSECTED.userData.id === 13) {
      logOut();
    }
  }
}

function logOut(){
  $.ajax({
    method: "POST",
    url: "login",
    data: { logout: " " }
  });
  showLogin();
}

function getNotes(){
  $.ajax({
    type: "POST",
    url: "notes",
    dataType: "json",

    //if received a response from the server
    success: function( data, textStatus, jqXHR) {
      console.log("Getting Notes");
      console.log(data);
      $("#notesList").empty();
      var x = $("#notesList");
      for (i = 0; i < data.length; i++) {
        x.append("<li id='list_entry" + i + "' data-id='" + data[i].id + "'><span class='deleteNote' style='float:right; '>X</span><h3>" + data[i].title + "</h3><p>" + data[i].text + "</p></li>");
      }
      deletifyNotes();
    },

    //If there was no resonse from the server
    error: function(jqXHR, textStatus, errorThrown){
         console.log("Could not get Notes. Got an error: " + errorThrown);
         if (errorThrown === "Forbidden"){
           showLogin();
         }
    },
  });
}

function deletifyNotes(){
  $(".deleteNote").click(function() {
    $(this).parent().each(function() {
      var id = $(this).data("id"); //get ID of the node
      $.ajax({
        method: "POST",
        url: "new",
        data: { delNote: 1, id: id },
        success: function( data, textStatus, jqXHR) {
            console.log("Note deleted");
            getNotes();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Something really bad happened " + textStatus + errorThrown);
        }
      });
    });
  });
}

function newNote(){

  /*var docElm = document.documentElement;
  if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
  }
  else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
  }
  else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
  }
  else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
  }*/

  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
  document.exitPointerLock();
  console.log("creating new note");
  $("#addNote").show();
}

function showNotes(){
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
  document.exitPointerLock();
  console.log("showing notes");

  $("#showNotes").show();
}

function showLogin(){
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
  document.exitPointerLock();
  console.log("Showing login window");
  $("#login").show();
}

function l3d(){
  controls.enabled = false;
  blocker.style.display = '-webkit-box';
  blocker.style.display = '-moz-box';
  blocker.style.display = 'box';
  instructions.style.display = '';
}
function s3d(){
  controlsEnabled = true;
  controls.enabled = true;
  blocker.style.display = 'none';
}

init();
animate();

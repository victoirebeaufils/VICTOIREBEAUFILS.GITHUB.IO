
/*
var geometry = new THREE.BoxGeometry( 1, 3, 5 );
var material = new THREE.MeshStandardMaterial( {
    color: 0xff0051,
    shading: THREE.FlatShading, // default is THREE.SmoothShading
    metalness: 0,
    roughness: 1
} );
var cube1 = new THREE.Mesh( geometry, material );
cube1.position.y += 10;
scene.add( cube1 );
cube1.position.set(0, 0, 0);
cube1.rotateX(Math.PI/2);
*/
// Create a scene which will hold all our meshes to be rendered

var video;

var scene = new THREE.Scene();

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    35,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(70,0,30);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0,15,0))

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );

// Enable shadow mapping
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild( renderer.domElement );

// Add an ambient lights
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( ambientLight );

// Add a point light that will cast shadows
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add( pointLight );

// Le sol.
var groundMesh = new THREE.Mesh(
    new THREE.BoxGeometry( 100, .1, 100 ),
      new THREE.MeshBasicMaterial( { color: 0x222222} )
);
groundMesh.receiveShadow = true;
scene.add( groundMesh );







//Un cube1
var geometry = new THREE.BoxGeometry( 1, 7, 10 );
var material = new THREE.MeshBasicMaterial( {color: 0x020d14} );
var texture = new THREE.TextureLoader().load( "stare.jpg" );


var pictureMaterial = new THREE.MeshBasicMaterial({
    map : texture
});

var borderMaterial = new THREE.MeshBasicMaterial({
    color : 0x000000
});

var materials = [
pictureMaterial, // Devant
borderMaterial, // Derrière
borderMaterial, // En haut  ---> THIS IS THE FRONT
borderMaterial, // Dessous
borderMaterial, // Gauche
borderMaterial  // Droite
];


var material = new THREE.MeshBasicMaterial( { map: texture,
} );






var cube1 = new THREE.Mesh( geometry, materials );
var height = cube1.geometry.parameters.height;
scene.add( cube1 );
cube1.position.set(-18.75/2, height/2, -10.8/2);
cube1.rotateY(-Math.PI/6);

//Un cube2
var geometry2 = new THREE.BoxGeometry( 1, 7, 10 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x020d14} );
var cube2 = new THREE.Mesh( geometry2, material2 );
var height = cube2.geometry.parameters.height;
cube2.position.set(18.75/2, height/2, -10.8/2);
cube2.rotateY(Math.PI/6);
scene.add( cube2 );


//Un cube3
var geometry3 = new THREE.BoxGeometry( 1, 7, 10 );
var material3 = new THREE.MeshBasicMaterial( {color: 0x020d14} );
var cube3 = new THREE.Mesh( geometry3, material3 );
var height = cube3.geometry.parameters.height;
cube3.position.set(0, height/2, 21.65/2);
cube3.rotateY(Math.PI/2);
scene.add(cube3);

// Render the scene/camera combnation
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,15,0);
//controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } ); // add this only if there is no animation loop (requestAnimationFrame)


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
var scene = new THREE.Scene();

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    60,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(30,5,30);

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
var geometry = new THREE.BoxGeometry( 1, 5, 3 );
var texture = new THREE.TextureLoader().load( "lol.jpg" );
var material = new THREE.MeshBasicMaterial( { map: texture,

} );
var cube1 = new THREE.Mesh( geometry, material );
//cube1.position.y += 10;



scene.add( cube1 );
cube1.position.set(-18.75, 0, -10.8);
cube1.rotateY(-Math.PI/6);

// Render the scene/camera combnation
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,15,0);
//controls.maxPolarAngle = Math.PI / 2;
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } ); // add this only if there is no animation loop (requestAnimationFrame)

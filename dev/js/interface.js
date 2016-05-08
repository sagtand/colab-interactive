// Get screen dimensions
var width, height, aspect, pixelRatio, scene, camera, sphere, geo, mesh, dot, renderer, stats;

var Interface = {
	init: function() {	
		setScreen();
		setScene();
		setStats();
		setRenderer();
		onResize();
		// tweenAnimate(0,0,200,200);
		animate();

		// this.animate();
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	}
}

setScreen = function() {
	width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	aspect = width / height;
	pixelRatio = window.devicePixelRatio;
};

setScene = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(25, aspect, 1, 10000);
	camera.position.z = 2000;
	scene.add(camera);

	//The objects
	geo = [ 
		plane = new THREE.PlaneBufferGeometry( 250, 250, 1, 1 ),
		tetra = new THREE.TetrahedronGeometry(200,0),
		octa = new THREE.OctahedronGeometry(200,0),
		box = new THREE.BoxGeometry(200,200,200),
		iso = new THREE.IcosahedronGeometry(200,0)
	];
	sphere = new THREE.CircleGeometry( 4, 64 );
	// geo0 = new THREE.PlaneBufferGeometry( 250, 250, 1, 1 );
	// geo1 = new THREE.TetrahedronGeometry(200,0);
	// geo2 = new THREE.OctahedronGeometry(200,0);
	// geo3 = new THREE.BoxGeometry(200,200,200);
	// geo4 = new THREE.IcosahedronGeometry(200,0);

	material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
	solid = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});

	mesh = new THREE.Mesh(geo[4], material);
	dot = new THREE.Mesh(sphere, solid);
	scene.add(mesh);
	scene.add(dot);
	console.log(mesh);
};

setRenderer = function(){
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( pixelRatio );
	renderer.setClearColor( 0xffffff, 0);
	document.body.appendChild(renderer.domElement);
}
render = function() {
	renderer.render( scene, camera );
}
setStats = function() {
	stats = new Stats();
	document.body.appendChild(stats.domElement);
};
onResize = function() {
	setScreen();
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
};
// animate: function(){
	
// }
// resetNote: function(){
// 	this.note.position.x = this.width * 0.5;
// 	this.note.position.y = this.height * 0.5;

// 	this.note.scale.x = 0.5;
// 	this.note.scale.y = 0.5;

// 	this.note.pivot.set(250, 250); //half the sprite size

// 	this.note.alpha = 1;
// }	

tweenAnimate = function(posX, posY, posZ, tarX, tarY, tarZ, setMesh, object){
	position = { x : posX, y: posY, z: posZ };
	target = { x : tarX, y: tarY, z: tarZ };
	tween = new TWEEN.Tween(position).to(target, 800);
	// tween.delay(500);
	tween.easing(TWEEN.Easing.Quartic.Out);

	//change the mesh
	object.geometry = setMesh;

	tween.onUpdate(function(){
		object.position.x = position.x;
		object.position.y = position.y;
		object.position.z = position.z;
		// console.log(mesh.position.x);
	});
	tween.start();
}

//denna funktion funkar ej...
tweenScale = function(object, scale){
	sPosition = { x : 0, y : 0 };
	sTarget = { x : scale, y : scale };
	scale = new TWEEN.Tween(sPosition).to(sTarget, 800);
	// tween.delay(500);
	scale.easing(TWEEN.Easing.Quartic.Out);

	scale.onUpdate(function(){
		object.scale.x = sPosition.x;
		object.scale.y = sPosition.y;
		// console.log(mesh.sPosition.x);
	});
	scale.start();
}

animate = function(){
	// console.log(position);
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.001;
	TWEEN.update();

	render();
	stats.update();
	// console.log(tween);
};



Interface.init();


// 	function startAnimation(){
// 		requestAnimationFrame( startAnimation );
// 		// console.log('hej');

	

// 		// requestAnimationFrame(startAnimation);

// 		// Interface.note.position.x -= 0;
// 		// Interface.note.position.y += 0;
// 		// Interface.note.scale.x -= 0.005;
// 		// Interface.note.scale.y -= 0.005;
// 		// Interface.note.alpha -= 0.01;

// 		// //render the scene
// 		// Interface.renderer.render(Interface.stage);
// 	}
// 	startAnimation();

window.onresize = function(){
	onResize();
	
	// Interface.renderer.width = Interface.width;
	// Interface.renderer.height = Interface.height;
	
	// Interface.renderer.view.style.width = Interface.width + "px";    
	// Interface.renderer.view.style.height = Interface.height + "px";    
	
	//this part adjusts the ratio:    
	// Interface.renderer.resize(Interface.width, Interface.height);

}



// INTERACTIVITY________________________________________

// listen to events on main
var mc = new Hammer(main);

// play random tone on tap
mc.on("tap press", function(ev) {


    newRandomTone = randomTone();
    playRandomTone( scale[newRandomTone] );

    // Interface.resetNote();
    console.log(newRandomTone);
    
	// From: X, Y, Z
	// To: X, Y, Z
	// Geometry
	tweenAnimate(
		mesh.position.x, mesh.position.y, mesh.position.z, 
		0, newRandomTone*40-80, newRandomTone*100-100,
		geo[newRandomTone],
		mesh);

	tweenAnimate(
		mesh.position.x, mesh.position.y, mesh.position.z, 
		0, newRandomTone*40-80, newRandomTone*100-100,
		sphere,
		dot);

	tweenScale(dot, (newRandomTone+1)*2 );

	// sPosition = { x : object.scale.x, y : object.scale.y };
	// sTarget = { x : object.scale.x*scale, y : object.scale.y*scale };
	// scale = new TWEEN.Tween(sPosition).to(sTarget, 800);
	// // tween.delay(500);
	// scale.easing(TWEEN.Easing.Quartic.Out);

	// scale.onUpdate(function(){
	// 	object.scale.x = position.x;
	// 	object.scale.y = position.y;
	// 	// console.log(mesh.position.x);
	// });
	// scale.start();

	// dot.scale.x = (newRandomTone+1)*2;
	// dot.scale.y = (newRandomTone+1)*2;


    // mesh.position.x = newRandomTone*40 - 40;
    // mesh.position.y = newRandomTone*40 - 40;
    // mesh.position.z = newRandomTone*40 - 40;
});



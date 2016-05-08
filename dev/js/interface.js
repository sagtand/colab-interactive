(function(){
	// Get screen dimensions

	var Interface = {
		init: function() {
			
			this.setScreen();
			this.setScene();
			this.setStats();
			this.setRenderer();
			this.onResize();
			animate();
			// this.animate();
		},
		setScreen: function() {
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			this.aspect = this.width / this.height;
			this.pixelRatio = window.devicePixelRatio;
		},
		setScene: function() {
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(25, this.aspect, 1, 10000);
			this.camera.position.z = 2000;
			this.scene.add(this.camera);

			//The objects
			this.cube = new THREE.OctahedronGeometry(200,2);
			this.material = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true});
			this.mesh = new THREE.Mesh(this.cube, this.material);
			this.scene.add(this.mesh);
		},
		setRenderer: function(){
			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			this.renderer.setClearColor( 0xf0f0f0 );
			this.renderer.setPixelRatio( this.pixelRatio );
			document.body.appendChild(this.renderer.domElement);
		},
		setStats: function() {
			this.stats = new Stats();
			document.body.appendChild(this.stats.domElement);
		},
		onResize: function() {
			this.setScreen();
			this.camera.aspect = this.aspect;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.width, this.height);
		}	
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
	}
	Interface.init();

	function animate(){
		requestAnimationFrame( function(){ animate() } );

		Interface.mesh.rotation.x += 0.005;
		Interface.mesh.rotation.y += 0.001;

		Interface.renderer.render(Interface.scene, Interface.camera);
		Interface.stats.update();
	};

		console.log(Interface);

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
		Interface.onResize();
		
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
	    playRandomTone( randomTone() );
	    // Interface.resetNote();
	});

// 	// console.log(Interface.renderer);
})();

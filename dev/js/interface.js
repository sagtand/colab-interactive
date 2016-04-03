(function(){
	// Get screen dimensions

	var Interface = {
		init: function() {
			
			this.setScreen();
			this.setRenderer();
			this.theStage();
		},
		setScreen: function() {
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		},
		setRenderer: function(){
			this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);
			document.body.appendChild(this.renderer.view);
		},
		theStage: function() {
			this.stage = new PIXI.Container();
			this.note = {};

			PIXI.loader.add('note', 'assets/note.png').load(function (loader, resources) {
				//create a texture
				Interface.note = new PIXI.Sprite(resources.note.texture);

				//start position in center of the scene
				Interface.resetNote();

				//add to stage;
				Interface.stage.addChild(Interface.note);
				console.log(Interface.note);
				startAnimation();
			});
		},
		resetNote: function(){
			this.note.position.x = this.width * 0.5 - 62.5; // 500 * 0.25 /2
			this.note.position.y = this.height * 0.5;

			this.note.scale.x = 0.25;
			this.note.scale.y = 0.25;

			this.note.pivot.set(250, 250)

			this.note.alpha = 1;
			console.log('reset')
		}
	}
	Interface.init();

	function startAnimation(){
		requestAnimationFrame(startAnimation);

		Interface.note.position.x -= 0;
		Interface.note.position.y += 0;
		Interface.note.scale.x += 0.005;
		Interface.note.scale.y += 0.005;
		Interface.note.alpha -= 0.01;

		//render the scene
		Interface.renderer.render(Interface.stage);
	}

	window.onresize = function(){
		Interface.setScreen();
		
		Interface.renderer.width = Interface.width;
		Interface.renderer.height = Interface.height;
		
		Interface.renderer.view.style.width = Interface.width + "px";    
		Interface.renderer.view.style.height = Interface.height + "px";    
		
		//this part adjusts the ratio:    
		Interface.renderer.resize(Interface.width, Interface.height);

	}



	// INTERACTIVITY________________________________________

	// listen to events on main
	var mc = new Hammer(main);

	// play random tone on tap
	mc.on("tap press", function(ev) {
	    playRandomTone( randomTone() );
	    Interface.resetNote();
	});

	// console.log(Interface.renderer);
})();
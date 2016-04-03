(function(){
	// Get screen dimensions
	var Interface = {
		init: function() {
			
			this.setScreen();
		},
		setScreen: function() {
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);	
			
			this.setRenderer();
		},
		setRenderer: function(){
			this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);
			document.body.appendChild(this.renderer.view);
			
			this.theStage();
		},
		theStage: function() {
			this.stage = new PIXI.Container();
			this.note = null;

			PIXI.loader.add('note', 'assets/note.svg').load(function (loader, resources) {
				//create a texture
				Interface.note = new PIXI.Sprite(resources.note.texture);

				//start position in center of the scene
				Interface.note.position.x = Interface.width * 0.5;
				Interface.note.position.y = Interface.height * 0.5;

				Interface.note.scale.x = 2;
				Interface.note.scale.y = 2;

				//add to stage;
				Interface.stage.addChild(Interface.note);

			});

			startAnimation();
		}
	}
	Interface.init();

	function startAnimation() {	
		requestAnimationFrame(startAnimation);

		Interface.note.rotation += 0.01;

		Interface.renderer.render(Interface.stage);
	}

	window.onresize = function(){
		Interface.setScreen();
	}

	// console.log(Interface.renderer);
})();
(function(){
	function GoTime(){
//Class definition
		this.Container_constructor();
		this.name = "goTime";
		this.x = STAGE.width - UNIT.height;
		this.y = UNIT.height;
		this.progRunning = false;
		this.on("click", function() {
			handleGoTime();
		});

		this.setup();
	}

	var g = createjs.extend(GoTime, createjs.Container);

	g.setup = function(){

		var goLabel = new createjs.Text("Go Time!", "bold 18px Arial", "#FFFFFF");
			goLabel.name = "goLabel";
			goLabel.textAlign = "center";
			goLabel.textBaseline = "middle";
			goLabel.x = 0;
			goLabel.y = 0;
		
		var goBkg = new createjs.Shape();
			goBkg.graphics.beginFill("green").dc(0, 0, UNIT.width);
					
			this.addChild(goBkg, goLabel);
	};

		//Bot functions

		function handleGoTime() {

		if (!goTime.progRunning) { //We start the program
			bot.moving = true;
		} else { //We end the program and reset the field
			setTimeout(function() {
			console.log("Bot AAR", bot);
			resetPlayground();
			
			},
			250);
		}

		goTime.progRunning = !goTime.progRunning;
		}

	window.GoTime = createjs.promote(GoTime, "Container");
}());

		
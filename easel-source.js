//Constants
var STAGE = {
		width: 800,
		height: 500
	},
	PLAYGROUND = {
		width: 500,
		height: 500
	},
	CONTROLPANEL = {
		width: 300,
		height: 500
	},
	GRID = {
		col: 10,
		row: 10
	},
	UNIT = {
		width: PLAYGROUND.width / GRID.col,
		height: PLAYGROUND.height / GRID.row
	},
	stage, bot,
	ticker = createjs.Ticker;

	//Handlers

	function handleSnap(cursorX, cursorY) { //Returns object {x: new x point, y: new y point}
		if (cursorX > CONTROLPANEL.width) { //Make sure we're still in the playground
			var xSnapped = Math.round((cursorX - UNIT.width / 2) / UNIT.width) * UNIT.width; //Snaps to closest gird point.
		
			var ySnapped = Math.round((cursorY - UNIT.height / 2) / UNIT.height) * UNIT.height; //Snaps to closest gird point.
				console.log({x: xSnapped, y: ySnapped});
			return {x: xSnapped, y: ySnapped}; //Return x,y snapped to closest unit
		}
						
		return {x: cursorX, y: cursorY}; // If we are not in the playground, allow the breadcrumb to move freely
	}

	function handleMoveForward(dist, ori, x, y){ //Returns {newX: new X, newY: new Y}
		switch (ori){
			case "e":
				return {newX: x += dist, newY: y};
			
			case "s":
				return {newX: x, newY: y += dist};
				
			case "w":
				return {newX: x -= dist, newY: y};

			case "n":
				return{newX: x, newY: y -= dist};

			default:
				console.log("Error: Bot has invalid or no orientation property");

		}
			}


function init() {
	stage = new createjs.Stage("demoCanvas");

	//Allows mouse tracking outside of the stage
	stage.mouseMoveOutside = true;

	stage.enableMouseOver();

	var bot = new createjs.Shape();
	bot.graphics.beginFill("gray").drawRoundRect(0, 0, UNIT.width * 0.8, UNIT.height * 0.8, 5);
	bot.defaultPos = {x: CONTROLPANEL.width, y: STAGE.height - UNIT.height};
	bot.x = bot.defaultPos.x;
	bot.y = bot.defaultPos.y;
	bot.orientation = "e";
	bot.moving = false;
	bot.moveForward = function(dist) {

		var newPos = handleMoveForward(dist, bot.orientation, bot.x, bot.y);
		bot.x = newPos.newX;
		bot.y = newPos.newY;

	};
	stage.addChild(bot);

	var goLabel = new createjs.Text("Go Time!", "bold 18px Arial", "#FFFFFF");
			goLabel.name = "goLabel";
			goLabel.textAlign = "center";
			goLabel.textBaseline = "middle";
			goLabel.x = 0;
			goLabel.y = 0;
		
	var goBkg = new createjs.Shape();
			goBkg.graphics.beginFill("green").dc(0, 0, UNIT.width);
			
	
	var goTime = new createjs.Container();
			goTime.name = "goTime";
			goTime.x = STAGE.width - UNIT.height;
			goTime.y = UNIT.height;
			goTime.progRunning = false;
			goTime.addChild(goBkg, goLabel);
			stage.addChild(goTime);

	// line = new createjs.Shape();
	// stage.addChild(line);
	stage.update();

		function handleGoTime() {

		if (!goTime.progRunning) { //We start the program
			bot.moving = true;
		} else { //We end the program and reset the field
			bot.moving = false;
			setTimeout(function() {			
			bot.x = bot.defaultPos.x;
			bot.y = bot.defaultPos.y;}, 
			250);
		}

		goTime.progRunning = !goTime.progRunning;
		console.log("handling", "bot", bot);
	}

	(function(){

				var cols = 2;
				var rows = 4;

				for(var i=0;i<8;i++) {
				var bCrumb = new BCrumb(i, "Foo");
					bCrumb.x = UNIT.width + UNIT.width * (i % cols);
					bCrumb.y = UNIT.height + UNIT.height*Math.floor((i)/cols);
			  	console.log(bCrumb.x, bCrumb.y);
			    stage.addChild(bCrumb);
				}
			    stage.update();
			})();
	//Listeners
console.log("stage", stage.children);
	// BCrumb.on("pressmove", function(evt) {
	// 			evt.currentTarget.x = handleXSnap(evt.stageX);
	// 			evt.currentTarget.y = handleYSnap(evt.stageY);

			// });

	goTime.on("click", function() {
		console.log('click');
		handleGoTime();
	});

			ticker.addEventListener("tick", tick);
		
	stage.update();

	/***********Animation************/
	function tick(event) {
		//ms since last tick / ms per s * px per sec
		if(bot.moving && bot.x<STAGE.width-UNIT.width){
			bot.moveForward(event.delta / 1000 * 200);
		}	
	stage.update();
	}
}	




	//Hit test

	// var pt = square.localToLocal(12, 12, circle);

	// console.log("square", pt.x, pt.y);
	// console.log("circle", circle.x, circle.y);

	// if (circle.hitTest(pt.x, pt.y)){
	// 	console.log('hit');
	// 	circle.alpha = 0.5;
	// }

	
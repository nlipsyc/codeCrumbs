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
	ticker = createjs.Ticker,
	BCFn = BC,
	stage, bot, bCrumbs, goTime;
	//Handlers

	function handleSnap(cursorX, cursorY) { //Returns object {x: new x point, y: new y point}
		if (cursorX > CONTROLPANEL.width) { //Make sure we're still in the playground
			var xSnapped = Math.round((cursorX - UNIT.width / 2) / UNIT.width) * UNIT.width; //Snaps to closest gird point.
		
			var ySnapped = Math.round((cursorY - UNIT.height / 2) / UNIT.height) * UNIT.height; //Snaps to closest gird point.
			return {x: xSnapped, y: ySnapped}; //Return x,y snapped to closest unit
		}
						
		return {x: cursorX, y: cursorY}; // If we are not in the playground, allow the breadcrumb to move freely
	}



	function isOnStage(shape){ //runs checks for each boundary and logs failure
		if (shape.x > STAGE.width-UNIT.width){
			console.log("Right edge hit");
			return false;
		}
		else if(shape.x < CONTROLPANEL + UNIT.width){
			console.log("Left edge hit");
			return false;
		}
		else if (shape.y < UNIT.height){
			console.log("Top edge hit");
			return false;
		}
		else if (shape.y > STAGE.height - UNIT.height){
			console.log("Bottom edge hit");
			return false;
		}
		else{
			return true;
		}
	}

	function resetPlayground(){
	//Reset bCrumb position
			for (var i=0; i<bCrumbs.getNumChildren(); i++){
				var bC = bCrumbs.getChildAt(i); //For each bC
				BCFn.resetBCrumb(bC);
				bC.visible = true;
				}

	//Reset bot position and stats
		bot.moving = false;
		bot.x = bot.defaultPos.x;
		bot.y = bot.defaultPos.y;
		bot.inventory = [];
		bot.inventoryCap = 2;
		bot.bucks = 0;
		bot.orientation = "e";
		bot.currentFunction = null;
	}

function init() {
	stage = new createjs.Stage("demoCanvas");

	//Allows mouse tracking outside of the stage
	stage.mouseMoveOutside = true;

	stage.enableMouseOver();

	console.log("Bot", bot, "BCrumb", BCrumb);

	bot = new Bot();
	stage.addChild(bot);

	bCrumbs = BCFn.genBCrumbs();
	stage.addChild(bCrumbs);

	goTime = new GoTime();
	stage.addChild(goTime);

	stage.update();

	

			ticker.addEventListener("tick", tick);
		
	stage.update();

	/***********Animation************/
	function tick(event) {
		
		if(bot.moving && isOnStage(bot)){
			bot.moveForward(event.delta / 1000 * 200); //ms since last tick / ms per s * px per sec
		}
		

		//Has bot hit a bCrumb?
		var l = bCrumbs.getNumChildren(); //Get number of bCrumbs
		for (var i=0; i<l; i++){
			var hitBCrumb = bCrumbs.getChildAt(i); //For each bC

			var pt = hitBCrumb.localToLocal(UNIT.width*0.2, UNIT.height*0.2, bot); //Does a point in the middle of the bC hit the bot?
				
				if (hitBCrumb.hitTest(pt.x, pt.y)){									 //If a crumb is hit
					bot.handleBCrumbFunction(hitBCrumb.fn.task, hitBCrumb.fn.param); //Handle the function
					console.log("currentFn", hitBCrumb.fn);							 
					if (hitBCrumb.persistent === false){							 //If not persistent, remove from screen
						BCFn.resetBCrumb(hitBCrumb);
						hitBCrumb.visible = false;
						hitBCrumb.x = -100;
						hitBCrumb.y = -100;
					}
					console.log("hit!!!!!");
				}
		}
		stage.update();
	}
}





	
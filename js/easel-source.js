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
	stage, infoTxt, bot, bCrumbs, goTime,
	winCond = function (){if (bot.bucks >= 2){
							return true;
						}
						return false;
	};

	//Handlers

	function handlePxSnap(cursorX, cursorY) { //For use with non-grid-snapped elements Returns object {x: new x point, y: new y point}
		if (cursorX > CONTROLPANEL.width) { //Make sure we're still in the playground
			var xSnapped = (Math.round((cursorX) / UNIT.width) * UNIT.width); //Snaps to closest gird point.
		
			var ySnapped = (Math.round((cursorY) / UNIT.height) * UNIT.height); //Snaps to closest gird point.
			return {x: xSnapped, y: ySnapped}; //Return x,y snapped to closest unit
		}
						
		return {x: cursorX, y: cursorY}; // If we are not in the playground, allow the breadcrumb to move freely
	}

	function handleGridPtSnap(gridX, gridY) { //For use with grid-snapped elements Returns object {x: new x point, y: new y point}
			var xSnapped = CONTROLPANEL.width + UNIT.width * gridX;//Snaps to closest gird point.
		
			var ySnapped = UNIT.height * gridY; //Snaps to closest gird point.
			return {x: xSnapped, y: ySnapped}; //Return x,y snapped to closest unit
						
	}



	function isOnStage(shape){ //runs checks for each boundary and logs failure
		if (shape.x > STAGE.width){
			console.log("Right edge hit");
			return false;
		}
		else if(shape.x < CONTROLPANEL){
			console.log("Left edge hit");
			return false;
		}
		else if (shape.y < UNIT.height){
			console.log("Top edge hit");
			return false;
		}
		else if (shape.y > STAGE.height){
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
				if (bC.fn.task !== "setOrientation"){
					BCFn.resetBCrumb(bC);
					bC.visible = true;
				}
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

	home = new Home();
	stage.addChild(home);

	bot = new Bot();
	stage.addChild(bot);

	bCrumbs = BCFn.genBCrumbs();
	stage.addChild(bCrumbs);

	goTime = new GoTime();
	stage.addChild(goTime);

	infoTxt = new createjs.Text("", "bold 18px Arial", "#00000");
			infoTxt.name = "infoTxt";
			infoTxt.lineWidth = PLAYGROUND.width * 0.6;
			infoTxt.textAlign = "center";
			infoTxt.x = 500;//CONTROLPANEL.width;
			infoTxt.y = 50;
			infoTxt.textBaseline = "left";
			infoTxt.mission = "Collect 2 gold coins";
			infoTxt.text = "Mission: "+ infoTxt.mission + "  Inventory: " + bot.inventoryCap + "  $: " + bot.bucks;
	stage.addChild(infoTxt);

	///Win condition

	stage.update();

	

			ticker.addEventListener("tick", tick);
		
	stage.update();

	/***********Animation************/
	function tick(event) {
		
		if(bot.moving && isOnStage(bot)){
			bot.moveForward(event.delta / 1000 * 200); //ms since last tick / ms per s * px per sec
		}
		

		//Has bot hit a bCrumb?

		function notTooSoon(lastHit){
			console.log("lasthit", lastHit, "tickertime", ticker.getTime());
			if( lastHit + 75 < ticker.getTime()){
				return true;
			}
			else {
				return false;

			}
		}
		var l = bCrumbs.getNumChildren(); //Get number of bCrumbs
		for (var i=0; i<l; i++){
			var hitBCrumb = bCrumbs.getChildAt(i); //For each bC

			var bc = hitBCrumb.localToLocal(UNIT.width*0.4, UNIT.height*0.4, bot);//(-0.2 * UNIT.width, -0.2*UNIT.height, bot); //Does a point in the middle of the bC hit the bot?
				if (hitBCrumb.hitTest(bc.x, bc.y) && notTooSoon(hitBCrumb.lastHit)){	//If a crumb is hit and this was not just executed
				console.log("Breadcrumb hit", bc);
					
						bot.handleBCrumbFunction(hitBCrumb.fn.task, hitBCrumb.fn.param); //Handle the function
						hitBCrumb.lastHit = ticker.getTime();
						console.log("currentFn", hitBCrumb.fn, "bot", bot);
						if (hitBCrumb.persistent === false){	//If not persistent, remove from screen
							BCFn.resetBCrumb(hitBCrumb);
							hitBCrumb.visible = false;
							hitBCrumb.x = -100;
							hitBCrumb.y = -100;
					}

					infoTxt.text = "Mission: "+ infoTxt.mission + "  Inventory: " + bot.inventoryCap + "  $: " + bot.bucks;	//Update the infoTxt					
				}
		}

		//Has bot hit the Home

		// console.log(home.localToLocal(0.2 * UNIT.width, 0.7 *UNIT.height, bot));
		var hm = home.localToLocal(UNIT.width*0.5, UNIT.height*0.5, bot);
			if (home.hitTest(hm.x, hm.y)){
				bot.handleHomeHit();
			}


		//**********Hit test for home here, incl bot.orientation + unload cargo

		//Win condition
		if (winCond()){
			window.alert("You win!");
			goTime.handleGoTime();
		}
		stage.update();
	}
}
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
			console.log("Bottom edge hit");
			return false;
		}
		else if (shape.y > STAGE.height - UNIT.height){
			console.log("Top edge hit");
			return false;
		}
		else{
			return true;
		}
	}


		

function init() {
	stage = new createjs.Stage("demoCanvas");

	//Allows mouse tracking outside of the stage
	stage.mouseMoveOutside = true;

	stage.enableMouseOver();

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

	function resetBCrumb(bCrumb){
		bCrumb.x = bCrumb.defaultPos.x;
		bCrumb.y = bCrumb.defaultPos.y;
	}


	function resetPlayground(){
	//Reset bCrumb position
		var l = bCrumbs.getNumChildren(); //Get number of bCrumbs
		for (var i=0; i<l; i++){
			var bC = bCrumbs.getChildAt(i); //For each bC
			resetBCrumb(bC);
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
		bot
	}

	var bot = new createjs.Shape();
	bot.graphics.beginFill("gray").drawRoundRect(0, 0, UNIT.width * 0.8, UNIT.height * 0.8, 5);
	bot.defaultPos = {x: CONTROLPANEL.width, y: STAGE.height - UNIT.height};
	bot.x = bot.defaultPos.x;
	bot.y = bot.defaultPos.y;
	bot.inventory = [];
	bot.inventoryCap = 2;
	bot.bucks = 0;
	bot.orientation = "e";
	bot.moving = false;
	bot.moveForward = function(dist) {

		var newPos = handleMoveForward(dist, bot.orientation, bot.x, bot.y);
		bot.x = newPos.newX;
		bot.y = newPos.newY;

	};
	bot.handleBCrumbFunction = function handleBCrumbFunction(fn, param){
		if(bot.moving){ //Make sure the game is running
			
			switch (fn){
				case "setOrientation":
						if (param){ //An orientation is provided
							this.orientation = param; //Turn that direction
						}
					else {console.log("No orientation given!");}
					break;
				
				case "pickUpItem":
												
						if (this.inventoryCap >= param.capacity){ //If it can be held
								this.inventoryCap -= param.capacity; //Decrement the remaining bot capacity
								this.inventory.push(param); //Put a copy of the item into inventory
								this.bucks += param.bucks;  //Increment the bot's wallet
						}
						else {window.alert("No inventory space left");}
						break;
				}
			}
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
			setTimeout(function() {
			resetPlayground();
			console.log("Bot AAR", bot);
			},
			250);
		}

		goTime.progRunning = !goTime.progRunning;
	}

		var bCrumbs = new createjs.Container();
			bCrumbs.name = "bCrumbs";
			stage.addChild(bCrumbs);
			console.log(bCrumbs);

	(function(){

		genBCrumbs();
		genGoldCoins();
//Generation of bCrumbs
		

		function genBCrumbs(){
			var cols = 2;
			var rows = 4;
			var l = 8;
			var fns =  [{task: "setOrientation", param: "n"},
						{task: "setOrientation", param: "e"},
						{task: "setOrientation", param: "s"},
						{task: "setOrientation", param: "w"}
						];

			var labels = ["n", "e", "s", "w"];

			for(var i=0; i<l; i++) {
				var myFn = fns[i % fns.length];
				var myLabel = labels[i % labels.length];

				var bCrumb = new BCrumb(myLabel, myFn, true); //(label, fn, persistent?)
					bCrumb.x = UNIT.width + UNIT.width * (i % cols);
					bCrumb.y = UNIT.height + UNIT.height*Math.floor((i)/cols);
					bCrumb.defaultPos = {x: bCrumb.x, y: bCrumb.y};
					bCrumbs.addChild(bCrumb);
			}
		}

//Generation of gold
		function genGoldCoins(){

				var goldCoins = [{position: {x:2, y:3}, task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}},
								 {position: {x:4, y:6}, task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}},
								 {position: {x:8, y:8}, task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}
								];
				console.log("i", i);

				for(var i=0; i<goldCoins.length; i++){
					console.log("gcoins", goldCoins);
					var goldCoin = new BCrumb("$", goldCoins[i], false); // (label, fn, persistent?)
						goldCoin.x = CONTROLPANEL.width + UNIT.width * goldCoins[i].position.x;
						goldCoin.y = UNIT.height * goldCoins[i].position.y;
						goldCoin.defaultPos = {x : goldCoin.x, y: goldCoin.y};
						bCrumbs.addChild(goldCoin);
				}
		}

				stage.update();
			})();
	//Listeners
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
		if(bot.moving && isOnStage(bot)){
			bot.moveForward(event.delta / 1000 * 200);
		}
		

		//Has bot hit a bCrumb?
		var l = bCrumbs.getNumChildren(); //Get number of bCrumbs
		for (var i=0; i<l; i++){
			var hitBCrumb = bCrumbs.getChildAt(i); //For each bC

			var pt = hitBCrumb.localToLocal(UNIT.width*0.2, UNIT.height*0.2, bot); //Does a point in the middle of the bC hit the bot?
				
				if (hitBCrumb.hitTest(pt.x, pt.y)){
					bot.handleBCrumbFunction(hitBCrumb.fn.task, hitBCrumb.fn.param);
					console.log("currentFn", hitBCrumb.fn);
					if (hitBCrumb.persistent === false){
						resetBCrumb(hitBCrumb);
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





	
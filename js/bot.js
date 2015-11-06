//Class declaration
(function(){
	function Bot(){

		//Bot Functions

		var BotFn={};

BotFn.moveForward = function(dist) {

		var newPos = BotFn.handleMoveForward(dist, bot.orientation, bot.x, bot.y);
		bot.x = newPos.newX;
		bot.y = newPos.newY;

	};

BotFn.handleMoveForward = function handleMoveForward(dist, ori, x, y){ //Returns {newX: new X, newY: new Y} depending on direction faced
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
			console.log("Error: Bot orientation property \""+ ori + "\" is invalid");
		}
	};
function onGridPoint(x, y){ //Are x and y within 5px of a grid point
	var sP = handlePxSnap(x, y); //Nearest gird point

	console.log("x", Math.abs(sP.x-x), "y", Math.abs(sP.y-y));

	if (Math.abs(sP.x-x) < 15 && Math.abs(sP.y-y) < 15){
		return true;
	}
	return false;
}

BotFn.handleBCrumbFunction = function handleBCrumbFunction(fn, param){
		if(bot.moving){ //Make sure the game is running
		console.log("bot.handlebcrumbfunction", fn, param);
			switch (fn){
				case "setOrientation":
				console.log("a");
						if (param){ //An orientation is provided
							console.log("b");
								//if (onGridPoint(bot.x, bot.y)){
									console.log("c");
									var snapBot = handlePxSnap(bot.x, bot.y);
									bot.x = snapBot.x;
									bot.y = snapBot.y;
									this.orientation = param; //Turn that direction
								// }
								// else {
								// 	console.log("else!!!!");
								// 	setTimeout(function() {handleBCrumbFunction(fn, param);}, 100);
									
								// }
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

BotFn.handleHomeHit = function hanldleHomeHit(){
	if (bot.moving){ //If game is running
		home.inventory.push(bot.inventory); //Home absorbs all the bot's goodies
		home.bucks += bot.bucks;

		bot.orientation = home.orientation; //Points the bot in the right direction
		bot.inventory = [];					//And empties it out
		bot.bucks = 0;
		}
	};

	//Class declaration
		this.Shape_constructor();
		this.graphics.beginFill("gray").drawRoundRect(0, 0, UNIT.width * 0.8, UNIT.height * 0.8, 5); // x  y  w  h  radius 
		this.defaultPos = handlePxSnap(CONTROLPANEL.width, STAGE.height - UNIT.height);
		this.x = this.defaultPos.x;
		this.y = this.defaultPos.y;
		this.inventory = [];
		this.inventoryCap = 2;
		this.bucks = 0;
		this.orientation = "e";
		this.moving = false;
		
		this.moveForward = BotFn.moveForward;
		this.handleBCrumbFunction = BotFn.handleBCrumbFunction;
		this.handleHomeHit = BotFn.handleHomeHit;
	//	});
	}

	var b = createjs.extend(Bot, createjs.Shape);

	window.Bot = createjs.promote(Bot, "Shape");
}());



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

BotFn.handleBCrumbFunction = function handleBCrumbFunction(fn, param){
		console.log("a");
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

	//Class declaration
		this.Shape_constructor();
		this.graphics.beginFill("gray").drawRoundRect(0, 0, UNIT.width * 0.8, UNIT.height * 0.8, 5);
		this.defaultPos = {x: CONTROLPANEL.width, y: STAGE.height - UNIT.height};
		this.x = this.defaultPos.x;
		this.y = this.defaultPos.y;
		this.inventory = [];
		this.inventoryCap = 2;
		this.bucks = 0;
		this.orientation = "e";
		this.moving = false;
		
		this.moveForward = BotFn.moveForward;
		this.handleBCrumbFunction = BotFn.handleBCrumbFunction;
	}

	var b = createjs.extend(Bot, createjs.Shape);

	window.Bot = createjs.promote(Bot, "Shape");
}());



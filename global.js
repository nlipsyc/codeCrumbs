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
	BCFn = BC;
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
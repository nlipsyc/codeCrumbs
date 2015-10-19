//Constants
var STAGE = {width: 800, height: 500},
	PLAYGROUND = {width : 500, height: 500},
	CONTROLPANEL = {width: 300, height: 500},
	GRID = {col: 10, row: 10},
	UNIT = {x: PLAYGROUND.width/GRID.col, y: PLAYGROUND.height/GRID.row},
	stage, bot,
	ticker = createjs.Ticker;


	
function init(){
	stage = new createjs.Stage("demoCanvas");

	//Allows mouse tracking outside of the stage
	stage.mouseMoveOutside = true; 

	stage.enableMouseOver();

	bot = new createjs.Shape();
	bot.graphics.beginFill("gray").drawRoundRect(0, 0, UNIT.x*0.8, UNIT.y*0.8, 5);
	bot.x = CONTROLPANEL.width;
	bot.y = STAGE.height-UNIT.y;
	stage.addChild(bot);

	// line = new createjs.Shape();
	// stage.addChild(line);

	stage.update();

//Mouse events

	bot.on("pressmove", function(evt){
		evt.currentTarget.x = handleXSnap(evt.stageX);
		evt.currentTarget.y = handleYSnap(evt.stageY);

	
	function handleXSnap(cursorPos){
		if(cursorPos>CONTROLPANEL.width){ //Make sure we're still in the playground
			return Math.round((cursorPos-UNIT.x/2)/UNIT.x)*UNIT.x; //Snaps to closest gird point.
		}
		return CONTROLPANEL.width;
		}	
	
	function handleYSnap(cursorPos){
// console.log(cursorPos, Math.round((cursorPos-UNIT.y/2)/UNIT.y)*UNIT.y);

			return Math.round((cursorPos-UNIT.y/2)/UNIT.y)*UNIT.y; //Snaps to closest gird point.
		}	
	
	stage.update();
	});
		// circle.on("click", function(){
		// 	if(circle.x%2===0){
		// 		circle.x+=51;
		// 	}
		// 	else{
		// 		circle.x-=51;
		// 	}
		// 	stage.update();
		// });
		// circle.on("mouseover", function(event){
		// 	console.log("mouseover");
		// 	circle.graphics.clear().beginFill("purple").drawCircle(0,0,50);
		// 	stage.update();
		// });
		// circle.on("mouseout", function(event){
		// 	console.log("mouseout");
		// 	circle.graphics.clear().f("DeepSkyBlue").dc(0,0,50);
		// 	stage.update();
		// });

	// square.on("pressmove", function(evt){
	// 	evt.currentTarget.x = evt.stageX;
	// 	evt.currentTarget.y = evt.stageY;

	// 	stage.update();
	// });
	// circle.on("click", function(event){
	// 	console.log("click!");
	// 	strokeColour = createjs.Graphics.getHSL(Math.random()*360, 100, 50);
	// 	strokeWeight = 20*Math.random();

	// 	handleDraw();
	// });


	ticker.addEventListener("tick", tick);
}


// /**********Drawing*******/


	// function handleDraw(){
	// 	drawShown=!drawShown;

	// 	console.log(drawShown);

	// 	stage.on("stagemousemove", function(evt){

	// 		if(oldX && drawShown){
	// 			line.graphics.beginStroke(strokeColour)
	// 							.setStrokeStyle(strokeWeight,"round")
	// 							.moveTo(oldX,oldY)
	// 							.lineTo(evt.stageX, evt.stageY);
	// 			stage.update();
	// 		}
	// 		oldX = evt.stageX;
	// 		oldY = evt.stageY;
	// 	});
	// 	stage.update();
	// }

/***********Animation************/
function tick(event){
			//ms since last tick / ms per s * px per sec

	//Hit test
	
	// var pt = square.localToLocal(12, 12, circle);

	// console.log("square", pt.x, pt.y);
	// console.log("circle", circle.x, circle.y);
	
	// if (circle.hitTest(pt.x, pt.y)){
	// 	console.log('hit');
	// 	circle.alpha = 0.5;
	// }

	stage.update();
}
	
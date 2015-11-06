(function(){
	function Home(){

			this.Container_constructor();
			this.name  = "home";
			this.position = handleGridPtSnap(0,9);
			this.x = this.position.x;
			this.y = this.position.y;
			this.orientation = "e";
			this.inventory = [];
			this.bucks = 0;

			this.setup();

		}

		var h = createjs.extend(Home, createjs.Container);

		h.setup = function(){
			var square = new createjs.Shape();
				square.graphics.beginFill("red").dr(0, UNIT.height * 0.4, UNIT.width*0.8, UNIT.height * 0.4);

			var triangle = new createjs.Shape();
				triangle.graphics.beginFill("red").dp(UNIT.width * 0.4, UNIT.height * 0.4, UNIT.width * 0.4, 3, 0, -90);//x,y,r, #sides, point depth, angle of 1st point
			//	triangle.setTransform(0, 0, 1.2, 1);

			this.addChild(square, triangle);
		};
		window.Home = createjs.promote(Home, "Container");
}());
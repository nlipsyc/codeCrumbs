(function(){
	function Home(){

			this.Container_constructor();
			this.name  = "home";
			this.x = CONTROLPANEL.width;
			this.y = PLAYGROUND.height - UNIT.height * 1.5;
			this.orientation = "e";
			this.inventory = [];
			this.bucks = 0;

			this.setup();

		}

		var h = createjs.extend(Home, createjs.Container);

		h.setup = function(){
			var square = new createjs.Shape();
				square.graphics.beginFill("red").dr(0, UNIT.height * 0.5, UNIT.width, UNIT.height);

			var triangle = new createjs.Shape();
				triangle.graphics.beginFill("red").dp(UNIT.width * 0.5, UNIT.height * 0.4, UNIT.width * 0.6, 3, 0, -90);//x,y,r, #sides, point depth, angle of 1st point
				triangle.setTransform(0, 0, 1, 0.75);

			this.addChild(square, triangle);
		};
		window.Home = createjs.promote(Home, "Container");
}());
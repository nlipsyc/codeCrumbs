//////////////BCrumb class declaration

(function(){
	function BCrumb(label, fn, persistent){

		this.Container_constructor();
		this.label = label;
		this.fn = fn;
		this.persistent = persistent;
		this.on("pressmove", function(evt) {
			var snapped = handleSnap(evt.stageX, evt.stageY);
			//	if (!goTime.progRunning){ ******Need to lock this so it only happens when game is paused****
				evt.currentTarget.x = snapped.x;
				evt.currentTarget.y = snapped.y;
			//	}
			});

		this.setup();
		}
	var b = createjs.extend(BCrumb, createjs.Container);

	b.setup = function(){
		var bcBkg = new createjs.Shape();
			bcBkg.graphics.beginFill("#234567").dc(0,0, UNIT.width*0.4);

		var bcLabel = new createjs.Text(this.label, "bold 18px Arial", "#FFFFFF");
			bcLabel.name = this.label;
			bcLabel.textAlign = "center";
			bcLabel.y = -UNIT.width*0.2;
			textBaseline = "center";

		this.addChild(bcBkg, bcLabel);
	};

		window.BCrumb = createjs.promote(BCrumb, "Container");
	}());




//BCrumb functions


var BC = {};
	BC.resetBCrumb = function resetBCrumb(bCrumb){
			bCrumb.x = bCrumb.defaultPos.x;
			bCrumb.y = bCrumb.defaultPos.y;
		};
			

	BC.genBCrumbs = function genBCrumbs(){
		var bCrumbs = new createjs.Container();
		bCrumbs.name = "bCrumbs";

		function genFnBCrumbs(){

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

		function genGoldCoins(){
		
		var goldCoins = new createjs.Container();
			goldCoins.name = "goldCoins";

		var coins = [{position: {x:2, y:3}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}},
					 {position: {x:4, y:6}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}},
					 {position: {x:8, y:8}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}}
						];

		for(var i=0; i<coins.length; i++){
			var goldCoin = new BCrumb("$", coins[i].fns, false); // (label, fn, persistent?)
				goldCoin.x = CONTROLPANEL.width + UNIT.width * coins[i].position.x;
				goldCoin.y = UNIT.height * coins[i].position.y;
				goldCoin.defaultPos = {x : goldCoin.x, y: goldCoin.y};
				bCrumbs.addChild(goldCoin);
		}}
			genFnBCrumbs();
			genGoldCoins();
			return bCrumbs;
	};
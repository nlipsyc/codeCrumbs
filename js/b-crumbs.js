//////////////BCrumb class declaration

(function(){
	function BCrumb(label, fn, persistent, colours){

		this.Container_constructor();
		this.label = label;
		this.fn = fn;
		this.persistent = persistent;
		this.lastHit = 0;
		this.on("pressmove", function(evt) {
			if (this.fn.task === "setOrientation" && !goTime.progRunning){ //Don't move gold coins, or anything while it's running
				var snapped = handlePxSnap(evt.stageX, evt.stageY);
					evt.currentTarget.x = snapped.x;
					evt.currentTarget.y = snapped.y;
				}
			});
		this.setup(colours);
		}
	var b = createjs.extend(BCrumb, createjs.Container);

	b.setup = function(colours){
		var bcBkg = new createjs.Shape();
			bcBkg.graphics.beginFill(colours.fill).dc(UNIT.width*0.4, UNIT.height*0.4, UNIT.width*0.4);

		var bcLabel = new createjs.Text(this.label, "bold 18px Arial", colours.text);
			bcLabel.name = this.label;
			bcLabel.textAlign = "center";
			bcLabel.x = UNIT.width*0.4;
			bcLabel.y = UNIT.height*0.2;
			textBaseline = "center";

		this.addChild(bcBkg, bcLabel);
		this.alpha = 0.8;
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

		function genFnBCrumbs(){  //BCrumb(label, fn, persistent, colours)

			var cols = 2;
			var rows = 4;
			var l = 8;
			var fns =  lr.FnBCrumbs;

			for(var i=0; i<l; i++) {
				var myFn = fns[i % fns.length].fns;
				var myLabel = fns[i % fns.length].label;
				var myPersistent = fns[i % fns.length].persistent;

				var bCrumb = new BCrumb(myLabel, myFn, myPersistent, {fill: "#123456", text: "#FFFFFF"}); //(label, fn, persistent?)
					bCrumb.x = UNIT.width + UNIT.width * (i % cols);
					bCrumb.y = UNIT.height + UNIT.height*Math.floor((i)/cols);
					bCrumb.defaultPos = {x: bCrumb.x, y: bCrumb.y};
					bCrumb.defaultPersistent = bCrumb.persistent;
					bCrumbs.addChild(bCrumb);
			}
		}

		function genGoldCoins(){
		
		var goldCoins = new createjs.Container();
			goldCoins.name = "goldCoins";

		var coins = lr.goldCoins;

		for(var i=0; i<coins.length; i++){
			console.log("gc buildup persistent", coins[i]);
			var goldCoin = new BCrumb("$", coins[i].fns, coins[i].persistent, {fill: "yellow", text: "black"}); // (label, fn, persistent?)
				goldCoin.defaultPos = handleGridPtSnap(coins[i].position.x, coins[i].position.y);
				goldCoin.defaultPersistent = goldCoin.persistent;
				goldCoin.x = goldCoin.defaultPos.x;
				goldCoin.y = goldCoin.defaultPos.y;
				bCrumbs.addChild(goldCoin);
		}}
			genGoldCoins();
			genFnBCrumbs();
			return bCrumbs;
	};
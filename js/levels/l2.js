var l2 = {};

l2.winCond = function (){if (home.bucks >= 2){
							return true;
						}
						return false;
						};

l2.goldCoins =[{position: {x: 2, y: 3}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}, persistent: 1},
				{position: {x: 4, y: 6}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}, persistent: 1},
				{position: {x: 8, y: 8}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}, persistent: 1}
			];

l2.FnBCrumbs =[{fns: {task: "setOrientation", param: "n"}, label:"n", persistent: 2},
				{fns: {task: "setOrientation", param: "e"}, label:"e", persistent: 2},
				{fns: {task: "setOrientation", param: "s"}, label:"s", persistent: 2},
				{fns: {task: "setOrientation", param: "w"}, label:"w", persistent: 2}
			];

l2.infoTxt = {};
l2.infoTxt.mission = "Collect 2 gold coins";
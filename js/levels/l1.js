var l1 = {};

l1.winCond = function (){if (bot.bucks >= 2){
							return true;
						}
							return false;
						};
l1.goldCoins ={coins: [{position: {x: 2, y: 3}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}},
						{position: {x: 4, y: 6}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}},
						{position: {x: 8, y: 8}, fns: {task: "pickUpItem", param: {itemName: "goldCoin", capacity: 1, bucks: 1}}}
						]};

l1.FnBCrumbs ={fns: [{task: "setOrientation", param: "n"},
					{task: "setOrientation", param: "e"},
					{task: "setOrientation", param: "s"},
					{task: "setOrientation", param: "w"}
					],
				labels: ["n", "e", "s", "w"]};

l1.infoTxt = {mission: "Collect 2 gold coins"};
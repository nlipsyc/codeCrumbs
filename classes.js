(function(){
	function BCrumb(label, fn){
		this.Container_constructor();
		this.label = label;
		this.fn = fn;
		this.on("pressmove", function(evt) {
				var snapped = handleSnap(evt.stageX, evt.stageY);

				evt.currentTarget.x = snapped.x;
				evt.currentTarget.y = snapped.y;

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
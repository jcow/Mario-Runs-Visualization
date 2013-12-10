var table_deaths = {
	canvas:null,
	ctx:null,
	death_radius:8,
	death_items:{
		hole1:{text:"Hole 1", xy:[325,290], color:'ff0000'},
		hole2:{text:"Hole 2", xy:[1518,310], color:'C42D2D'},
		hole3:{text:"Hole 3", xy:[1870,290], color:'ff3d00'},
		hole4:{text:"Hole 4", xy:[2070,290], color:'003dc2'},
		hole5:{text:"Hole 5", xy:[2260,290], color:'ff7a00'},
		hole6:{text:"Hole 6", xy:[2931,290], color:'ff9900'},
		hole7:{text:"Hole 7", xy:[3105,290], color:'ffb800'},
		hole8:{text:"Hole 8", xy:[3972,290], color:'ffd600'},
		pulley1:{text:"Pulley 1", xy:[2542,207], color:'fff500'},
		pulley2:{text:"Pulley 2", xy:[3525,140], color:'fff500'},
		lava1:{text:"Lava 1", xy:[5100,290], color:'ccff00'},
		lava2:{text:"Lava 2", xy:[5613,250], color:'adff00'},
		elevator:{text:"Elevator", xy:[4438,290], color:'ff9900'},
		fire1:{text:"Firebar 1", xy:[4895,220], color:'70ff00'},
		fire2:{text:"Firebar 2", xy:[6420,27], color:'6CD9E0'},
		goomba1:{text:"Goomba 1", xy:[815,195], color:'007a85'},
		goomba2:{text:"Goomba 2", xy:[974,244], color:'005ca3'},
		goomba3:{text:"Goomba 3", xy:[2148,237], color:'007a85'},
		goomba4:{text:"Goomba 4", xy:[2780,253], color:'005ca3'},
		goomba5:{text:"Goomba 5", xy:[3865,234], color:'C42D2D'},
		goomba6:{text:"Goomba 6", xy:[5251,90], color:'009966'},
		turkey1:{text:"Koopa Troopa 1 ", xy:[3789,42], color:'007a85'},
		turkey2:{text:"Koopa Troopa 2 ", xy:[4125,206], color:'005ca3'},
		chompy1:{text:"Piranha Plant 1 ", xy:[5015,160], color:'ffd600'},
		chompy2:{text:"Piranha Plant 2", xy:[5837,269], color:'ff9900'},
		bowser:{text:"Bowser ", xy:[6615,70], color:'ff0000'}
	},
	death_points: {
		hole1:[[320,330]],
		goomba1:[[750,275]],
		goomba2:[[945,289]],
		hole2:[[1465,318],[1600,320]],
		hole3:[[1860,330]],
		hole4:[[2075,325]],
		goomba3:[[100000,100000]],
		hole5:[[2215,330],[2322,330]],
		pulley1:[[2450,330],[2575,330]],
		goomba4:[[2740,290]],
		hole6:[[2875,330],[3000,330]],
		hole7:[[3015,330],[3200,330]],
		pulley2:[[3360,330],[3630,330]],
		turkey1:[[3776,70]],
		goomba5:[[3832,260]],
		hole8:[[3970,330]],
		turkey2:[[4151,250]],
		elevator:[[4435,330]],
		fire1:[[4762,235],[4843,241]],
		chompy1:[[5004,210]],
		lava1:[[5100,330]],
		goomba6:[[5214,120]],
		lava2:[[5564,330]],
		chompy2:[[5969,181]],
		fire2:[[6343,49],[6372,73]],
		bowser:[[6178,196],[6256,124],[6393,94],[6463,125],[6673,128]]
	},

	init:function(){
		this.canvas = document.getElementById('death_table_canvas');
		if (this.canvas.getContext){
			this.ctx = this.canvas.getContext('2d')
			return true;
		}
		else{
			return false;
		}
	},
	draw:function(){
		this.draw_background()
		this.draw_text()
		this.draw_deaths()
	},

	draw_deaths:function(){
		var deaths = this.get_deaths()
		var death_count = 0;
		for(var i in deaths){
			death_count++
		}
		var counter = 0
		for(var i in deaths){
			var dths = deaths[i]
			this.ctx.strokeStyle = '#333'
			this.ctx.fillStyle = '#'+this.death_items[i].color 

			for(var j in dths){
				this.ctx.beginPath();
				this.ctx.arc(dths[j].x,dths[j].y,this.death_radius,0,2*Math.PI);
				this.ctx.stroke();
				this.ctx.fill();
				this.ctx.closePath();
			}
			counter++;
		}
		
	},

	draw_text:function(){
		this.ctx.font="16px Arial bold";

		for(var i in this.death_items){
			var item = this.death_items[i]
			var text_width = this.ctx.measureText(item.text).width
			this.ctx.fillStyle = '#'+item.color 
			this.ctx.fillText(item.text, item.xy[0]-(text_width/2), item.xy[1]);
		}
	},

	draw_background:function(){
		this.ctx.drawImage(loader.get_background_image(), 0, 0)
	},

	get_deaths: function(){
		var ret = {}
		for(var i in replays){
			var dths = replays[i].deaths
			
			for(var j in dths){

				var min_obj = {}
				var item_text = ""
				var min_dist = 100000000000
				for(var k in this.death_points){
					for(var h in this.death_points[k]){ // 4th lvl achieved! *shudder
						var x1 = dths[j].x
						var y1 = dths[j].y
						var x2 = this.death_points[k][h][0]
						var y2 = this.death_points[k][h][1]

						var dist = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
						if(dist < min_dist){
							min_dist = dist
							item_text = k
							obj = {x:x1,y:y1}
						}
					}	
				}
				if(!ret.hasOwnProperty(item_text)){
					ret[item_text] = []
				}
				ret[item_text].push(obj)
			}
		}
		return ret
	}
}
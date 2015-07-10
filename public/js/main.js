var height = window.innerHeight;
var width = window.innerWidth;
var coordinates;

var mouseX;
var mouseY;

var dsGui;
var gui;


function sketchProc(p5) {
var gears = [];
var joints = [];
var drawing = [];

var gearNum = 2;
var jointNum = 1;

var deltaTime;
var frameCount;

p5.setup = function() {
	p5.size(width-40, height-40);

	for(var i = 0; i < jointNum; i++) {
		joints[i] = new jointClass();
	}

	for(var j= 0; j < gearNum; j++) {
		gears[j] = new gearClass();
		var d = calcDist(gears[j].p.x, gears[j].p.y);
		gears[j].dist = d;
	}

	dsGui = new FizzyText(gears[0].dist, gears[1].dist, gears[0].speed, gears[1].speed);
	gui = new dat.GUI();

	gui.add(dsGui, 'Gear1Distance', 0, 1000);
	gui.add(dsGui, 'Gear2Distance', 0, 1000);
	gui.add(dsGui, 'Gear1Speed', 0, 10);
	gui.add(dsGui, 'Gear2Speed', 0, 10);
	//gui.add(dsGui, 'displayOutline');

};

function update() {
		gears[0].dist = dsGui.Gear1Distance;
		gears[1].dist = dsGui.Gear2Distance;
		gears[0].speed = dsGui.Gear1Speed;
		gears[1].speed = dsGui.Gear2Speed;

		if(frameCount % 3 == 0){
			joints[0].save();
		}

		if(drawing.length > 200){
			drawing = [];
			//drawing.pop();
		}
}

p5.draw = function() {
	update();
	p5.background(255,255,255);

	deltaTime = 1/60;
	frameCount = p5.frameCount;

	for(var i = 0; i < gears.length; i++){
		gear = gears[i];

		gear.jointUpdate();
		gear.update();
		gear.rollover(mouseX, mouseY);
		gear.drag(mouseX, mouseY);
		gear.draw();
	}

	keepDistInit();
	drawConnection();

	drawDrawing();
	parseToDB();
	//console.log(dsGui.speed);

};

//****************************************************//
//******************** GUI ***************************//
//***************************************************//
var FizzyText = function(dist1, dist2, speed1, speed2) {
  //this.message = 'dat.gui';
  
  this.Gear1Distance = dist1;
  this.Gear2Distance = dist2;
  this.Gear1Speed = speed1;
  this.Gear2Speed = speed2;

  this.color1 = [ 255, 255, 255 ]; // RGB array

  this.explode = function() {};
  
};

//***************************************************//
//**************** PARSE TO DB **********************//
//***************************************************//

function parseToDB(){
	for(var i = 0; i < gears.length; i++){
		gear = gears[i];
		if(i == 0) {
			$('input#g1X').val(parseInt(gear.p.x));
			$('input#g1Y').val(parseInt(gear.p.y));
			$('input#g1jX').val(parseInt(gear.j.x));
			$('input#g1jY').val(parseInt(gear.j.y));
			$('input#g1dirc').val(parseInt(gear.dirc));
			$('input#g1Jradius').val(parseInt(gear.jointRadius));
			$('input#g1outerR').val(parseInt(gear.outerR));
		}else {
			$('input#g2X').val(parseInt(gear.p.x));
            $('input#g2Y').val(parseInt(gear.p.y));
            $('input#g2jX').val(parseInt(gear.j.x));
			$('input#g2jY').val(parseInt(gear.j.y));
			$('input#g2dirc').val(parseInt(gear.dirc));
            $('input#g2Jradius').val(parseInt(gear.jointRadius));
            $('input#g2outerR').val(parseInt(gear.outerR));
		}
        $('input#jX').val(parseInt(joints[0].p.x));
        $('input#jY').val(parseInt(joints[0].p.y));
	}
}

//***************************************************//
//**************** GEAR CLASS ***********************//
//***************************************************//
function gearClass() {
	
    this.p = new PVector(getRandomArbitrary(width/3, width/3*2), getRandomArbitrary(height/3, height/3*2));
    this.j = new PVector(getRandomArbitrary(10, 30), getRandomArbitrary(10, 30));
    this.jointRadius = getRandomArbitrary(20, 30);
    this.dirc = parseInt(getRandomArbitrary(0, 2));
    this.dist = 0;
    this.innerR = 20;
    this.outerR = getRandomArbitrary(40, 80);
    this.dragging = false;
    this.rolloverG = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.speed = getRandomArbitrary(.5,1);
    
    this.update = function update() {
		this.rotateGear();
		
    };

    this.jointUpdate = function jointUpdate(){
        var theta = p5.map(frameCount * deltaTime, 0, 5, 0, p5.TWO_PI);
        theta = theta * this.speed;

        if(this.dirc == 0){
				theta = -theta;
		}

        this.j.x = this.p.x + p5.cos(theta) * this.jointRadius;
        this.j.y = this.p.y + p5.sin(theta) * this.jointRadius;
    };

    this.draw = function draw() {
        p5.strokeWeight(1);
        p5.fill(255,255,255);
        p5.ellipse(this.p.x, this.p.y, this.innerR, this.innerR);
        p5.fill(255,255,0);
        p5.ellipse(this.j.x, this.j.y, 3, 3);
    };

    this.drawGear = function drawGear(){
		var outOuterR = this.outerR * 0.85;
        var outerFlag = false;
        if(this.dragging){
            p5.fill(255,255,0);
        }else if(this.rolloverG){
            p5.fill(255,0,0);
        }else {
            p5.fill(255,0,255);
        }

        var cogs = parseInt(p5.map(this.outerR, 30, 80, 20, 8));
        if (cogs % 2 != 0 ) {
    		cogs--;
		}

        p5.strokeWeight(1);
        p5.beginShape();
        for(var i = 0; i < 360; i += cogs){
            var r = outerFlag ? outOuterR : this.outerR;
            var x = p5.cos(p5.radians(i)) * r;
            var y = p5.sin(p5.radians(i)) * r;
            p5.vertex(x, y);
    
            r = outerFlag ? this.outerR : outOuterR;
            x = p5.cos(p5.radians(i)) * r;
            y = p5.sin(p5.radians(i)) * r;
            p5.vertex(x, y);
            outerFlag = !outerFlag;
        }
        p5.endShape(p5.CLOSE);
    };

    this.rotateGear = function rotateGear(){
        p5.pushMatrix();
        p5.translate(this.p.x, this.p.y);
        var torSpeed = p5.map(this.speed, 0, 100, 100, 0);
        if(this.dirc == 0){
				torSpeed = -torSpeed;
		}

        p5.rotate(frameCount / torSpeed);
        this.drawGear();
        p5.popMatrix();
    };

    this.rollover = function rollover(mX, mY){
        if (mX > this.p.x && mX < this.p.x + this.outerR && mY > this.p.y && mY < this.p.y + this.outerR){
            this.rolloverG = true;
        }else {
            this.rolloverG = false;
        }
    };

    this.clicked = function clicked(mX, mY){
        if (mX > this.p.x && mX < this.p.x + this.outerR && mY > this.p.y && mY < this.p.y + this.outerR){
            this.dragging = true;
            this.offsetX = this.p.x - mX;
            this.offsetY = this.p.y - mY;
        }
    };

    this.stopDragging = function stopDragging(){
        this.dragging = false;
    };

    this.drag = function drag(mX, mY){
        if(this.dragging){
            this.p.x = mX + this.offsetX;
            this.p.y = mY + this.offsetY;

            drawing.length = 0;
        }
    };

}
//****************** GEAR END ***********************//
//***************************************************//


//***************************************************//
//**************** JOINT CLASS ***********************//
//***************************************************//
function jointClass(x, y) {
	this.p = new PVector(getRandomArbitrary(width/3, width/3*2), getRandomArbitrary(height/3, height/3*2));
	this.ex = getRandomArbitrary(10, 40);
	this.save = function save(){
			drawing.push({
					p: {
						x: this.p.x,
						y: this.p.y
					},
			});
	};

	this.draw = function draw() {
		p5.fill(255,0,255);
		p5.ellipse(this.p.x, this.p.y, 5,5);
	};

}
//****************** JOINT END ***********************//
//***************************************************//

function calcDist(_x, _y){
	var d = p5.dist(joints[0].p.x, joints[0].p.y, _x, _y);
	return d;
}

function drawConnection(){
	for(i = 0; i < gears.length;i++){
		gear = gears[i];
		joints[0].draw();
		p5.noFill();
		p5.stroke(0,0,0);
		p5.strokeWeight(4);
		p5.beginShape();
		p5.vertex(gear.j.x, gear.j.y);
		p5.vertex(joints[0].p.x, joints[0].p.y);
		//p5.vertex(joints[0].p.x + joints[0].ex, joints[0].p.y + joints[0].ex); //3D FLY
		p5.endShape(p5.CLOSE);
		//p5.line(joints[0].p.x, joints[0].p.y, joints[0].p.x + joints[0].ex, joints[0].p.y  joints[0].ex);
	}
}

function drawDrawing(){
	for(var i = 0; i < drawing.length; i++){
		p5.fill(0,0,0);
		p5.ellipse(drawing[i].p.x, drawing[i].p.y, 0.2, 0.2);
	}
}

function keepDistInit(){
	var gear = new PVector;
	var gear2 = new PVector;
	gear = gears[0];
	gear2 = gears[1];

	var joint = joints[0];

	keepDist(gear.j, joint.p, gear.dist);
	keepDist(gear2.j, joint.p, gear2.dist);
}

function keepDist(_p1, _p2, D){
	var dx, dy, lx, ly;
    var L;
    dx=_p2.x-_p1.x;
    dy=_p2.y-_p1.y;
    var v1 = new PVector(dx,dy);
    L = v1.mag();
    L = 0.5 * (1-(D/L));
    lx=L*dx;
    ly=L*dy;
    joints[0].p.x-=lx;
    joints[0].p.y-=ly;
}

p5.mousePressed = function() {
	for(i = 0; i < gears.length;i++){
		gear = gears[i];
		gear.clicked(mouseX, mouseY);
	}
};

p5.mouseReleased = function() {
	for(i = 0; i < gears.length;i++){
		gear = gears[i];
		gear.stopDragging();
	}
};

//***************************************************//
//**************** END SKETCH ***********************//
//***************************************************//
}

//Math
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


function getMousePos(mycanvas, evt) {
         var rect = mycanvas.getBoundingClientRect();
         mouseY= evt.clientY - rect.top;
         mouseX= evt.clientX - rect.left;
}

function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
};

downloadLnk.addEventListener('click', download, false);

var canvas = document.getElementById("canvas1");
canvas.addEventListener('mousemove', function(evt) {getMousePos(canvas, evt);}, false);
//attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
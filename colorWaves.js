function ColorBar (context, width, height) {
	this.context = context;
	this.width = width;
	this.height = height;
	this.frequency = 0.2;
	this.phaseShift = 0.0;
	this.panelCount = 100;
	this.panelWidth = this.width/this.panelCount;
	this.panelColors = [];
	this.flipSpeed = 35;
	this.state = 0;
	this.length = 900;
	this.frame = 0;
	this.flip = false;
	
}
ColorBar.prototype.recalcColors = function () {
	var redFreq = 0.8 + this.frequency, 
		greenFreq = 0.4 + this.frequency,
		blueFreq = 0.2 + this.frequency;

	for (var i =0; i < this.panelCount*2; i+=1) {
		red   = Math.sin(redFreq*i + 0) * 127 + 128;
   		green = Math.sin(greenFreq*i + 0) * 127 + 128;
   		blue  = Math.sin(blueFreq*i + 0) * 127 + 128;

   		this.panelColors[i] = utils.RGB2Color(red, green, blue);
	}
}
ColorBar.prototype.draw = function () {
	//this.context.save();
	this.recalcColors();

	for (var i = 0; i < this.panelCount; i++) {
		
		// fill with first color
		this.context.fillStyle = "#333";
		this.context.fillRect(this.panelWidth*i, 0, this.panelWidth*i + this.panelWidth, this.height);
		
		// fill with color
		this.context.fillStyle = this.panelColors[i];
		if (this.flip) {
			this.flipPanel(i);
		} else {
			this.fullColor(i);
		}
		// right border
		//this.context.fillStyle = "#333";
		//this.context.fillRect(this.panelWidth*i + this.panelWidth - 0.3, 0, this.panelWidth*i + this.panelWidth, this.height);
		
		
	}
	//this.context.restore();
}
ColorBar.prototype.fullColor = function(i) {
	this.context.fillRect(this.panelWidth*i, 0, this.panelWidth*i + this.panelWidth, this.height);
}

ColorBar.prototype.flipPanel = function(i) {

	if (i == this.panelCount - 1 ) {
		if (this.frame < this.length) {
			this.frame ++;
		} else {
			this.frame = 0;
			this.state = (this.state == 0) ? 1 : 0;
		}
	}


	var d = ((this.frame*this.flipSpeed - 360*(this.panelCount - this.panelCount*(i/this.panelCount))  )/(this.length/2));

	if (this.frame < (this.length/2)) {
		this.context.fillRect(this.panelWidth*i, (this.height/2)*d, this.panelWidth*i + this.panelWidth, (this.height - (this.height*d) ) );
	} else if (this.frame < this.length) {
		// d is 2
		this.context.fillRect(this.panelWidth*i, ((this.height) - (this.height/2)*d), this.panelWidth*i + this.panelWidth, ((this.height*d) - this.height) );
	} else {

		this.context.fillRect(this.panelWidth*i, 0, this.panelWidth*i + this.panelWidth, this.height);
	}
	
	
}
ColorBar.prototype.callFlip = function() {
	this.flip = true;
}



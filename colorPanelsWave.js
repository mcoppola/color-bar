function ColorPanels (container, width, height) {
	this.box = container;
	this.width = width*2;
	this.height = height;
	this.panelCount = 40;
	this.panelWidth = this.width/this.panelCount;
	this.panelHeight = height;
	this.panelColors = [];
	this.colorOffset = 0;

	this.makeColors();
	this.makePanel();

}

ColorPanels.prototype.makeColors = function () {
	var frequency = 0.2;

	var redFreq = 0.8 + frequency, 
		greenFreq = 0.4 + frequency,
		blueFreq = 0.2 + frequency;

	for (var i =0; i < this.panelCount*2; i+=1) {
		red   = Math.sin(redFreq*i + 0) * 127 + 128;
   		green = Math.sin(greenFreq*i + 0) * 127 + 128;
   		blue  = Math.sin(blueFreq*i + 0) * 127 + 128;

   		this.panelColors[i] = utils.RGB2Color(red, green, blue);
	}
}


ColorPanels.prototype.makePanel = function() {

	for (var i=0; i < this.panelCount; i++) {

		var div = document.createElement('div');
		div.className = 'color-panel';
		if (Math.random() < 0.5) {
			div.setAttribute("style","width:" + (this.panelWidth + (this.panelWidth/2)*Math.random()) + "px; height:" + this.panelHeight + "px");
		} else {
			div.setAttribute("style","width:" + (this.panelWidth - (this.panelWidth/2)*Math.random()) + "px; height:" + this.panelHeight + "px");
		}

		div.setAttribute("id","panel-" + i);
		div.style.background = this.panelColors[i];



		this.box.appendChild(div);
	}
}

ColorPanels.prototype.flipColors = function(offset) {

	this.colorOffset += offset;
	if (this.colorOffset == this.panelCount) {
		this.colorOffset = 0;
	}
	for (var i=0; i < this.panelCount; i++) {

		var p = document.getElementById('panel-' + i);
		p.style.background = this.panelColors[i + this.colorOffset];

		// if (Math.random() < 0.02) {
		// 	p.setAttribute("style","width:" + (this.panelWidth + (this.panelWidth/3)*Math.random()) + "px; height:" + this.panelHeight + "px");
		// } else if (Math.random() < 0.02) {
		// 	p.setAttribute("style","width:" + (this.panelWidth - (this.panelWidth/3)*Math.random()) + "px; height:" + this.panelHeight + "px");
		// }


	}

}
function ColorPanels (container, width, height) {
	this.box = container;
	this.width = width;
	this.height = height;
	this.panelCount = 100;
	this.panelWidth = this.width/this.panelCount;
	this.panelHeight = height;
	this.freshColors = [ 'rgb(236,96,54)', 'rgb(235,146,86)', 'rgb(225,222,74)', 'rgb(253,237,156)', 'rgb(93,56,162)', 'rgb(117,97,171)', 'rgb(226,30,84)', 'rgb(218,88,134)', 'rgb(125,167,63', 'rgb(144,183,89)', 'rgb(39,142,191)', 'rgb(85,166,206)' ];
	this.panelColors = [];
	this.colorOffset = 0;
	this.panels = [];

	this.makeColors();
	this.makePanel();
}

ColorPanels.prototype.makeColors = function () {

	for (var i =0; i < this.panelCount*2; i+=1) {
   		this.panelColors[i] = this.freshColors[Math.floor(Math.random()*this.freshColors.length)];
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
		this.panels.push(div);
	}
}

ColorPanels.prototype.flipColors = function(offset) {

	// this.colorOffset += offset;
	// if (this.colorOffset == this.panelCount) {
	// 	this.colorOffset = 0;
	// }
	for (var i=0; i < this.panelCount; i++) {

		if (Math.random() < 0.1) {
			this.panels[i].style.background = this.freshColors[Math.floor(Math.random()*this.freshColors.length)];
		}

	}

}
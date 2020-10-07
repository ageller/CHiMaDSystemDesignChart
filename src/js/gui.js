function toggleControls(){
	//change the hamburger symbol
	d3.select('#hamburger').node().classList.toggle('change');

	//move the controls into view
	var bbox = d3.select('#controls').node().getBoundingClientRect();
	var x = -bbox.width;
	if (d3.select('#hamburger').classed('change')){
		x = 0;
	}
	d3.select('#controls').style('transform', 'translateX('+x+'px)')

}


function toggleLines(event){
	var cls = d3.select(this).attr('class').split(' ')[1]

	var op = 1;
	var txt = 'On'
	params.hideLines[cls] = !params.hideLines[cls];
	if (params.hideLines[cls]){
		op = 0;
		txt = 'Off'
	}

	//change the text label of the toggle
	d3.select('#'+cls+'ToggleText').text(cls.charAt(0).toUpperCase() + cls.slice(1) +' ('+txt+')')

	//show/hide the lines
	d3.selectAll('.line.'+cls).transition().duration(400).style('opacity',op);

}
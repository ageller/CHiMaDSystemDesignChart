function resizer(){
	//if (!params.isMobile){

		//this will take care of the SVG elements (the html elements should move on their own)

		//for now I am just going to remove them and redraw them (could possibly just move them, if this is too slow)

		//resize svg as needed
		params.svg
			.style('width',d3.select('#container').node().getBoundingClientRect().width - 20)
			.style('height',d3.select('#container').node().getBoundingClientRect().height);

		//redefine the clipping mask
		var clip = params.svg.select('#myClip');
		clip.selectAll('rect').remove();
		var bb, bb_prev;
		Object.keys(params.boxes).forEach(function(c, i){
			bb = d3.select('#'+c).select('.boxContainer').select('.box').node().getBoundingClientRect();
			if (i > 0){
				clip.append('rect')
					.attr('x',bb_prev.x + bb_prev.width)
					.attr('y',0)
					.attr('width',bb.x - (bb_prev.x + bb_prev.width))
					.attr('height',d3.select('#container').node().getBoundingClientRect().height);
			}
			bb_prev = d3.select('#'+c).select('.boxContainer').select('.box').node().getBoundingClientRect();

		})

		//remove arrows and add them back
		d3.selectAll('.arrow').remove();
		addArrows();

		//remove all lines and add them back
		d3.selectAll('.line').remove();
		plotAnswers();
		plotResponses();
	//}


}
function resizer(){
	//if (!params.isMobile){

		//this will take care of the SVG elements (the html elements should move on their own)

		//for now I am just going to remove them and redraw them (could possibly just move them, if this is too slow)

		//resize svg as needed
		params.svg
			.style('width',d3.select('#container').node().getBoundingClientRect().width - 20)
			.style('height',d3.select('#container').node().getBoundingClientRect().height);

		//redefine the clipping mask
		params.svg.select('#myClip').selectAll('rect').remove();
		defineSVGclip();

		//remove arrows and add them back
		d3.selectAll('.arrow').remove();
		addArrows();

		//remove all lines and add them back
		d3.selectAll('.line').remove();
		plotAnswers();
		plotResponses();
	//}


}
function resizer(){
	//if (!params.isMobile){

		//this will take care of the SVG elements (the html elements should move on their own)

		//for now I am just going to remove them and redraw them (could possibly just move them, if this is too slow)

		//resize svg as needed
		params.svg
			.style('width',d3.select('#container').node().getBoundingClientRect().width - 20)
			.style('height',d3.select('#container').node().getBoundingClientRect().height);

		//remove all fill rects
		d3.selectAll('.wrapperBoxFill').remove();
		d3.selectAll('.wrapperBox').nodes().forEach(function(d,i){
			var bbox = d.getBoundingClientRect();
			d3.select('svg').append('rect')
				.attr('x',bbox.x + window.scrollX)
				.attr('y',bbox.y + window.scrollY)
				.attr('width',bbox.width)
				.attr('height',bbox.height)
				.attr('fill','#D7DCE4')
				.attr('class','wrapperBoxFill')
				.style('z-index',1)
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
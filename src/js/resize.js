function resizer(){
	//this will take care of the SVG elements (the html elements should move on their own)

	//for now I am just going to remove them and redraw them (could possibly just move them, if this is too slow)

	//remove arrows and add them back
	d3.selectAll('.arrow').remove();
	addArrows();

}
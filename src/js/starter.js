//this file contains any calls that are necessary upon loading the browser window

defineParams();

//create an svg element that will hold all the lines and arrows 
params.svg = d3.select('body').append('svg')
	.style('position', 'absolute')
	.style('top', 0)
	.style('left',0)
	.style('width','100%')
	.style('height','100%')
	//.style('z-index',-1)

initBoxes();
window.addEventListener("resize", resizer);

//this will also call the plotter for the lines
loadData();
function populateBoxes(){
	var columns = Object.keys(params.boxes);
	var hmax = 0;

	//create the boxes (using html divs, but I could in principle use d3 rects instead)
	columns.forEach(function(c, i){
		var dv = d3.select('#'+c).select('.boxContainer').selectAll('box')
			.data(params.boxes[c].titles).enter()
			.append('div')
				.attr('class', function(d,j){return 'box '+c+j})
				.style('background-color',function(d){return params.boxes[c].color;})

		dv.append('div')
			.attr('class','boxTitle')
			.html(function(d){return d;})

		dv.append('div')
			.attr('class','boxSubtitle')
			.html(function(d, j){return params.boxes[c].subtitles[j];})

		hmax = Math.max(hmax,d3.select('#'+c).select('.boxContainer').node().getBoundingClientRect().height)

	})

	//add the extra box behind any elements (this could be automated in the future, through params)
	var top = 2;
	var bottom = 3;
	var elTop = d3.select('#processing').select('.processing'+top).node();
	var elBottom = d3.select('#processing').select('.processing'+bottom).node();
	//https://stackoverflow.com/questions/6938248/insert-a-div-element-as-parent
	var parent = elTop.parentNode;
	var wrapper = document.createElement('div');
	wrapper.className = 'wrapperBox';
	parent.replaceChild(wrapper, elTop);
	wrapper.appendChild(elTop);
	wrapper.appendChild(elBottom);



	//shift vertically so they are all centered. 
	columns.forEach(function(c){
		var dv = d3.select('#'+c).select('.boxContainer')
		var h = dv.node().getBoundingClientRect().height;
		dv.style('margin-top',(hmax-h)/2.);
	})



}

function addArrows(){
	//these will need to be shifted if the browser is resized

	//add the arrows connecting boxes (this could be automated in the future, through params)
	// Add the arrowhead marker definition to the svg element
	var arrowSize = 4;
	params.svg.append('defs').append('marker')
		.attr('id', 'arrow')
		.attr('viewBox', [0, 0, arrowSize, arrowSize])
		.attr('refX', arrowSize)
		.attr('refY', arrowSize/2.)
		.attr('markerWidth', arrowSize)
		.attr('markerHeight', arrowSize)
		.attr('orient', 'auto-start-reverse')
		.append('path')
			.attr('d', d3.line()([[0, 0], [0, arrowSize], [arrowSize, arrowSize/2.]]))
			.attr('stroke', 'black');

	//first arrow
	var arrow = 0;
	var bboxTop = d3.select('#processing').select('.processing'+arrow).node().getBoundingClientRect();
	var top = bboxTop.y + bboxTop.height;
	var left = bboxTop.x + bboxTop.width/2.;
	var bboxBottom = d3.select('#processing').select('.processing'+(arrow+1)).node().getBoundingClientRect();
	var bottom = bboxBottom.y;

	params.svg.append('path')
		.attr('d', d3.line()([[left, bottom], [left, top]]))
		.attr('class','arrow')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#arrow)')
		.attr('fill', 'none');

	//second arrow
	arrow = 1;
	bboxTop = d3.select('#processing').select('.processing'+arrow).node().getBoundingClientRect();
	top = bboxTop.y + bboxTop.height;
	left = bboxTop.x + bboxTop.width/2.;
	bboxBottom = d3.select('#processing').select('.wrapperBox').node().getBoundingClientRect();
	bottom = bboxBottom.y;

	params.svg.append('path')
		.attr('d', d3.line()([[left, bottom], [left, top]]))
		.attr('class','arrow')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#arrow)')
		.attr('fill', 'none');
}

function resizer(){
	//this will take care of the SVG elements (the html elements should move on their own)

	//for now I am just going to remove them and redraw them (could possibly just move them, if this is too slow)

	//remove arrows and add them back
	d3.selectAll('.arrow').remove();
	addArrows();

}


function init(){

	defineParams();

	//create an svg element that will hold all the lines and arrows (and will sit behind the html divs)
	params.svg = d3.select('body').append('svg')
		.style('position', 'absolute')
		.style('top', 0)
		.style('left',0)
		.style('width','100%')
		.style('height','100%')
		.style('z-index',-1)

	populateBoxes();

	addArrows();
}

init();

window.addEventListener("resize", resizer);
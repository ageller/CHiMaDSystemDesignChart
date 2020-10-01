//this file contains functions that will begin the vis, and produce the "background" w/o the lines
//this will also create the svg element that holds the lines
function populateBoxes(){
	var columns = Object.keys(params.boxes);
	var hmax = 0;

	//create the boxes (using html divs, but I could in principle use d3 rects instead)
	columns.forEach(function(c, i){
		var dv = d3.select('#'+c).select('.boxContainer').selectAll('box')
			.data(params.boxes[c].titles).enter()
			.append('div')
				.attr('class', function(d,j){return 'box '+c+j})
				.attr('id', function(d,j){return c+d.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase();})
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
	var top = params.boxes.processing.titles[2];
	var bottom = params.boxes.processing.titles[3];
	var elTop = d3.select('#processing'+top.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase()).node();
	var elBottom = d3.select('#processing'+bottom.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase()).node();
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

	//create an svg element that will hold all the lines and arrows 
	params.svg = d3.select('#container').append('svg')
		.style('position', 'absolute')
		.style('top', 0)
		.style('left',0)
		.style('overflow','hidden')
		.style('width',d3.select('#container').node().getBoundingClientRect().width - 20) //to allow for the scroll bar
		.style('height',d3.select('#container').node().getBoundingClientRect().height)
		//.style('z-index',-1)

}

function addArrows(){
	//these will need to be shifted if the browser is resized

	//add the arrows connecting boxes (this could be automated in the future, through params)
	// Add the arrowhead marker definition to the svg element
	var arrowSize = Math.max(window.innerWidth, window.innerWidth)*0.004;
	params.svg.append('defs').append('marker')
		.attr('id', 'arrow')
		.attr('viewBox', [0, 0, arrowSize, arrowSize]) 
		.attr('refX', arrowSize/2.)
		.attr('refY', arrowSize/2.)
		.attr('markerWidth', arrowSize*0.9) //seems like I need to do this or else the side gets cut off (probably because I have a stroke-width of 2, but not sure how else to fix it)
		.attr('markerHeight', arrowSize)
		.attr('orient', 'auto-start-reverse')
		.append('path')
			.attr('d', d3.line()([[0, 0], [0, arrowSize], [arrowSize, arrowSize/2.]]))
			.attr('stroke', 'black');

	//first arrow
	var arrowTop = params.boxes.processing.titles[0];
	var arrowBottom = params.boxes.processing.titles[1];
	var bboxTop = d3.select('#processing'+arrowTop.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase()).node().getBoundingClientRect();
	var bboxBottom = d3.select('#processing'+arrowBottom.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase()).node().getBoundingClientRect();
	var y1 = bboxBottom.y;
	var y2 = bboxTop.y + bboxTop.height + arrowSize;
	var x = bboxTop.x + bboxTop.width/2.;

	params.svg.append('path')
		.attr('d', d3.line()([[x, y1], [x, y2]]))
		.attr('class','arrow')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#arrow)')
		.attr('fill', 'none');

	//second arrow
	arrowTop = params.boxes.processing.titles[1];
	bboxTop = d3.select('#processing'+arrowTop.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase()).node().getBoundingClientRect();
	bboxBottom = d3.select('#processing').select('.wrapperBox').node().getBoundingClientRect();

	y1 = bboxBottom.y;
	y2 = bboxTop.y + bboxTop.height  + arrowSize;
	x = bboxTop.x + bboxTop.width/2.;

	params.svg.append('path')
		.attr('d', d3.line()([[x, y1], [x, y2]]))
		.attr('class','arrow')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#arrow)')
		.attr('fill', 'none');
}




function initBoxes(){

	populateBoxes();

	addArrows();
}


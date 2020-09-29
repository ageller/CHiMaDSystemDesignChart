function populateBoxes(){
	var columns = Object.keys(params.boxes);
	columns.forEach(function(c){
		var dv = d3.select('#'+c).selectAll('box')
			.data(params.boxes[c].titles).enter()
			.append('div')
				.attr('class', 'box '+c)
				.style('background-color',function(d){return params.boxes[c].color;})

		dv.append('div')
			.attr('class','boxTitle')
			.html(function(d){return d;})

		dv.append('div')
			.attr('class','boxSubtitle')
			.html(function(d, i){return params.boxes[c].subtitles[i];})

	})
}

function init(){
	defineParams();

	populateBoxes();
}

init();
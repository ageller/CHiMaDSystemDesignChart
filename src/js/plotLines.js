function plotAnswers(){
	params.answers.columns.forEach(function(ac,i){
		if (ac.toLowerCase().includes('link')){
			//get the box columns
			var s = ac.split(" ");
			var col1 = s[1].toLowerCase();
			var col2 = s[3].toLowerCase();
			//get the box title and the ids of the elements
			//left side
			var p1 = ac.indexOf('[');
			var p2 = ac.indexOf(']');
			var id1 = col1+params.cleanString(ac.substring(p1+1, p2));
			//right sides
			var vals = params.answers[0][ac].split(",")
			vals.forEach(function(v){
				var id2 = col2+params.cleanString(v);
				drawLine(id1, id2, 1.);
			})
		}
	})

}

function plotResponses(){
	console.log(params.responses)
	// params.answers.columns.forEach(function(ac,i){
	// 	if (ac.toLowerCase().includes('link')){
	// 		//get the box columns
	// 		var s = ac.split(" ");
	// 		var col1 = s[1].toLowerCase();
	// 		var col2 = s[3].toLowerCase();
	// 		//get the box title and the ids of the elements
	// 		//left side
	// 		var p1 = ac.indexOf('[');
	// 		var p2 = ac.indexOf(']');
	// 		var id1 = col1+ac.substring(p1+1, p2).replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase();
	// 		//right sides
	// 		var vals = params.answers[0][ac].split(",")
	// 		vals.forEach(function(v){
	// 			var id2 = col2+v.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase();
	// 			drawLine(id1, id2);
	// 		})
	// 	}
	// })

}

function drawLine(id1, id2, width){
	var el1 = d3.select('#'+id1);
	var bbox1 = el1.node().getBoundingClientRect();
	var x1 = bbox1.x + bbox1.width;
	var y1 = bbox1.y + bbox1.height/2.;

	var el2 = d3.select('#'+id2);
	var bbox2 = el2.node().getBoundingClientRect();
	var x2 = bbox2.x;
	var y2 = bbox2.y + bbox2.height/2.;

	params.svg.append('path')
		.attr('d', d3.line()([[x1, y1], [x2, y2]]))
		.attr('class','line')
		.attr('stroke', 'black')
		.attr('stroke-width', width)
		.attr('fill', 'none');
}
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
				drawLine(id1, id2, params.answerWidth, params.answerAlpha, params.answerColor, 'answers', 100.);
			})
		}
	})

}

//count the uniq elements in an array and return both the counts and the unique array
function countUniq(arr){
	out = {'uniq':[], 'num':{}};

	arr.forEach(function(a,i){
		ac = params.cleanString(a);
		if (!out.uniq.includes(ac)){
			out.uniq.push(ac);
			out.num[ac] = 1;
		} else {
			out.num[ac] += 1;
		}
	})

	return out;
}

function plotResponses(){
	console.log(params.responses)
	params.responses.columns.forEach(function(rc,i){
		if (rc.toLowerCase().includes('link')){
			//get the box columns
			var s = rc.split(" ");
			var col1 = s[1].toLowerCase();
			var col2 = s[3].toLowerCase();
			//get the box title and the ids of the elements
			//left side
			var p1 = rc.indexOf('[');
			var p2 = rc.indexOf(']');
			var id1 = col1+params.cleanString(rc.substring(p1+1, p2));
			//right sides (want to save this in an array if possible)
			var vals = []
			params.responses.forEach(function(r,j){
				vals = vals.concat(params.responses[j][rc].split(","));
				if (j == params.responses.length-1){
					uVals = countUniq(vals);
					uVals.uniq.forEach(function(v){
						var id2 = col2+params.cleanString(v);
						var width = uVals.num[v]/params.responses.length;
						var w = width*(params.responseMaxWidth - params.responseMinWidth) + params.responseMinWidth;
						var a = width*(params.responseMaxAlpha - params.responseMinAlpha) + params.responseMinAlpha;
						drawLine(id1, id2, w, a, params.responseColor, 'responses', width*100.);
					})
				}
			})

		}
	})

}

function drawLine(id1, id2, width, alpha, color, cls, pct){
	var el1 = d3.select('#'+id1);
	var bbox1 = el1.node().getBoundingClientRect();
	var x1 = bbox1.x + bbox1.width + window.scrollX;
	var y1 = bbox1.y + bbox1.height/2. + window.scrollY;

	var el2 = d3.select('#'+id2);
	var bbox2 = el2.node().getBoundingClientRect();
	var x2 = bbox2.x + window.scrollX;
	var y2 = bbox2.y + bbox2.height/2. + window.scrollY;

	var op = 1;
	if (params.hideLines[cls]){
		op = 0;
	}

	params.svg.append('path')
		.attr('d', d3.line()([[x1, y1], [x2, y2]]))
		.attr('class','line '+cls)
		.attr('stroke', color)
		.attr('stroke-linecap','round')
		.attr('stroke-width', width)
		.attr('stroke-opacity', alpha)
		.attr('fill', 'none')
		.style('z-index',2)
		.style('opacity',op)
		.on('mouseover',function(e,i){
			if (cls == 'responses' & d3.select(this).style('opacity') > 0){
				d3.select('.tooltip')
					.style("opacity", 0.9)
					.html(parseFloat(pct).toFixed(2)+"%")	
					.style("left", (e.pageX) + "px")		
					.style("top", (e.pageY - 28) + "px");	
				d3.select(this)
					.attr('stroke', 'black')
					.attr('stroke-opacity', 1)

	
			}
		})
		.on("mouseout", function(d) {		
			if (cls == 'responses'){
				d3.select('.tooltip').style("opacity", 0);
				d3.select(this)
					.attr('stroke', color)
					.attr('stroke-opacity', alpha)


			}
		});
}


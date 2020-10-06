//I would like to read in the file directly from google sheets, and to reread it regularly.  If the file changes, then I will replot the lines

// function xmlRequest(url) {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.open("GET", params.surveyFile, true);
// 	xmlhttp.onreadystatechange = function() {
// 		if(xmlhttp.readyState == 4 && xmlhttp.status==200){
// 			console.log(xmlhttp.responseText)
// 		}
// 	};
// 	xmlhttp.send();
// }

//I will use this to load the google sheet
function loadScript(url){

	//in case it's already there, remove it (not tested yet)
	var sheet = document.getElementById('GoogleSheet')
	if (sheet != null){
		sheet.removeChild(list.childNodes[0]);
	}

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
            }
        };
    } 

    script.src = url;
    script.id = 'GoogleSheet'
    document.getElementsByTagName("head")[0].appendChild(script);
}



//parse this json from the Google Sheet into the format that we need
function readGoogleSheet(json) {
	var data = json.feed.entry;
	var keys = [];
	var out = [];
	var row = null;
	for(var r=0; r<data.length; r++) {
		var cell = data[r]["gs$cell"];
		var val = cell["$t"];
		if (cell.col == 1) {
			j = 0;
			row = {};
		}

		if (cell.row == 1){
			keys.push(val)
		} else {
			row[keys[j]] = val;
		}

		j += 1;

		if (j == keys.length & cell.row > 1){
			out.push(row);
		}
	}
	out.columns = keys; //I think I can do this (if not I need to make out an object to begin with)
	//console.log(out)

	params.responses = out;
	plotResponses();
}

//for now I will work with a static csv file
function loadData() {
	Promise.all([
		d3.csv('src/data/answers.csv'),
		//d3.csv('src/data/responses.csv'),
	]).then(function(d) {
		params.answers = d[0];
		plotAnswers();
		//params.responses = d[1];
		//plotResponses();
	})
	.catch(function(error){
		console.log('ERROR:', error)
	})
}

//I would like to read in the file directly from google sheets, and to reread it regularly.  If the file changes, then I will replot the lines


// function loadData() {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.open("GET", params.surveyFile, true);
// 	xmlhttp.onreadystatechange = function() {
// 		if(xmlhttp.readyState == 4 && xmlhttp.status==200){
// 			console.log(xmlhttp.responseText);
// 		}
// 	};
// 	xmlhttp.send();
// }

//for now I will work with a static csv file
function loadData() {
	d3.csv('src/data/answers.csv')
		.then(function(d) {
			params.answers = d;
			//plotAnswers();
		})
		.catch(function(error){
			console.log('ERROR:', error)
		})
}

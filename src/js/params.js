//all "global" variables are contained within params object

// need to get the proper characters and positions (H2O, delta, etc.)

var params;
function defineParams(){
	params = new function() {

		//these could be read in as a file, or taken from the survey
		this.boxes = {"processing": {
							"titles":["Post-layup", "Layup and Curing", "Polymer matrix", "Reinforcement"],
							"subtitles":["(Annealing, aging)", "(Prep., Prep-cure, post cure)", "(thermoset/thermoplastic, epoxy, crosslinker, filler)", ""],
							"color": "#F1CCB1"
					  }, 
					  "structure": {
							"titles":["Matrix", "Reinforcement","Reinforcement architecture","Matrix/Reinforcement Interface"],
							"subtitles":["(crosslink density, nanoscale, filler distribution, heterogeneity, phase fraction)", "(morphology, microstructure, phase fraction)","(Orientation, dispersion)","(Interfacial surface area, fiber geometry)"],
							"color":"#B1D095"
					  },
					  "properties": {
					  		"titles":["Failure Mode", "Toughness", "Strength/Stiffness", "Density","Glass Transition (T<sub>g</sub>)", "Degradation Rates", "&#916; Coefficient of thermal expansion"],
					  		"subtitles":["", "", "", "","", "(H<sub>2</sub>O, O<sub>2</sub>, salts)", ""],
					  		"color":"#B8C7E4"
					  },
					  "performance":{
					  		"titles":["Fracture Resistance", "Environmental Stability", "Lightweight Mechanical Performance"],
					  		"subtitles":["", "", ""],
					  		"color":"#B8A0E9"

					  }
					}

		



//will hold the svg element
		this.svg;

//this will hold the answers and responses as read in from the files
		this.answers;
		this.responses;

//width, opacity, and color for responses
		this.responseMinWidth = 1;
		this.responseMaxWidth = 10;
		this.responseMinAlpha = 0.1;
		this.responseMaxAlpha = 0.9;
		this.responseColor="gray";

//width,opacity and color for answers
		this.answerWidth = 2;
		this.answerAlpha = 1;
		this.answerColor = "black";

//width of the boxes will be defined based on the window size
		this.boxWidth;
		this.boxMargin;

//for hiding the lines with the toggle switches
		this.hideLines = {'answers':false, 'responses':false};
		
		this.cleanString = function(s){
			return s.replace(/sub\>/g,'').replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "").toLowerCase();
		}
	};


}

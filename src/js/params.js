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

//this will hold the answers
		this.answers;


//width of the boxes will be defined based on the window size
		this.boxWidth;
		this.boxMargin;
	};


}

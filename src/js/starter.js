//this file contains any calls that are necessary upon loading the browser window

defineParams();

// populateBoxes2();
initBoxes();

//attach listener on window resize
window.addEventListener("resize", resizer);

//trying to correct issue on iOS devices with lines not following boxes
window.addEventListener("gesturechange", resizer);

//attach listeners to the controls
d3.select('#hamburger').on('mousedown',toggleControls)

//on load reposition the controls to just outside the view
d3.select('#controls').style('transform', 'translateX('+(-d3.select('#controls').node().getBoundingClientRect().width)+'px)')

//attach listeners to the on/off switches
d3.select('.switch.answers').on('change',toggleLines)
d3.select('.switch.responses').on('change',toggleLines)

//this will also call the plotter for the lines
loadData();
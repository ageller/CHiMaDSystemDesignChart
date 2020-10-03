//this file contains any calls that are necessary upon loading the browser window

defineParams();

// populateBoxes2();
initBoxes();
window.addEventListener("resize", resizer);

//trying to correct issue on iOS devices with lines not following boxes
window.addEventListener("gesturechange", resizer);



//this will also call the plotter for the lines
loadData();
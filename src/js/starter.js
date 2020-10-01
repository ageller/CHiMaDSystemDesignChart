//this file contains any calls that are necessary upon loading the browser window

defineParams();

initBoxes();
window.addEventListener("resize", resizer);



//this will also call the plotter for the lines
loadData();
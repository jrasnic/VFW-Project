// Justin Rasnic
// VFW 1208
// Project 2

// Delay JS until DOM is ready (all code must be inside this function)
window.addEventListener("DOMContentLoaded", function(){

	// get Element shortcut
	function $(x){
		var element = document.getElementById(x);
		return element;
	};

	// create select element
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "genres");
		for (var i=0, j=genres.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = genres[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};

	// variables
	var genres = ["--Choose A Genre--","Action-Adventure", "Fighting", "FPS", "Platformer", "Puzzle", "RPG", "Simulation", "Sports", "Strategy"];
	makeCats();

	// set click events
	/*var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearData);
	var save = $("submit");
	save.addEventListener("click", saveData);*/

});
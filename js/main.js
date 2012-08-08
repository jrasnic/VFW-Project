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
			makeSelect.setAttribute("id", "genre");
		for (var i=0, j=gameGenres.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = gameGenres[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};

	//checkbox values
	function getPlatformValues(){                      
		var checkboxes = $("mainform").platforms;
		for(i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				var checkedValue = checkboxes[i].value;
				platformValues.push(checkedValue);
			};
		};
	};

	// radio value
	function getOwnershipValue(){                      
		var radios = $("mainform").ownership;
		for (i=0, j=radios.length; i<j; i++){
			if (radios[i].checked){
				ownershipValue = radios[i].value;
			};
		};
	};

	function saveData(){
		var id = Math.floor(Math.random()*10000001);
		getPlatformValues();
		getOwnershipValue();
		var item = {};
			item.gname = ["Game Name: ", $("gname").value];
			item.genre = ["Genre: ", $("genre").value];
			item.releaseDate = ["Release Date: ", $("releasedate").value];
			item.platforms = ["Platforms: ", platformValues];
			item.quality = ["Quality: ", $("quality").value];
			item.ownership = ["Do you own it? ", ownershipValue];
			item.notes = ["Notes: ", $("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Rating Saved!");		
	};

	// variables
	var gameGenres = ["--Choose A Genre--","Action-Adventure", "Fighting", "FPS", "Platformer", "Puzzle", "RPG", "Simulation", "Sports", "Strategy"];
	var platformValues = [];
	var ownershipValue = "Do you own it?";
	makeCats();

	// set click events
	/*var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearData);*/
	var save = $("submit");
	save.addEventListener("click", saveData);
});
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

	// create "select" form element
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

	// get checkbox values
	function getPlatformValues(){                      
		var checkboxes = $("mainform").platforms;
		for(i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				var checkedValue = checkboxes[i].value;
				platformValues.push(checkedValue);
			};
		};
	};

	// get radio value
	function getOwnershipValue(){                      
		var radios = $("mainform").ownership;
		for (i=0, j=radios.length; i<j; i++){
			if (radios[i].checked){
				ownershipValue = radios[i].value;
			};
		};
	};

	function toggleControls(n){
		switch(n){
			case "on":
				$("mainform").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("mainform").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		};
	};

	// store form data in local storage
	function saveData(){
		var id = Math.floor(Math.random()*10000001);
		getPlatformValues();
		getOwnershipValue();
		var item = {};
			item.gname = ["Game Name: ", $("gname").value];
			item.genre = ["Genre: ", $("genre").value];
			item.releaseDate = ["Release Date: ", $("releasedate").value];
			item.platforms = ["Platforms:", platformValues];
			item.quality = ["Quality: ", $("quality").value];
			item.ownership = ["Do you own it? ", ownershipValue];
			item.notes = ["Notes: ", $("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Rating Saved!");		
	};

	// get data from local storage and display in browser
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("No data found");
			window.location.reload();
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block"; 
		for(i=0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + obj[n][1];
				makeSubLi.innerHTML = optSubText;
			};
		};
	};

	function clearData(){
		if(localStorage.length === 0){
			alert("There are no ratings to clear!");
		} else{
			localStorage.clear();
			alert("All ratings are deleted!");
			window.location.reload();
			return false;
		};

	};

	// variables
	var gameGenres = ["--Choose A Genre--","Action-Adventure", "Fighting", "FPS", "Platformer", "Puzzle", "RPG", "Simulation", "Sports", "Strategy"];
	var platformValues = [];
	var ownershipValue = "Do you own it?";

	makeCats(); //create and populate "genre" field

	// set click events
	var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearData);
	var save = $("submit");
	save.addEventListener("click", saveData);
});
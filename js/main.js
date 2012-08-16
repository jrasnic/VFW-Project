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
	function getRecommendationValue(){                      
		var radios = $("mainform").recommendation;
		for (i=0, j=radios.length; i<j; i++){
			if (radios[i].checked){
				recommendationValue = radios[i].value;
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
		getRecommendationValue();
		var item = {};
			item.gname = ["Game Name: ", $("gname").value];
			item.genre = ["Genre: ", $("genre").value];
			item.releaseDate = ["Release Date: ", $("releasedate").value];
			item.platforms = ["Platforms:", platformValues];
			item.quality = ["Quality: ", $("quality").value];
			item.recommendation = ["Recommendation: ", recommendationValue];
			item.notes = ["Notes: ", $("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Rating Saved!");		
	};

	// get data from local storage and display in browser
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("No ratings saved");
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
			var linksLi = document.createElement("li");
			makeLi.setAttribute("id", "displaylist");
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
				makeSubList.appendChild(linksLi);
			};
			makeItemLinks(localStorage.key(i), linksLi);
		};
	};

	// create edit/delete links
	function makeItemLinks(key, linksLi){

		//edit link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Game";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//delete link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Game";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//show form
		toggleControls("off");

		//populate form
		$("gname").value = item.gname[1];
		$("genre").value = item.genre[1];
		$("releasedate").value = item.releaseDate[1];

		// find which checkboxes should be checked, and check them
		var checkboxes = $("mainform").platforms;
		var selectedPlatforms = item.platforms[1];
		for(var n=0, m=checkboxes.length; n<m; n++){
			for(var x=0, y=selectedPlatforms.length; x<y; x++){
				if(selectedPlatforms[x] == checkboxes[n].value){
					checkboxes[n].setAttribute("checked", "checked");
				};
			};
		};

		$("quality").value = item.quality[1];	

		// find which radio should be checked and check it
		var radios = $("mainform").recommendation;
		for(var i=0, j=radios.length; i<j; i++){
			if(radios[i].value == "Buy" && item.recommendation[1] == "Buy"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "Rent/Borrow" && item.recommendation[1] == "Rent/Borrow"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "Skip" && item.recommendation[1] == "Skip"){
				radios[i].setAttribute("checked", "checked");
			};
		};

		$("notes").value = item.notes[1]; 

		//remove initial listener from save button
		save.removeEventListener("click", saveData);
		//change submit button to edit button
		$("submit").value = "Edit Game Entry";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		//save key value
		editSubmit.key = this.key;
	};

	function validate(){

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
	var recommendationValue = "Recommendation?";

	makeCats(); //create and populate "genre" field

	// set click events
	var displayLink = $("display");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearData);
	var save = $("submit");
	save.addEventListener("click", saveData);
});
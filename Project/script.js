window.onload = function(){

	// set up a name array

	nameArr = [[],[],[],[]];
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			nameArr[i][j] = document.getElementById("no"+i+j);
		}
	}

	// randomly assign colors using name array

	var colorObj = {
		1: "purple",
		2: "blue",
		3: "green",
		4: "yellow",
		5: "red",
		6: "pink",
		7: "orange",
		8: "lightblue"
	}

	var colorCount = {
		"purple": 0,
		"blue": 0, 
		"green": 0,
		"yellow": 0,
		"red": 0,
		"pink": 0,
		"orange": 0,
		"lightblue": 0
	}

	// if class is down, gray. if class is up, use this code

	upObj = {}
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			var random = Math.floor(Math.random()*8) + 1;
			while(colorCount[colorObj[random]] > 1) {
				// need a new random number
				random = Math.floor(Math.random()*8) + 1;
			} 
			upObj[nameArr[i][j].getAttribute("id")] = colorObj[random];
			colorCount[colorObj[random]] += 1;
		}
	}

	// change color on click

	var cells = document.querySelectorAll(".row > div");
	var endGameCounter = 0;
	var turnsStart = 10;
	var turns = turnsStart;
	var display = document.getElementById("display");
	display.innerText = "You have "+turns+" turns remaining"
	var prevColor = Math.random();
	var disabled = false;

	
	for(i=0; i<cells.length; i++) {
		cells[i].addEventListener("click", function(event){
			if(disabled === false){
				if (event.target.getAttribute("class") === "col-xs-2 col-xs-offset-1 down") {
					event.target.setAttribute("class", "col-xs-2 col-xs-offset-1 up");
					event.target.style.backgroundColor = upObj[event.target.getAttribute("id")];
					endGameCounter += 1;
					if (event.target.style.backgroundColor === prevColor && endGameCounter % 2===0) {
					} else if (event.target.style.backgroundColor !== prevColor && endGameCounter % 2===0) {
						disabled = true;
						setTimeout(function(){
						    flipBack();
						},1000);
					} 
					prevColor = event.target.style.backgroundColor;
				} 
				if (endGameCounter === 16) {
					youWin();
				}
			}
		});
	}
	
	
	// end game if all are up

	function flipBack(){
		for (var i=0; i<4; i++) {
			for (var j=0; j<4; j++) {
				nameArr[i][j].setAttribute("class", "col-xs-2 col-xs-offset-1 down");
				nameArr[i][j].style.backgroundColor = "lightgray";
			}
		}
		endGameCounter = 0;
		disabled = false;
		turns -= 1;
		if(turns === 1){
			display.innerText = "Careful! Only one turn remaining."
		} else if (turns ===0) {
			display.innerText = "You lose!"
		} else {
			display.innerText = "You have "+turns+" turns remaining."
		}
		if (turns < 1) {
			youLose();
		}
	}

	function youWin(){
		setTimeout(function(){
			alert("You win! It took you "+ (turnsStart-turns) + " turns.");
			display.innerText = "You win with " (turnsStart-turns) + " turns remaining."
		},250);
		setTimeout(function(){
			location.reload();
		},1500);
	}

	function youLose(){
		setTimeout(function(){
			alert("You lose!");
		},250);
		setTimeout(function(){
			location.reload();
		},1500);
	}


/*
	// bring list in from localStorage if applicable
	
	var listArr = JSON.parse(localStorage.getItem("currentList"));
	var form = document.querySelector("form");
	var list = document.querySelector("ul");
	var span = document.createElement("span");

	if(listArr.length > 0) {
		for (var i=0; i<listArr.length; i++) {
			var oldToDo = document.createElement("li");
			oldToDo.innerText = listArr[i].todo;
			oldToDo.setAttribute("class", "list-group-item");
			oldToDo.setAttribute("ID", i);
			if(listArr[i].done) {
				oldToDo.setAttribute("class", "list-group-item disabled");
			} else {
				oldToDo.setAttribute("class", "list-group-item")
			}
			list.appendChild(oldToDo);
		}
	} else {
		listArr = [];
	}

	var counter = listArr.length;

	// add a new To Do item

	form.addEventListener("submit", function(event){
		var newToDo = document.createElement("li");
		newToDo.innerText = form.elements[0].value;
		newToDo.setAttribute("class", "list-group-item");
		newToDo.setAttribute("done", "false");
		newToDo.setAttribute("ID", counter);
		counter += 1;
		if (newToDo.innerText.length === 0) {
			form.preventDefault();
		} else {
			list.appendChild(newToDo);
			listArr.push({
				todo: newToDo.innerText,
				done: false
			});
			localStorage.setItem("currentList", JSON.stringify(listArr));
			form.reset();
		}
	});

	// mark an item as completed

	list.addEventListener("click", function(event){
		if (event.target.getAttribute("class") === "list-group-item") {
			event.target.setAttribute("class", "list-group-item disabled");
			for (var i=0; i<listArr.length; i++) {
				if(listArr[i].todo === event.target.innerText) {
					listArr[i].done = true;
				}
			}
		} else {
			event.target.setAttribute("class", "list-group-item");
			for (var i=0; i<listArr.length; i++) {
				if(listArr[i].todo === event.target.innerText) {
					listArr[i].done = false;
				}
			}
		}
		localStorage.setItem("currentList", JSON.stringify(listArr));
	});

	// remove an item

	list.addEventListener("mouseover", function(event){
		event.target.appendChild(span);
		span.setAttribute("class", "glyphicon glyphicon-remove pull-right");
	});

	span.addEventListener("click", function(event){
		event.target.parentNode.remove();
		var id = event.target.parentNode.getAttribute("ID");
		listArr.splice(id,1);
		localStorage.setItem("currentList", JSON.stringify(listArr));
	});
*/

};
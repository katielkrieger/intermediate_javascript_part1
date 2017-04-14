window.onload = function(){

	// bring list in from localStorage if applicable

	var listArr = JSON.parse(localStorage.getItem("currentList"));
	var form = document.querySelector("form");
	var list = document.querySelector("ul");
	var span = document.createElement("span");

	if (listArr.length > 0) {
		for (var i=0; i<listArr.length; i++) {
			var oldToDo = document.createElement("li");
			oldToDo.innerText = listArr[i];
			oldToDo.setAttribute("class", "list-group-item");
			list.appendChild(oldToDo);
		}
	} else {
		listArr = [];
	}

	// add a new To Do item

	form.addEventListener("submit", function(event){
		var newToDo = document.createElement("li");
		newToDo.innerText = form.elements[0].value;
		newToDo.setAttribute("class", "list-group-item");
		if (newToDo.innerText.length === 0) {
			form.preventDefault();
		} else {
			list.appendChild(newToDo);
			listArr.push(newToDo.innerText);
			localStorage.setItem("currentList", JSON.stringify(listArr));
			form.reset();
		}
	});

	// mark an item as completed

	list.addEventListener("click", function(event){
		if (event.target.getAttribute("class") === "list-group-item") {
			event.target.setAttribute("class", "list-group-item disabled");
		} else {
			event.target.setAttribute("class", "list-group-item");
		}
	});

	// remove an item

	list.addEventListener("mouseover", function(event){
		event.target.appendChild(span);
		span.setAttribute("class", "glyphicon glyphicon-remove pull-right");
	});

	span.addEventListener("click", function(event){
		list.removeChild(event.target.parentNode);
	});

};
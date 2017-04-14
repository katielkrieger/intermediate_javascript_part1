document.addEventListener("DOMContentLoaded", function(){

	// 1

	var h1 = document.querySelector("h1");
    h1.innerText = "Hello World";

    // 2
    
	var colorsParent = document.querySelector("section");

	colorsParent.addEventListener("mouseover", function(event){
		var selected = document.querySelector(".selected");
		selected.innerText = event.target.className;
	});

	// 3

	var newDiv = document.createElement("div");

	// 4

	newDiv.className = "purple";
	newDiv.style.backgroundColor = "purple";

	// 5

	colorsParent.appendChild(newDiv);

	// 6 

	// create event listener for button

	var button = document.querySelector("button");
	var car1 = document.querySelector(".car1");
	var car2 = document.querySelector(".car2");
	car1.style.marginLeft = "0px";
	car2.style.marginLeft = "0px";

	function reset() {
		clearInterval(car1.timer);
      	clearInterval(car2.timer);
  		button.disabled = false;
		car1.style.marginLeft = "0px";
		car2.style.marginLeft = "0px";
	};

	button.addEventListener("click", function(event){
		
		button.disabled = true;
		
		car1.timer = setInterval(function() {
	    	var random = Math.random();
	    	car1.style.marginLeft = parseInt(car1.style.marginLeft) + (random*100) + "px";
		    if(parseInt(car1.style.marginLeft) > window.innerWidth){
		      	alert("Car 1 is the winner!");
		      	reset();
		    }
		},100);

		car2.timer = setInterval(function() {
	    	var random = Math.random();
	    	car2.style.marginLeft = parseInt(car2.style.marginLeft) + (random*100) + "px";
		    if(parseInt(car2.style.marginLeft) > window.innerWidth){
		      	alert("Car 2 is the winner!");
		      	reset();
		    }
		},100);
	
	});

});

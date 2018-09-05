// Async HTTP GET Function
var HttpClient = function() { // Thanks http://stackoverflow.com/a/22076667/1709894!
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    }

    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send( null );
  }
}

var getCsvSheet = new HttpClient();
getCsvSheet.get("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheet/ccc?key=1S4dX2zBJ0yoEeJ88SOzb4O9Jxxj-TKMZYtxy45dCTsM&output=csv", function(response) {
	// Parse local CSV file
	Papa.parse(response, {
		complete: function(results) {
			console.log("Finished:", results.data);
			var myString = '';
			for (x in results.data) {
				if(x != 0 && results.data[x][1].length > 0){
					myString += "<li>"+results.data[x][1]+"</li>";
				}
			}
			changeText(myString);
			console.log(myString);
		}
	});
});

function main(){
	console.log("Loaded");
}

function changeText(text){
	var elem = document.getElementById("wnlist");
	elem.innerHTML = "<ul id='wnlist'>"+text+"</ul>";
}

function openNav(){
	document.getElementById("sidenav").style.width = "30%";
}

function closeNav() {
	document.getElementById("sidenav").style.width = "0";
}


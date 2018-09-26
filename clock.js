function updateClock(){
	let time = new Date();
	let hours = time.getHours();
	hours = (hours < 10 ? "0" : "") + hours;
	let minutes = time.getMinutes();
	minutes = (minutes < 10 ? "0" : "") + minutes;
	document.getElementById("clock").firstChild.nodeValue = hours + ":" + minutes;
}
function onHome() {
      var home = document.getElementById("home");
      var about = document.getElementById("about");
      var projects = document.getElementById("projects");
      var contact = document.getElementById("contact");
      if (home.style.display === "none") {
            about.style.display = "none";
            projects.style.display = "none";
            contact.style.display = "none";
            home.style.display = "flex";
      } else {
        location.reload();				   
    }				    
}
function onAbout() {
      var home = document.getElementById("home");
      var about = document.getElementById("about");
      var projects = document.getElementById("projects");
      var contact = document.getElementById("contact");
      if (about.style.display === "none") {
            home.style.display = "none";
            projects.style.display = "none";
            contact.style.display = "none";
            about.style.display = "flex";
      } 
}
function onProjects() {
      var home = document.getElementById("home");
      var about = document.getElementById("about");
      var projects = document.getElementById("projects");
      var contact = document.getElementById("contact");
      if (projects.style.display === "none") {
            home.style.display = "none";
            about.style.display = "none";
            contact.style.display = "none";
            projects.style.display = "flex";
      } 
}
function onContact() {
      var home = document.getElementById("home");
      var about = document.getElementById("about");
      var projects = document.getElementById("projects");
      var contact = document.getElementById("contact");
      if (contact.style.display === "none") {
            home.style.display = "none";
            about.style.display = "none";
            projects.style.display = "none";
            contact.style.display = "flex";
      } 
}
function updateClock(){
    let time = new Date();
    let hours = time.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    let minutes = time.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;
    document.getElementById("clock").firstChild.nodeValue = hours + ":" + minutes;
}
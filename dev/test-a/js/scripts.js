// JavaScript source code
var mobile = false;

$(document).ready(function() {
  Console.log("DOM Ready");
  checkMobile();
  
  if (mobile) {
    $("#test").text("This is a mobile device");
  }
});
                    
function checkMobile(){
  Console.log("checkMobile");
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    Console.log("Is Mobile!");
    mobile = true; // mobile!
  }
}

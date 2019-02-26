// JavaScript source code
var mobile = false;

$(document).ready(function() {
  console.log("DOM Ready");
  checkMobile();
  
  if (mobile) {
    $("#test").text("This is a mobile device");
  }
});
                    
function checkMobile(){
  console.log("checkMobile");
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    console.log("Is Mobile!");
    mobile = true; // mobile!
  }
}

// JavaScript source code
var mobile = false;

$( document ).ready(function() {
  checkMobile();
  
  if (mobile) {
    $("#test").text("This is a mobile device");
  }
});
                    
function checkMobile(){
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    mobile = true; // mobile!
  }
}

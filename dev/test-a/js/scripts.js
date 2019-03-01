// JavaScript source code
var mobile = false;

$(document).ready(function() {
	//console.log("DOM Ready");

	/** Initialize MaterializeCSS **/
    var elems = $('.sidenav');
    var instances = M.Sidenav.init(elems);

	checkMobile();
  
	if (mobile) {
		//$("#test").text("This is a mobile device");
	}
});
                    
function checkMobile(){
	//console.log("checkMobile");
	if (/mobi|android|ios/i.test(navigator.userAgent.toLowerCase())) {
		//console.log("Is Mobile!");
    mobile = true; // mobile!
	}
}

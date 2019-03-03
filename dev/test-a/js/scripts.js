// JavaScript source code
var mobile = false;

$(document).ready(function() {
	/** Initialize MaterializeCSS **/
    M.Sidenav.init($('.sidenav'), {
        menuWidth: 300,
		edge: 'right',
		loseOnClick: true
    });
    M.Dropdown.init($('.dropdown-trigger'));
    M.Collapsible.init($('.collapsible'));

    //$('.button-collapse').sideNav({
    //    menuWidth: 300, // Default is 240
    //    edge: 'right', // Choose the horizontal origin
    //    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    //});

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

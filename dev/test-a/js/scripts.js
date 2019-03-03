// JavaScript source code
var mobile = false;

$(document).ready(function() {
	//console.log("DOM Ready");

	/** Initialize MaterializeCSS **/
    var elems = $('.sidenav');
    var instances = M.Sidenav.init(elems, {
        menuWidth: 300,
		edge: 'right',
		loseOnClick: true
    });

    var elems = $('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);


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

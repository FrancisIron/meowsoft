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

	/** Initialize jQuery MiniColors **/
	$('.mini-colors').minicolors({
		format: 'hex',
		inline: true,
		opacity: true
	});

	/** Other Scripts **/
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

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

	/** Initialize Spectrum **/
	$(".color-pickers").spectrum({
		preferredFormat: "hex3",
		showButtons: false,
		showInput: true,
		showAlpha: true
	});
	$(".color-pickers").show();
	$(".color-pickers").keyup(function(e) {
		$(this).spectrum("set", $(this).val());
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

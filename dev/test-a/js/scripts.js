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
		containerClassName: 'color-picker-container',
		preferredFormat: "hex3",
		showButtons: false,
		showInput: true,
		showAlpha: true
	});
	//$(".color-pickers").show();
	//$(".color-pickers").keyup(function(e) {
	//	$(this).spectrum("set", $(this).val());
	//});
	$('#color-backs').on("dragstop.spectrum", function(e, color) {
		changeBackgroundColors(color);
	});
	$('#color-texts').on("dragstop.spectrum", function(e, color) {
		changeTextColors(color);
	});

	/** Other Scripts **/
	checkMobile();
  
	if (mobile) {
		//$("#test").text("This is a mobile device");
	}
});
     
function changeBackgroundColors(color) {
		$('nav, .sidenav, .color-picker-container').css("background-color",color);
}

function changeTextColors(color) {
		//color.toHexString(); // #ff0000
		$('html, body, head, nav, a, button, p, span, li, i, link, ul, .color-picker-container, .sp-input').css("color",color);
}

function checkMobile(){
	//console.log("checkMobile");
	if (/mobi|android|ios/i.test(navigator.userAgent.toLowerCase())) {
		//console.log("Is Mobile!");
    mobile = true; // mobile!
	}
}

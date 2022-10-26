$(document).ready(function(){
    //* Navigation Drawer
    //#region
    $("body").on("click",".nav-drawer-toggle, .nav-drawer-scrim", function(e){
        let drawer = $(this).closest(".nav-drawer");
        
        drawer.find(".nav-drawer-toggle").toggleClass("active");
        drawer.find(".nav-drawer-scrim").toggleClass("active");
        drawer.find(".nav-drawer-contents").toggleClass("active inactive");
    });
    //#endregion
    //* Toggle Theme
    //#region
    if ($("html").hasClass("light")){
        $(".theme-selector").addClass("light");
    } else {
        $(".theme-selector").addClass("dark");
    }
    $("body").on("click", ".theme-selector", function() {
        $(".theme-selector").toggleClass("light dark");
        $("html").toggleClass("light dark");
        // Set theme in local storage
        if ($("html").hasClass("light")) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    //#endregion
    //* Navigation Bar
    //#region
    $("body").on("click", ".nav-button", function(e) {
        let parent = $(this).parent(); 
        let selected;

        if (!parent.hasClass("nav-bar")){
            let navValue = $(this).attr("data-nav-value");
            selected = $(".nav-bar[data-nav-value="+navValue+"]").find(".nav-selected");
            selected.animate({left: 0, width: 0, opacity: 0}, 300);
            return;
        }
        
        var posX = $(this).offset().left;
        var posY = $(this).offset().top;
        var btnWidth = $(this).outerWidth();

        selected = parent.find(".nav-selected");
        posY += $(this).outerHeight() - selected.outerHeight();

        selected.animate({top: posY, left: posX, width: btnWidth, opacity: 1}, 300);
    });
    //#endregion
    //* Navigation Tab
    //#region
    $("body").on("click", ".nav-button", function(e) {
        let parent = $(this).parent(); let navValue; 
        let tabValue = $(this).attr("data-nav-tab");

        if (!parent.hasClass("nav-bar")){
            navValue = $(this).attr("data-nav-value");
        } else {
            navValue = parent.attr("data-nav-value");
        }

        let container = $(".nav-tab-container[data-nav-value="+navValue+"]");
        let newTab = container.find("[data-nav-tab="+tabValue+"]");
        if (newTab == null) { return; }

        container.find(".nav-tab-contents.active").removeClass("active").addClass("inactive");
        newTab.removeClass("inactive").addClass("active");
    });
    //#endregion
    //* Input Label
    //#region
    $("body").on("focusin focusout", ".input-label:not(.var) > input", function (e) {
        if (e.type == 'focusin') {
            $(this).parent().addClass("active");
        } else if ($(this).val().length == 0) {
            $(this).parent().removeClass("active"); 
        }
    }); 
    //* Dialog
    //#endregion
    //* Dialog
    //#region
    $("body").on("click", ".dialog .scrim", function (e) {
        $(".dialog").removeClass("active");
    });
    //#endregion
    //#region
    //#endregion
});


//* Dialog
//#endregion
function CreateDialog(){

}
function OpenDialog(type, data){
    switch (type){
        case "simple":
            $(".dialog[data-dialog-type="+type+"] .dialog-message").text(data);
            break;
    }
    $(".dialog[data-dialog-type="+type+"]").addClass("active");
}
//#region


// $("body").on("input blur paste change keyup keydown", ".input-label.var > input", function () {
//     if ($(this).val().length > 0) { $(this).parent().addClass("active"); }
//     else { $(this).parent().removeClass("active"); }
// });

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
        if ($("html").hasClass("light dark")) {
            $(".theme-selector").removeClass("light");
            $("html").removeClass("light");
        }
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
        let navbar = $(this).parent(); 
        let button = $(this);
        let selected;

        if (!navbar.hasClass("nav-bar")){
            let navValue = $(this).attr("data-nav-value");
            let navTab = $(this).attr("data-nav-tab");
            navbar = $(".nav-bar[data-nav-value="+navValue+"]");

            if (!navbar.length > 0) { return; }
            
            button = navbar.find(".nav-button[data-nav-tab="+navTab+"]")

            if (!button.length > 0){
                selected = navbar.find(".nav-selected");
                selected.animate({left: 0, width: 0, opacity: 0}, 300);
                return;
            }
        }
        
        var posX = button.offset().left;
        var posY = button.offset().top;
        var btnWidth = button.outerWidth();

        selected = navbar.find(".nav-selected");
        posY += button.outerHeight() - selected.outerHeight();

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
    //#endregion
    //* Dialog.Scrim
    //#region
    $("body").on("click", ".dialog .scrim", function (e) {
        $(".dialog").removeClass("active");
    });
    //#endregion
    //#region
    //#endregion
});


//* Dialog
//#region
const Dialog = {
    OpenDialog(type, title, data){
        let dialog;
        switch (type){
            case "simple":
                dialog = Dialog.CreateSimpleDialog(title, data);
                break;
        }

        //$(".dialog[data-dialog-type="+type+"] .dialog-message").text(data);
        //$(".dialog[data-dialog-type="+type+"]").addClass("active");
        dialog.addClass("active");
    },
    CreateSimpleDialog(title, data){
        let dialog = $("<div/>", {"class":"dialog"}).appendTo("body");
            $("<div/>", {"class":"scrim active","click":function(){dialog.remove()}}).appendTo(dialog);
        let container = $("<div/>", {"class":"dialog-container"}).appendTo(dialog);
            let header = $("<div/>", {"class":"dialog-header"}).appendTo(container);
                $("<span/>", {"class":"dialog-title",text:title}).appendTo(header);
            let body = $("<div/>", {"class":"dialog-body"}).appendTo(container);
                $("<span/>",{"class":"dialog-message",text:data}).appendTo(body);
            let footer = $("<div/>", {"class":"dialog-footer"}).appendTo(container);
                $("<button/>", {"class":"animated","click":function(){dialog.remove()}})
                    .append($("<span/>", {"class":"btn_label",text:"Ok"}))
                    .appendTo(footer);

        return dialog;
    }
}
//#endregion


// $("body").on("input blur paste change keyup keydown", ".input-label.var > input", function () {
//     if ($(this).val().length > 0) { $(this).parent().addClass("active"); }
//     else { $(this).parent().removeClass("active"); }
// });

$(document).ready(function(){
    /** Navigation Drawer **/
    //#region
    $("body").on("click",".nav-drawer-toggle, .nav-drawer-scrim", function(e){
        let drawer = $(this).closest(".nav-drawer");
        
        drawer.find(".nav-drawer-toggle").toggleClass("active");
        drawer.find(".nav-drawer-scrim").toggleClass("active");
        drawer.find(".nav-drawer-contents").toggleClass("active inactive");
    });
    //#endregion
    /** Toggle Theme **/
    //#region
    if ($("html").hasClass("theme_light")){
        $(".theme-selector").addClass("theme_light");
    }
    $("body").on("click", ".theme-selector", function() {
        $(".theme-selector").toggleClass("theme_light");
        $("html").toggleClass("theme_light");
        // Set theme in local storage
        if ($("html").hasClass("theme_light")) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    //#endregion
    /** Navitagion Bar **/
    //#region
    $("body").on("click", ".nav-button", function(e) {
        let parent = $(this).parent(); 
        let selected;

        if (!parent.hasClass("nav-bar")){
            let nav_value = $(this).attr("data-nav-value");
            selected = $(".nav-bar[data-nav-value="+nav_value+"]").find(".nav-selected");
            selected.animate({left: 0, width: 0, opacity: 0}, 300);
            return;
        }
        
        var posX = $(this).offset().left;
        var posY = $(this).offset().top;
        var btnWidth = $(this).outerWidth();
        selected = parent.find(".nav-selected");
        selected.animate({top: posY, left: posX, width: btnWidth, opacity: 1}, 300);
    });
    //#endregion
    //#region
    //#endregion
    //#region
    //#endregion
    //#region
    //#endregion
    //#region
    //#endregion
});
document.addEventListener("DOMContentLoaded", function() {
    return;
    //#region on Document Ready () {}
    if (document.documentElement.classList.contains('theme_light')) {
        const meow_theme_selector = document.getElementsByClassName('theme-selector');
        for (var selector of meow_theme_selector) {
            selector.classList.add('theme_light');
        }
    }
    //#endregion
    //#region on Click {Component}
    document.addEventListener('click',function(e){
        if(e.target){
            console.log("e.target is valid");
            if (e.target.matches(".theme-selector")){
                // Get all theme-selectors
                const meow_theme_selector = document.getElementsByClassName('theme-selector');
                // Add .theme_dark to :root and .theme-selector
                document.documentElement.classList.toggle('theme_light');
                for (var selector of meow_theme_selector) {
                    selector.classList.toggle('theme_light');
                }
                // Set theme in local storage
                if (document.documentElement.classList.contains('theme_light')) {
                    localStorage.setItem('theme', 'light');
                } else {
                    localStorage.setItem('theme', 'dark');
                }
            } else if (e.target.matches(".nav-drawer-toggle, .nav-drawer-scrim")){
                let parent = e.target.parentNode;
                if (parent.parentNode.classList.contains("nav-drawer-title")){
                    parent = parent.closest(".nav-drawer");
                }
                parent.querySelector(".nav-drawer-title .nav-drawer-toggle").classList.toggle("active");
                parent.querySelector(".nav-drawer-toggle").classList.toggle("active");
                parent.querySelector(".nav-drawer-scrim").classList.toggle("active");
                parent.querySelector(".nav-drawer-contents").classList.toggle("active");
                parent.querySelector(".nav-drawer-contents").classList.toggle("inactive");
            } else if (false){
                //do something
            }
         }
     });
     //#endregion
});
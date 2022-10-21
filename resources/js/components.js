$(document).ready(function(){
    /** Navigation Drawer **/
    //#region
    // $(".nav-drawer-toggle, .nav-drawer-scrim").click(function(e){
    //     if ($(this).hasClass("active")){
    //         $(this).parent().find(".nav-drawer-toggle").removeClass("active");
    //         $(this).parent().find(".nav-drawer-scrim").removeClass("active");
    //         $(this).parent().find(".nav-drawer-contents").removeClass("active");
    //         $(this).parent().find(".nav-drawer-scrim").addClass("inactive");
    //         $(this).parent().find(".nav-drawer-contents").addClass("inactive");
    //     } else {
    //         $(this).parent().find(".nav-drawer-toggle").addClass("active");
    //         $(this).parent().find(".nav-drawer-scrim").removeClass("inactive");
    //         $(this).parent().find(".nav-drawer-contents").removeClass("inactive");
    //         $(this).parent().find(".nav-drawer-scrim").addClass("active");
    //         $(this).parent().find(".nav-drawer-contents").addClass("active");
    //     }
    // });
    //#endregion
    /** Toggle Theme **/
    //#region
    // const btn_theme = document.getElementsByClassName('theme-selector')[0];
    // if (!document.documentElement.classList.contains('theme_dark')) {
    //     btn_theme.classList.remove('theme_dark');
    // }
    // btn_theme.addEventListener('click', e => {
    //     e.preventDefault();
    //     // Add .theme_dark to :root and .theme-selector
    //     document.documentElement.classList.toggle('theme_dark');
    //     btn_theme.classList.toggle('theme_dark');
    //     // Set theme in local storage
    //     if (document.documentElement.classList.contains('theme_dark')) {
    //         localStorage.setItem('theme', 'dark');
    //     } else {
    //         localStorage.setItem('theme', 'light');
    //     }
    // });
    //#endregion
});
document.addEventListener("DOMContentLoaded", function() {
    console.log("ready");
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
            if (e.target.matches(".theme-selector")){
                e.preventDefault();
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
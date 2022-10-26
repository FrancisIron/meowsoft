function updateClock(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    document.getElementById("clock").firstChild.nodeValue = hours + ":" + minutes;
}

function updateTheme(value){
      $("html").removeClass("light dark");
      $(".theme-selector").removeClass("light dark");
      $("html").removeClass("theme_new_blue");
      $("html").removeClass("theme_new_darkblue");
      $("html").removeClass("theme_new_deepblue");
      $("html").removeClass("theme_new_lightred");
      $("html").removeClass("theme_new_pink");
      switch (value) {
            case 0: $("html").toggleClass("theme_new_blue"); break;
            case 1: $("html").toggleClass("theme_new_darkblue"); break;
            case 2: $("html").toggleClass("theme_new_deepblue"); break;
            case 3: $("html").toggleClass("theme_new_lightred"); break;
            case 4: $("html").toggleClass("theme_new_pink"); break;
            default: break;
      }     
}

$(document).ready(function(){
      $("body").on("click", ".theme-selector", function() {
            $("html").removeClass("theme_new_blue");
            $("html").removeClass("theme_new_darkblue");
            $("html").removeClass("theme_new_deepblue");
            $("html").removeClass("theme_new_lightred");
            $("html").removeClass("theme_new_pink");
      });
});

function toggleNavMode(){
      $(".nav-drawer-contents").toggleClass("anim-drawer-edge");
}

function toggleNavHeader(){
      $(".nav-drawer-contents").toggleClass("no-header");
}

function toggleAnim() {
      OpenDialog("simple","Work in Progress\nCurrent Theme: Vannkatt");
}
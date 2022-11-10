$(document).ready(function(){
    //* Vannkatt ~ Droplet
    $("body").on("click", ".animated", function(e) {
        var posX = e.pageX - $(this).offset().left;
        var posY = e.pageY - $(this).offset().top;
        var droplet = $("<span class='droplet' style='top:"+posY+"px;left:"+posX+"px;'></span>").appendTo($(this));    
        setTimeout(function() {droplet.remove();}, 1000);
    });
    //* Vannkatt ~ Ripple
    $("body").on("click", ".animated", function(e) {
        var posX = e.pageX - $(this).offset().left;
        var posY = e.pageY - $(this).offset().top;
        var ripple = $("<span class='ripple' style='top:"+posY+"px;left:"+posX+"px;'></span>").appendTo($(this));    
        setTimeout(function() {ripple.remove();}, 1000);
    });
});

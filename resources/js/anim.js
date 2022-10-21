$(document).ready(function(){
    /** Ripple */
    // $("body").on("click", ".anim-active-ripple", function(e) {
    $(".anim-active-ripple").parent().click(function(e){
        var posX = e.pageX - $(this).offset().left;
        var posY = e.pageY - $(this).offset().top;
        var ripple = $("<span class='anim-ripple' style='top:"+posY+";left:"+posX+";'></span>").appendTo($(this));    
        setTimeout(function() {ripple.remove();}, 1000);
    });
    /** Edge **/
    $(".anim-active-edge").parent().click(function(e){
        var posX = e.pageX - $(this).offset().left;
        var parentWidth = $(this).outerWidth();
        var edge_l = $("<span class='anim-edge-left' style='left:"+posX+";'></span>").appendTo($(this));
        var edge_r = $("<span class='anim-edge-right' style='left:"+posX+";'></span>").appendTo($(this));
        edge_l.animate({
            left: posX - parentWidth
        }, 600, function(){
            $(this).remove();
        });
        edge_r.animate({
            left: posX + parentWidth
        }, 600, function(){
            $(this).remove();
        });
    });
    /** Droplet **/
    $(".anim-active-droplet").parent().click(function(e){
        var posX = e.pageX - $(this).offset().left;
        var posY = e.pageY - $(this).offset().top;
        var droplet = $("<span class='anim-droplet' style='top:"+posY+";left:"+posX+";'></span>").appendTo($(this));    
        setTimeout(function() {droplet.remove();}, 1000);
    });
});
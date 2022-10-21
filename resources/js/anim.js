$(document).ready(function(){
    /** Droplet **/
    $(".anim-active-droplet").parent().click(function(e){
        var posX = e.pageX - $(this).position().left;
        var posY = e.pageY - $(this).position().top;
        var droplet = $("<span class='anim-droplet' style='top:"+posY+";left:"+posX+";'></span>").appendTo($(this));    
        setTimeout(function() {droplet.remove();}, 1500);
    });
    /** Ripple */
    
});
$(document).ready(function(){
    //* Main Container
    //#region
    setMainSize();
    function setMainSize(){
        let size = window.innerHeight - $(".header").outerHeight() - $(".footer").outerHeight();
        $(".main").css("height",size+"px");
    }
    $(window).on("resize", function(){setMainSize()});
    //#endregion
    //* Navigation Drawer
    //#region
    $("body").on("click",".nav-drawer-toggle, .nav-drawer-scrim, .nav-drawer-close", function(e){
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
                selected.removeAttr("data-nav-tab");
                selected.animate({left: 0, width: 0, opacity: 0}, 300);
                return;
            }
        }

        selected = navbar.find(".nav-selected");
        selected.attr("data-nav-tab",button.attr("data-nav-tab"));

        var posX = button.offset().left;
        var posY = button.offset().top;
        var btnWidth = button.outerWidth();

        posY += button.outerHeight() - selected.outerHeight();

        selected.animate({top: posY, left: posX, width: btnWidth, opacity: 1}, 300);
    });
    $(window).on('resize', function(e){
        let selected = $(".nav-selected");
        let navbar = selected.closest(".nav-bar");
        let navTab = selected.attr("data-nav-tab");
        let button = navbar.find(".nav-button[data-nav-tab="+navTab+"]");

        if (!button.length > 0){
            return;
        }

        var posX = button.offset().left;
        var posY = button.offset().top;
        var btnWidth = button.outerWidth();

        posY += button.outerHeight() - selected.outerHeight();

        selected.css({top: posY, left: posX, width: btnWidth, opacity: 1});
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
    //* Table
    //#region
    $(".table-search-input > input").val("");
    $("body").on("click", ".table_header-row > th", function () {
        let table = $(this).parents("table").eq(0);
        let rows = table.find("tr:gt(0)").toArray().sort(sortTable(table,$(this).index()));
        this.asc = !this.asc;
        if (!this.asc){
            rows = rows.reverse();
        }
        for (let i = 0; i < rows.length; i++){
            table.append(rows[i]);
        }
        sortIcon(table, this);
    });
    function sortTable(table, index){
        return function(a,b){
            var valueA = getCellValue(a, index);
            var valueB = getCellValue(b, index);
            return $.isNumeric(valueA) && $.isNumeric(valueB) ? valueA - valueB : valueA.toString().localeCompare(valueB);
        }
    }   
    function getCellValue(row, index){
        return $(row).children("td").eq(index).text();
    }
    function sortIcon(table, header){
        let icon = table.find(".table-sort").eq(0);
        if (!icon.length > 0) {
            icon = $("<span/>",{"class":"table-sort material-symbols-outlined"}).appendTo(table);
        }
        icon.removeClass(!header.asc?"upward":"downward");
        icon.addClass(header.asc?"upward":"downward");

        var posX = $(header).offset().left;
        var posY = $(header).offset().top;
        var size = $(header).outerHeight();
        posX += $(header).outerWidth() - size;
        icon.css({top: posY, left: posX, height: size, width: size});
    }
    /** Input Validator */
    $('input.validate-numbers-only').on('input blur paste', function(){
        $(this).val($(this).val().replace(/\D/g, ''))
    });
    //#endregion
    //* Tooltip
    //#region
    // mouseover
    $("body").on("mouseenter", ".has-tooltip", function () {
        let tooltip = $(".tooltip");
        tooltip.addClass("active");
        tooltip.text($(this).attr("data-tooltip"));

        let pos = $(this).attr("data-tooltip-pos");

        let posX = $(this).offset().left;
        let posY = $(this).offset().top;
        let translate = "none";

        switch(pos){
            case "top": 
                posX += $(this).outerWidth()/2 - tooltip.outerWidth()/2;
                posY -= tooltip.outerHeight() + vmin(1);
                break;
            case "left": 
                posX -= tooltip.outerWidth() + vmin(1);
                posY += $(this).outerHeight()/2;
                translate = "translateY(-50%)";
                break;
            case "bottom": 
                posX += $(this).outerWidth()/2 - tooltip.outerWidth()/2;
                posY += $(this).outerHeight() + vmin(1);
                break;
            case "right": 
                posX += $(this).outerWidth() + vmin(1);
                posY += $(this).outerHeight()/2;
                translate = "translateY(-50%)";
                break;
        }

        tooltip.attr("data-tooltip-pos",pos);
        tooltip.css({top: posY, left: posX, transform: translate});

    });
    $("body").on("mouseleave", ".has-tooltip", function () {
        let tooltip = $(".tooltip");
        tooltip.removeClass("active");
        tooltip.text("");
    });
    //#endregion
    //* Context Menu 
    //#region
    $("body").on("click", ".has-context-menu", function () {
        let context = $(this).attr("data-context-menu");
        let menu = $(".context-menu[data-context-menu="+context+"]");
        if (!menu > 0) {return;}
        let pos = $(this).attr("data-context-menu-pos");

        let posX = $(this).offset().left;
        let posY = $(this).parent().offset().top;
        switch(pos){
            case "mouse":
                break;
            case "topright": 
        //         posX += $(this).outerWidth()/2 - tooltip.outerWidth()/2;
        //         posY -= tooltip.outerHeight() + vmin(1);
                break;
            case "topleft": 
        //         posX -= tooltip.outerWidth() + vmin(1);
        //         posY += $(this).outerHeight()/2;
        //         translate = "translateY(-50%)";
                break;
            case "bottomright": 
                posX += $(this).outerWidth() - menu.outerWidth();
                posY += $(this).parent().outerHeight();
                break;
            case "bottomleft": 
        //         posX += $(this).outerWidth() + vmin(1);
        //         posY += $(this).outerHeight()/2;
        //         translate = "translateY(-50%)";
                break;
        }

        // tooltip.attr("data-tooltip-pos",pos);





        posX += $(this).outerWidth() - menu.outerWidth();
        posY += $(this).parent().outerHeight();
        menu.css({top: posY, left: posX});

        menu.addClass("active");
        // Dialog.CreateNYIDialog(function(){window.location = "./login.html"});
    });
    //#endregion
    //* 
    //#region
    //#endregion
    //* 
    //#region
    //#endregion
    //* 
    //#region
    //#endregion
    //* 
    //#region
    //#endregion
});


//* Table
//#region
function filterTable(table){
    var filter = $(".table-search[data-table-id="+table+"] .table-search-input > input").val().toLowerCase();
    $("#"+table).find("tbody tr").each(function() { 
        let content = $(this).text().toLowerCase();
        if ((filter.length == 0 || content.indexOf(filter) >= 0)){
            $(this).fadeIn(300);
        } else {
            $(this).fadeOut(300);
        }
    });
}
//#endregion

//* Dialog
//#region
const Dialog = {
    OpenDialog(type, title, data, onclose){
        let dialog;
        switch (type){
            case "nyi":
                dialog = Dialog.CreateSimpleDialog(onclose);
                break;
            case "simple":
                dialog = Dialog.CreateSimpleDialog(title, data, onclose);
                break;
        }

        //$(".dialog[data-dialog-type="+type+"] .dialog-message").text(data);
        //$(".dialog[data-dialog-type="+type+"]").addClass("active");
        dialog.addClass("active");
    },
    CreateNYIDialog(onclose){
        return Dialog.CreateSimpleDialog("Error!", "Not yet implemented.", onclose);
    },
    CreateSimpleDialog(title, data, onclose){
        if (!onclose) { onclose = function onclose(){}}
        let dialog = $("<div/>", {"class":"dialog"}).appendTo("body");
            $("<div/>", {"class":"scrim active","click":function(){dialog.remove(); onclose()}}).appendTo(dialog);
        let container = $("<div/>", {"class":"dialog-container"}).appendTo(dialog);
            let header = $("<div/>", {"class":"dialog-header"}).appendTo(container);
                $("<span/>", {"class":"dialog-title",text:title}).appendTo(header);
            let body = $("<div/>", {"class":"dialog-body"}).appendTo(container);
                $("<span/>",{"class":"dialog-message",text:data}).appendTo(body);
            let footer = $("<div/>", {"class":"dialog-footer"}).appendTo(container);
                $("<button/>", {"class":"animated","click":function(){dialog.remove(); onclose()}})
                    .append($("<span/>", {"class":"btn_label",text:"Ok"}))
                    .appendTo(footer);

        return dialog;
    }
}
//#endregion

//* Utility
//#region
function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
function vmin(percent) {
    return Math.min(vh(percent), vw(percent));
}
function vmax(percent) {
    return Math.max(vh(percent), vw(percent));
}
//#endregion



// $("body").on("input blur paste change keyup keydown", ".input-label.var > input", function () {
//     if ($(this).val().length > 0) { $(this).parent().addClass("active"); }
//     else { $(this).parent().removeClass("active"); }
// });

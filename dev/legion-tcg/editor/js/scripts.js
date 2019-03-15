$(document).ready(function () {
    /** Initialize MaterializeCSS Components **/
    // Tabs
    M.Tabs.init($('.tabs'));
    // Sidenav
    M.Sidenav.init($('.sidenav'), {
        menuWidth: 300,
        edge: 'right',
        loseOnClick: true
    });
    //M.ScrollSpy.init($('.scrollspy'));
    // Modals
    M.Modal.init($('.modal'));
    /** MaterializeCSS End **/
    /** Scripts **/
    $('#btn-card-delete').click(function () {

    });

    /** Load Ready **/
    $('input, textarea').disableAutoFill();
    onLoad();
});

function onLoad() {
    // Destroy preloader
    $("#preloader").fadeOut(1000, function () {
        $("#preloader").css("background", "#00000000");
        $("#preloader").hide();
    });
}

function onSubmit1() {
    if ($("#droplistRegion option:selected").val() == "") {
        M.toast({ html: 'Debe seleccionar una Region', classes: 'rounded' });
    } else if ($("#droplistInstitucion option:selected").val() == "") {
        M.toast({ html: 'Debe seleccionar una Institucion', classes: 'rounded' });
    } else if ($("#droplistSede option:selected").val() == "") {
        M.toast({ html: 'Debe seleccionar una Sede', classes: 'rounded' });
    } else if ($("#id-laboratorio").val() == "") {
        M.toast({ html: 'Debe ingresar un Id de Laboratorio', classes: 'rounded' });
    } else if ($("#id-tecnico").val() == "") {
        M.toast({ html: 'Debe ingresar un Id de Tecnico', classes: 'rounded' });
    } else {
        // Do Something Here...
        $("#preloader").show();
        $("#div-inputs").fadeOut(1000, function () {
            $("#div-inputs").hide();
            $("#preloader").css({ 'background-color': '' });

            var Data = require('./data.js');
            $("#output-p").text(Data.getSystem);

            $("#div-output").fadeIn(100, function () {
                $("#preloader").hide();
            });
        });
    }
}

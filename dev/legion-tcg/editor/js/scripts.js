var _cards = {};

$(document).ready(function () {
    //console.log('DEBUG: initializing components');
    /** Initialize MaterializeCSS Components **/
    // Tabs
    M.Tabs.init($('.tabs'), {
        onShow: function () {
            $('#tabs-wrapper > .active').css('display', 'flex');
        }
    });
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
    /** Button Scripts **/
    $('#btn-card-new').click(function () {
        //console.log('DEBUG: btn-card-new pressed');
        clearAllInputs();
    });
    $('#btn-card-save').click(function () {
        //console.log('DEBUG: btn-card-save pressed');
        saveCardBtn();
    });
    $('#btn-card-delete').click(function () {
        //console.log('DEBUG: btn-card-delete pressed');
        deleteCardBtn();
    });
    /** Button Scripts End **/
    /** Load Ready **/
    clearAllInputs();
    onLoad(false);
});

function clearAllInputs() {
    //console.log('DEBUG: clearing inputs');
    $('input, textarea').disableAutoFill();
    $('input, textarea').val('');
    $('input + label, textarea + label').removeClass('active');
}

function saveCardBtn() {
    if (!($('#card-id').val())) {
        //console.log('DEBUG: card-id is empty');
        fnUpdateCID();
        $('#card-id').val(cid);
        $('#card-id').addClass('active');
    }
    var card = {
        id: $('#card-id').val(),
        name: $('#card-name').val(),
        descriptionEN: $('#card-descriptionEN').val(),
        descriptionES: $('#card-descriptionES').val(),
        rarity: $('#card-rarity').val(),
        type: $('#card-type').val(),
        faction: $('#card-faction').val(),
        value: $('#card-value').val(),
        damage: $('#card-damage').val(),
        defense: $('#card-defense').val(),
        health: $('#card-health').val()
    };
    if (!card['descriptionEN']) card['descriptionEN'] = "";
    if (!card['descriptionES']) card['descriptionES'] = "";
    //console.log('DEBUG: card data:', card);
    fnUpdateCard(card);
}

function deleteCardBtn() {
    if (!($('#card-id').val())) {
        //console.log('DEBUG: card-id is empty');
        M.toast({ html: 'Current document hasn\'t been saved' });
    } else {
        $('#modal-delete-span').text('card #' + $('#card-id').val());
        $('#modal-delete-confirm').on('click', function () { fnBackupCard($('#card-id').val()); });
        M.Modal.getInstance($('#modal-delete')).open();
    }
}

function createCardListItem(card) {
    _cards[card['id']] = card;
    var container = $('#card-scroll-list');
    container.append('<div class="scroll-list-item n-trigger-card">'
        + '<a id="card-item-' + card['id'] + '" class= "waves-effect waves-light btn --n-color-light" >'
        + '<i class="material-icons left">crop_portrait</i>'
        + card['id'] + '</a ></div >');
    updateCardInputs(card);
}

function updateCardListItem(card) {
    _cards[card['id']] = card;
    updateCardInputs(card);
}

function removeCardListItem(card) {
    delete _cards[card['id']];

}

function updateCardInputs(card) {

}

function onLoad(show) {
    if (show) {
        // Show preloader
        $("#preloader").fadeIn(1000, function () {
            $("#preloader").show();
        });
    } else {
        // Hide preloader
        $("#preloader").fadeOut(1000, function () {
            //$("#preloader").css("background", "#00000000");
            $("#preloader").hide();
        });
    }
}


var _cards = {};

$(document).ready(function () {
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
    // Select
    M.FormSelect.init($('select'));
    /** MaterializeCSS End **/
    /** jQuery.Alphanum Validators **/
    $("input#card-name").alphanum({
        allowNewline: false
    });
    $("input#card-rarity, input#card-value").numeric({
        allowPlus: false,
        allowMinus: false,
        allowThouSep: false,
        allowDecSep: false,
        allowLeadingSpaces: false,
        maxDigits: 1
    });
    $("input#card-damage, input#card-defense, input#card-health").numeric({
        allowPlus: false,
        allowMinus: false,
        allowThouSep: false,
        allowDecSep: false,
        allowLeadingSpaces: false,
        maxDigits: 2
    });
    /** jQuery.Alphanum End**/
    /** Button Scripts **/
    $('#btn-card-new').click(function () {
        clearAllInputs();
    });
    $('#btn-card-save').click(function () {
        saveCardBtn();
    });
    $('#btn-card-delete').click(function () {
        deleteCardBtn();
    });
    $('#btn-settings-save').click(function () {
        updateDroplistOptions();
    });
    /** Button Scripts End **/
    /** Load Ready **/
    clearAllInputs();
    onLoad(false);
});

/** Card-Editor Buttons **/
function clearAllInputs() {
    //console.log('DEBUG: clearing inputs');
    $('input, textarea').disableAutoFill();
    $('input, textarea').val('');
    $('select').val([]);
    $('input + label, textarea + label').removeClass('active');
}
function saveCardBtn() {
    if (!($('#card-id').val())) {
        //console.log('DEBUG: card-id is empty');
        fnUpdateCID();
        $('#card-id').val(cid);
        $('#card-id + label').addClass('active');
    }
    var card = {
        id: $.trim($('#card-id').val()),
        name: $.trim($('#card-name').val()),
        descriptionEN: $.trim($('#card-descriptionEN').val()),
        descriptionES: $.trim($('#card-descriptionES').val()),
        rarity: $.trim($('#card-rarity').val()),
        type: $.trim($('#card-type').val()),
        faction: $.trim($('#card-faction').val()),
        value: $.trim($('#card-value').val()),
        damage: $.trim($('#card-damage').val()),
        defense: $.trim($('#card-defense').val()),
        health: $.trim($('#card-health').val())
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
        + '<a id="card-item-' + card["id"] + '" class= "waves-effect waves-light btn --n-color-light" value="' + card["id"] + '">'
        + '<i class="material-icons left">crop_portrait</i>'
        + card["id"] + '</a ></div >');
    var btnId = "#card-item-" + card['id'];
    $(btnId).on('click', function () {
        $('.n-trigger-card > .-n-active').removeClass('-n-active');
        $(this).addClass('-n-active');
        updateCardInputs(_cards[$(this).attr('value')]);
    });
}
function updateCardListItem(card) {
    _cards[card['id']] = card;
}
function removeCardListItem(card) {
    delete _cards[card['id']];
    $('#card-item-' + card['id']).parent().remove();
}
function updateCardInputs(card) {
    //$('#card-id').val().length
    $('#card-id + label').addClass('active');
    if (card['name'].length > 0) { $('#card-name + label').addClass('active'); } else { $('#card-name + label').removeClass('active'); }
    if (card['descriptionEN'].length > 0) { $('#card-descriptionEN + label').addClass('active'); } else { $('#card-descriptionEN + label').removeClass('active'); }
    if (card['descriptionES'].length > 0) { $('#card-descriptionES + label').addClass('active'); } else { $('#card-descriptionES + label').removeClass('active'); }
    if (card['rarity'].length > 0) { $('#card-rarity + label').addClass('active'); } else { $('#card-rarity + label').removeClass('active'); }
    if (card['type'].length > 0) { $('#card-type + label').addClass('active'); } else { $('#card-type + label').removeClass('active'); }
    if (card['faction'].length > 0) { $('#card-faction + label').addClass('active'); } else { $('#card-faction + label').removeClass('active'); }
    if (card['value'].length > 0) { $('#card-value + label').addClass('active'); } else { $('#card-value + label').removeClass('active'); }
    if (card['damage'].length > 0) { $('#card-damage + label').addClass('active'); } else { $('#card-damage + label').removeClass('active'); }
    if (card['defense'].length > 0) { $('#card-defense + label').addClass('active'); } else { $('#card-defense + label').removeClass('active'); }
    if (card['health'].length > 0) { $('#card-health + label').addClass('active'); } else { $('#card-health + label').removeClass('active'); }
    $('#card-id').val(card['id']);
    $('#card-name').val(card['name']);
    $('#card-descriptionEN').val(card['descriptionEN']);
    $('#card-descriptionES').val(card['descriptionES']);
    $('#card-rarity').val(card['rarity']);
    $('#card-type').val(card['type']);
    $('#card-faction').val(card['faction']);
    $('#card-value').val(card['value']);
    $('#card-damage').val(card['damage']);
    $('#card-defense').val(card['defense']);
    $('#card-health').val(card['health']);
}
/** Card-Editor Buttons END **/
/** Settings-Editor Buttons **/
function updateDroplistOptions() {
    var droplistCardType = [];
    var droplistCardFaction = [];
    var droplistAbilityType = [];
    var droplist = "";
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-card-type-" + i;
        var text = $.trim($(droplist).val());
        if (text.length > 0) droplistCardType.push(text);
    }
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-card-faction-" + i;
        var text = $.trim($(droplist).val());
        if (text.length > 0) droplistCardFaction.push(text);
    }
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-ability-type-" + i;
        var text = $.trim($(droplist).val());
        if (text.length > 0) droplistAbilityType.push(text);
    }
    fnUpdateCardSettings(droplistCardType, droplistCardFaction, droplistAbilityType);
}
function emptyDroplistOptions() {
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-card-type-" + i;
        $(droplist).val('');
        $(droplist).next().removeClass('active');
    }
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-card-faction-" + i;
        $(droplist).val('');
        $(droplist).next().removeClass('active');
    }
    for (var i = 1; i <= 7; i++) {
        droplist = "#settings-ability-type-" + i;
        $(droplist).val('');
        $(droplist).next().removeClass('active');
    }
}
function loadDroplistOptions(cardTypes, cardFactions, abilityTypes) {
    var cardTypeVal = $('#card-type').val();
    var cardFactionVal = $('#card-faction').val();
    //var abilityTypeVal = $('#ability-type').val();
    $('#card-type').empty();
    $('#card-faction').empty();
    //$('#ability-type').empty();
    emptyDroplistOptions();
    var droplist = "";
    for (var i = 0; i < cardTypes.length; i++) {
        droplist = "#settings-card-type-" + (i+1);
        $(droplist).val(cardTypes[i]);
        $(droplist).next().addClass('active');
        $('#card-type').append(new Option(cardTypes[i], cardTypes[i]));
    }
    for (var i = 0; i < cardFactions.length; i++) {
        droplist = "#settings-card-faction-" + (i + 1);
        $(droplist).val(cardFactions[i]);
        $(droplist).next().addClass('active');
        $('#card-faction').append(new Option(cardFactions[i], cardFactions[i]));
    }
    for (var i = 0; i < abilityTypes.length; i++) {
        droplist = "#settings-ability-type-" + (i + 1);
        $(droplist).val(abilityTypes[i]);
        $(droplist).next().addClass('active');
        //$('#ability-type').append(new Option(abilityTypes[i], abilityTypes[i]));
    }
    $('#card-type').val(cardTypeVal);
    $('#card-faction').val(cardFactionVal);
    //$('#ability-type').val(abilityTypeVal);
    // Re initialize selectors
    M.FormSelect.init($('select'));
}
/** Settings-Editor Buttons END**/
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


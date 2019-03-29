var _cards = {};
var _settingsCardsType = {};

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
    $("input#card-rarity, input#card-limit, input#card - value").numeric({
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
    $("input.settings-attr").alphanum({
        allow: '01-',
        allowSpace: false,
        allowNewline: false,
        allowNumeric: false,
        allowUpper: false,
        allowLower: false,
        allowCaseless: false,
        allowLatin: false,
        allowOtherCharSets: false,
        maxLength: NaN
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
    /** Other Config Scripts **/
    $('#card-type').on('change', function () {
        onCardTypeChange($(this));
    });
    /** Load Ready **/
    clearAllInputs();
    onLoad(false);
});

/** Card-Editor Buttons **/
function clearAllInputs() {
    $('input, textarea').disableAutoFill();
    $('input, textarea').val('');
    $('input + label, textarea + label').removeClass('active');
    $('select').val([]);
    // Re initialize selectors
    M.FormSelect.init($('select'));
}
function saveCardBtn() {
    if (!($('#card-id').val())) {
        fnUpdateCID();
        $('#card-id').val(cid);
        $('#card-id + label').addClass('active');
    }
    var card = {
        id: $.trim($('#card-id').val()),
        nameEN: $.trim($('#card-nameEN').val()),
        nameES: $.trim($('#card-nameES').val()),
        descriptionEN: $.trim($('#card-descriptionEN').val()),
        descriptionES: $.trim($('#card-descriptionES').val()),
        rarity: $.trim($('#card-rarity').val()),
        limit: $.trim($('#card-limit').val()),
        type: $.trim($('#card-type').val()),
        faction: $.trim($('#card-faction').val()),
        value: $.trim($('#card-value').val()),
        damage: $.trim($('#card-damage').val()),
        defense: $.trim($('#card-defense').val()),
        health: $.trim($('#card-health').val())
    };
    if (!card['descriptionEN']) card['descriptionEN'] = "";
    if (!card['descriptionES']) card['descriptionES'] = "";
    fnUpdateCard(card);
}
function deleteCardBtn() {
    if (!($('#card-id').val())) {
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
        + '<span class="left">' + card["id"] + '</span>'
        + '<span class="left" style="padding:0px 5px">-</span>'
        + '<span class="left">' + card["nameES"] + '</span></a ></div > ');
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
    $('#card-id + label').addClass('active');
    if (card['nameEN'].length > 0) { $('#card-nameEN + label').addClass('active'); } else { $('#card-nameEN + label').removeClass('active'); }
    if (card['nameES'].length > 0) { $('#card-nameES + label').addClass('active'); } else { $('#card-nameES + label').removeClass('active'); }
    if (card['descriptionEN'].length > 0) { $('#card-descriptionEN + label').addClass('active'); } else { $('#card-descriptionEN + label').removeClass('active'); }
    if (card['descriptionES'].length > 0) { $('#card-descriptionES + label').addClass('active'); } else { $('#card-descriptionES + label').removeClass('active'); }
    if (card['rarity'].length > 0) { $('#card-rarity + label').addClass('active'); } else { $('#card-rarity + label').removeClass('active'); }
    if (card['limit'].length > 0) { $('#card-limit + label').addClass('active'); } else { $('#card-limit + label').removeClass('active'); }
    if (card['type'].length > 0) { $('#card-type + label').addClass('active'); } else { $('#card-type + label').removeClass('active'); }
    if (card['faction'].length > 0) { $('#card-faction + label').addClass('active'); } else { $('#card-faction + label').removeClass('active'); }
    if (card['value'].length > 0) { $('#card-value + label').addClass('active'); } else { $('#card-value + label').removeClass('active'); }
    if (card['damage'].length > 0) { $('#card-damage + label').addClass('active'); } else { $('#card-damage + label').removeClass('active'); }
    if (card['defense'].length > 0) { $('#card-defense + label').addClass('active'); } else { $('#card-defense + label').removeClass('active'); }
    if (card['health'].length > 0) { $('#card-health + label').addClass('active'); } else { $('#card-health + label').removeClass('active'); }
    $('#card-id').val(card['id']);
    $('#card-nameEN').val(card['nameEN']);
    $('#card-nameES').val(card['nameES']);
    $('#card-descriptionEN').val(card['descriptionEN']);
    $('#card-descriptionES').val(card['descriptionES']);
    $('#card-rarity').val(card['rarity']);
    $('#card-limit').val(card['limit']);
    $('#card-type').val(card['type']);
    $('#card-faction').val(card['faction']);
    $('#card-value').val(card['value']);
    $('#card-damage').val(card['damage']);
    $('#card-defense').val(card['defense']);
    $('#card-health').val(card['health']);
    $('#card-type').trigger('change');
}
function onCardTypeChange(drop) {
    var settings = [false, false, false, false, false];
    for (var i = 0; i < _settingsCardsType.length; i++) {
        var config = _settingsCardsType[i];
        if (config['name'] == $(drop).val()) {
            if (config['hasFaction']) { settings[0] = true; }
            if (config['hasValue']) { settings[1] = true; }
            if (config['canAttack']) { settings[2] = true; }
            if (config['canDefend']) { settings[3] = true; }
            if (config['hasHealth']) { settings[4] = true; }
            break;
        }
    }
    $('#card-faction').prop('disabled', !settings[0]);
    $('#card-value').prop('disabled', !settings[1]);
    $('#card-damage').prop('disabled', !settings[2]);
    $('#card-defense').prop('disabled', !settings[3]);
    $('#card-health').prop('disabled', !settings[4]);
    // Re initialize selectors
    M.FormSelect.init($('select'));
}
/** Card-Editor Buttons END **/
/** Settings-Editor Buttons **/
function updateDroplistOptions() {
    var droplistCardType = [];
    var droplistCardFaction = [];
    var droplistAbilityType = [];
    var droplist = "";
    for (var i = 1; i <= 7; i++) {
        var settings = {};
        droplist = "#settings-card-type-" + i;
        droplistConfig = "#settings-card-type-" + i + "-attributes";
        var name = $.trim($(droplist).val());
        if (name.length > 0) {
            settings['name'] = name;
            var config = $.trim($(droplistConfig).val());
            if (config.length > 0) {
                var regex = new RegExp('(0|1)-(0|1)-(0|1)-(0|1)-(0|1)');
                if (regex.test(config)) {
                    config = config.split("-");
                    settings['hasFaction'] = (config[0] == 1);
                    settings['hasValue'] = (config[1] == 1);
                    settings['canAttack'] = (config[2] == 1);
                    settings['canDefend'] = (config[3] == 1);
                    settings['hasHealth'] = (config[4] == 1);
                }
            } else {
                settings['hasFaction'] = false;
                settings['hasValue'] = false;
                settings['canAttack'] = false;
                settings['canDefend'] = false;
                settings['hasHealth'] = false;
            }
            droplistCardType.push(settings);
        }
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
        droplistConfig = "#settings-card-type-" + i + "-attributes";
        $(droplist).val('');
        $(droplistConfig).val('');
        $(droplist).next().removeClass('active');
        $(droplistConfig).next().removeClass('active');
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
        droplist = "#settings-card-type-" + (i + 1);
        droplistConfig = "#settings-card-type-" + (i + 1) + "-attributes";
        $(droplist).val(cardTypes[i]['name']);
        $(droplist).next().addClass('active');
        $(droplistConfig).next().addClass('active');
        var config = "";
        if (cardTypes[i]['hasFaction']) { config += "1-"; } else { config += "0-"; };
        if (cardTypes[i]['hasValue']) { config += "1-"; } else { config += "0-"; };
        if (cardTypes[i]['canAttack']) { config += "1-"; } else { config += "0-"; };
        if (cardTypes[i]['canDefend']) { config += "1-"; } else { config += "0-"; };
        if (cardTypes[i]['hasHealth']) { config += "1"; } else { config += "0"; };
        $(droplistConfig).val(config);
        $('#card-type').append(new Option(cardTypes[i]['name'], cardTypes[i]['name']));
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
            $("#preloader").hide();
        });
    }
}


var db = null;
var uid = null;
var ucv = null;
var uce = null;
var umeowname = null;
var cid = 0;

$(document).ready(function () {
    // FirebaseUI config.
    var uiConfig = {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    };
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
});
function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        onLoad(true);
        if (user) {
            // User is signed in.
            uid = user.uid;
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            //var isAnonymous = user.isAnonymous;
            //var providerData = user.providerData;
            fnLoadUserSettings(displayName, email, emailVerified, photoURL);
        } else {
            // User is signed out.
            uid = null;
            ucv = null;
            uce = null;
            umeowname = null;
            var uemail = null;
            db.collection("lcgCards").onSnapshot(function () { });
            db.collection("lcgSettings").onSnapshot(function () { });
            fnSignOut();
        }
    });
    document.getElementById('btn-log-out').addEventListener('click', function () {
        firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            console.log("Something happened...", error);
        });
    });
}
window.onload = function () {
    db = firebase.firestore();
    initApp();
};

/** Custom Scripts **/
/** User Settings **/
function fnLoadUserSettings(displayName, email, emailVerified, photoURL) {
    if (uid == null) { return; }
    db.collection("users").doc(uid)
        .get().then(function (doc) {
            if (doc.exists) {
                // Read data
                var isEditor = doc.data()["tcgEditor"];
                if (!isEditor) {
                    fnSaveUserSettings(name, email);
                    fnLoadUserSettings(name, email);
                    return;
                }
                ucv = doc.data()["tcgView"];
                uce = doc.data()["tcgEdit"];
                umeowname = doc.data()["userMeowName"];
                if (ucv) {  // user can view
                    fnSignIn(displayName, email, emailVerified, photoURL);
                    fnLoadSettings();
                    fnDownloadCards();
                } else {    // user can't view
                    $('btn-log-out').click();
                    M.Modal.getInstance($('#modal-no-view')).open();
                    onLoad(false);
                }
            } else {
                // doc.data() will be undefined in this case
                fnSaveUserSettings(name, email);
                fnLoadUserSettings(name, email);
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}

// Default Settings
function fnSaveUserSettings(name, email) {
    if (uid == null) { return; }
    var usersRef = db.collection("users");
    usersRef.doc(uid).set({
        userMeowName: name,
        userEMail: email,
        tcgEditor: true,
        tcgView: false,
        tcgEdit: false
    }, { merge: true });
}

/** Legion-TCG **/
// Real-time Settings
function fnLoadSettings() {
    db.collection("lcgSettings").doc("cards")
        .onSnapshot(function (doc) {
            cid = doc.data()['cid'];
            _settingsCardsType = doc.data()['cardTypes'];
            var cardFactions = doc.data()['cardFactions'];
            var abilityTypes = doc.data()['abilityTypes'];
            loadDroplistOptions(_settingsCardsType, cardFactions, abilityTypes);
        });
}

// Real-time Card Downloads
function fnDownloadCards() {
    if (uid == null) { return; }
    db.collection("lcgCards")
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    createCardListItem(change.doc.data());
                    if (parseInt(change.doc.data()['id']) >= cid) {
                        M.toast({ html: '@' + change.doc.data()['lastEditedBy'] + ' created a card, #' + change.doc.data()['id'] });
                    }
                }
                if (change.type === "modified") {
                    updateCardListItem(change.doc.data());
                    M.toast({ html: '@' + change.doc.data()['lastEditedBy'] + ' updated card #' + change.doc.data()['id'] + ' - ' + change.doc.data()['nameES'] });
                }
                if (change.type === "removed") {
                    fnRemovedDocument("lcgCardsBackup", change.doc.data()['id']);
                    removeCardListItem(change.doc.data());
                }
            });
        });
}

// Update CardType/Faction & AbilityType Data
function fnUpdateCardSettings(cardTypes,cardFactions,abilityTypes) {
    if (uid == null) { return; }
    db.collection("lcgSettings")
        .doc('cards').set({
            cardTypes: cardTypes,
            cardFactions: cardFactions,
            abilityTypes: abilityTypes
        }, { merge: true });
}

// Update Card ID
function fnUpdateCID() {
    if (uid == null) { return; }
    cid++;
    db.collection("lcgSettings")
        .doc('cards').set({
            cid: cid
        }, { merge: true });
}

// Update Card
function fnUpdateCard(card) {
    if (uid == null) { return; }
    db.collection("lcgCards")
        .doc(card['id']).set({
            lastEditedBy: umeowname,
            id: card['id'],
            nameEN: card['nameEN'],
            nameES: card['nameES'],
            descriptionEN: card['descriptionEN'],
            descriptionES: card['descriptionES'],
            rarity: card['rarity'],
            limit: card['limit'],
            type: card['type'],
            faction: card['faction'],
            value: card['value'],
            damage: card['damage'],
            defense: card['defense'],
            health: card['health']
        }, { merge: true });
}

// Get Document
function fnDownloadDocument(dbid,documentid) {
    if (uid == null) { return; }
    db.collection(dbid).doc(documentid)
        .get().then(function (doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("Could not find document " +dbid+'@'+documentid);
                return null;
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            return null;
        });
}

// Get Removed Document
function fnRemovedDocument(dbid, documentid) {
    if (uid == null) { return; }
    db.collection(dbid).doc(documentid)
        .get().then(function (doc) {
            if (doc.exists) {
                M.toast({ html: '@' + doc.data()['removedBy'] + ' removed card ' + doc.data()['id'] })
            } else {
                console.log("Could not find document " + dbid + '@' + documentid);
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}

// Backup Card
function fnBackupCard(cardNumber) {
    if (uid == null) { return; }
    var card = _cards[cardNumber];
    if (card == null) { return; }
    db.collection("lcgCardsBackup")
        .doc(card['id']).set({
            removedBy: umeowname,
            lastEditedBy: card['lastEditedBy'],
            id: card['id'],
            nameEN: card['nameEN'],
            nameES: card['nameES'],
            descriptionEN: card['descriptionEN'],
            descriptionES: card['descriptionES'],
            rarity: card['rarity'],
            limit: card['limit'],
            type: card['type'],
            faction: card['faction'],
            value: card['value'],
            damage: card['damage'],
            defense: card['defense'],
            health: card['health']
        }/*, { merge: true }*/);
    fnRemoveCard(cardNumber);
}

// Remove Card
function fnRemoveCard(cardNumber) {
    db.collection("lcgCards").doc(cardNumber).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

/** oAuth buttons **/
function fnSignIn(displayName, email, emailVerified, photoURL) {
    $("#div-login").fadeOut(500, function () {
        $("#div-login").hide();
    });
    $("#user-profile-image").html('<img class="circle profile-image" alt="" src="' + photoURL + '">');
    $("#user-profile-name").html('<span class="name">' + displayName + '</span>');
    $("#user-profile-email").html('<span class="email">' + email + '</span>');
    setTimeout(function () {
        $("#div-main").fadeIn(500, function () {
            $("#div-main").show();
        });
    }, 100);
    onLoad(false);
}

function fnSignOut() {
    $("#div-main").fadeOut(500, function () {
        $("#div-main").hide();
    });
    $("#user-profile-image").html('<img class="circle profile-image" alt="" src="">');
    $("#user-profile-name").html('<span class="name"></span>');
    $("#user-profile-email").html('<span class="email"></span>');
    setTimeout(function () {
        $("#div-login").fadeIn(500, function () {
            $("#div-login").show();
        });
    }, 100);
    onLoad(false);
}
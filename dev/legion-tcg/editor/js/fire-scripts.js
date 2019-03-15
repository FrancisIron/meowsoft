// Get a reference to the database service
var db = null;
var uid = null;
var ucv = null;
var uce = null;
var umeowname = null;
var cid = 0;

$(document).ready(function () {
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: 'https://meowsoft.net/dev/legion-tcg/editor/',
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
    //document.getElementById('btn-sign-in-google').addEventListener('click', toggleSignIn, false);
    document.getElementById('btn-log-out').addEventListener('click', function () {
        firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            // An error happened
        });
    });
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            //var isAnonymous = user.isAnonymous;
            uid = user.uid;
            //var providerData = user.providerData;
            // [START_EXCLUDE]
            fnLoadUserSettings(displayName, email);
            if (ucv) {
                fnSignIn(displayName, email, emailVerified, photoURL);
                fnLoadSettings();
                fnDownloadCards();
            } else {
                $('btn-log-out').click();
            }
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            uid = null;
            ucv = null;
            uce = null;
            umeowname = null;
            var uemail = null;
            db.collection("lcgCards").onSnapshot(function () { });
            db.collection("lcgSettings").onSnapshot(function () { });
            fnSignOut();
        }
        // [START_EXCLUDE]
        //document.getElementById('btn-sign-in-google').disabled = false;
    });
}
window.onload = function () {
    db = firebase.firestore();
    initApp();
};

/** Custom Scripts **/
/** User Settings **/
function fnLoadUserSettings(name, email) {
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
                //console.log('DEBUG: fnLoadUserSettings finished');
                //console.log("Document data:", doc.data());
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
    //console.log('DEBUG: fnLoadSettings()');
    db.collection("lcgSettings").doc("cards")
        .onSnapshot(function (doc) {
            cid = doc.data()['cid'];
            //console.log('DEBUG: current cid: ', cid);
        });
}

// Real-time Card Downloads
function fnDownloadCards() {
    //console.log('DEBUG: fnDownloadCards()');
    if (uid == null) { return; }
    db.collection("lcgCards")
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    //console.log("New document: ", change.doc.data());
                    M.toast({ html: '@' + change.doc.data()['lastEditedBy'] + ' added a new card: ID' + change.doc.data()['id'] })
                }
                if (change.type === "modified") {
                    //console.log("Modified document: ", change.doc.data());
                    M.toast({ html: '@' + change.doc.data()['lastEditedBy'] + ' updated card ' + change.doc.data()['id']})
                }
                if (change.type === "removed") {
                    //console.log("Removed document: ", change.doc.data());
                    var card = fnDownloadCard("lcgCardsBackup", change.doc.data()['id']);
                    if (card == null) { return; }
                    M.toast({ html: '@' + card['removedBy'] + ' removed card ' + card['id']})
                }
            });
        });
}

// Update Card ID
function fnUpdateCID() {
    //console.log('DEBUG: fnUpdateCID()');
    if (uid == null) { return; }
    cid++;
    db.collection("lcgSettings")
        .doc('cards').set({
            cid: cid
        }, { merge: true });
}

// Update Card
function fnUpdateCard(card) {
    //console.log('DEBUG: fnUpdateCard()');
    if (uid == null) { return; }
    db.collection("lcgCards")
        .doc(card['id']).set({
            lastEditedBy: umeowname,
            id: card['id'],
            name: card['name'],
            descriptionEN: card['descriptionEN'],
            descriptionES: card['descriptionES'],
            rarity: card['rarity'],
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
    //console.log('DEBUG: fnDownloadCard()');
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

// Backup Card
function fnBackupCard(cardNumber) {
    //console.log('DEBUG: fnBackupCard()');
    if (uid == null) { return; }
    var card = fnDownloadCard("lcgCards",cardNumber);
    if (card == null) { return; }
    db.collection("lcgCardsBackup")
        .doc(card['id']).set({
            removedBy: umeowname,
            lastEditedBy: card['lastEditedBy'],
            id: card['id'],
            name: card['name'],
            descriptionEN: card['descriptionEN'],
            descriptionES: card['descriptionES'],
            rarity: card['rarity'],
            type: card['type'],
            faction: card['faction'],
            value: card['value'],
            damage: card['damage'],
            defense: card['defense'],
            health: card['health']
        }, { merge: true });
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
    //$(".user-view").css("border-bottom-style", "outset");
    $("#user-profile-image").html('<img class="circle profile-image" alt="" src="' + photoURL + '">');
    $("#user-profile-name").html('<span class="name">' + displayName + '</span>');
    $("#user-profile-email").html('<span class="email">' + email + '</span>');
    setTimeout(function () {
        $("#div-main").fadeIn(500, function () {
            $("#div-main").show();
        });
    }, 100);
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
}
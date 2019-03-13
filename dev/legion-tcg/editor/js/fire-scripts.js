// Get a reference to the database service
var db = null;
var uid = null;

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
            fnLoadUserSettings();
            fnSignIn(displayName, email, emailVerified, photoURL);
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            uid = null;
            fnSignOut();
        }
        // [START_EXCLUDE]
        //document.getElementById('btn-sign-in-google').disabled = false;
    });
    // [END authstatelistener]
    //document.getElementById('btn-sign-in-google').addEventListener('click', toggleSignIn, false);
    //document.getElementById('btn-log-out').addEventListener('click', toggleSignIn, false);
}
window.onload = function () {
    db = firebase.firestore();
    initApp();
};

/** Custom Scripts **/
/** User Settings **/
function fnLoadUserSettings() {
    if (uid == null) { return; }
    var docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            // Read data
            console.log("Document data:", doc.data());
            var isEditor = doc.data()["tcgEditor"];
            var canView = doc.data()["tcgView"];
            var canEdit = doc.data()["tcgEdit"];
            // Data processing
            if (!isEditor) {
                fnSaveUserSettings();
                fnLoadUserSettings();
            }
            // Set data
            // Data processing
            // Set data
        } else {
            // doc.data() will be undefined in this case
            fnSaveUserSettings();
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

// Default Settings
function fnSaveUserSettings() {
    if (uid == null) { return; }
    var usersRef = db.collection("users");
    usersRef.doc(uid).set({
        tcgEditor: true,
        tcgView: false,
        tcgEdit: false
    }, { merge: true });
}

/** oAuth buttons **/
function fnSignIn(displayName, email, emailVerified, photoURL) {
    $("#div-login").fadeOut(500, function () {
        $("#div-login").hide();
    });
    //$(".user-view").css("border-bottom-style", "outset");
    //$("#user-profile-image").html('<img class="circle profile-image" alt="" src="' + photoURL + '">');
    //$("#user-profile-name").html('<span class="name">' + displayName + '</span>');
    //$("#user-profile-email").html('<span class="email">' + email + '</span>');
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
    //$(".user-view").css("border-bottom-style", "none");
    //$("#user-profile-image").html('<img class="circle profile-image" alt="" src="">');
    //$("#user-profile-name").html('<span class="name"></span>');
    //$("#user-profile-email").html('<span class="email"></span>');
    setTimeout(function () {
        $("#div-login").fadeIn(500, function () {
            $("#div-login").show();
        });
    }, 100);
}
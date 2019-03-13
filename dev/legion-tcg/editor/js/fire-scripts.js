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

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
        });
        // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('btn-sign-in-google').disabled = true;
    // [END_EXCLUDE]
}
// [END buttoncallback]

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
        document.getElementById('btn-sign-in-google').disabled = false;
    });
    // [END authstatelistener]
    document.getElementById('btn-sign-in-google').addEventListener('click', toggleSignIn, false);
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
            var canView = doc.data()["view"];
            var canEdit = doc.data()["edit"];
            // Data processing
            if (!canView) {
                console.log("View not found");
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
        view: false,
        edit: false
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
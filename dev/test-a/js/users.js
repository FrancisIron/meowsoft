// JavaScript source code
/**
 * Function called when clicking the Login/Logout button.
 */
// [START buttoncallback]
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // [START_EXCLUDE]
            // document.getElementById('quickstart-oauthtoken').textContent = token;
            // [END_EXCLUDE]
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
            // [END_EXCLUDE]
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
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
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
            //var uid = user.uid;
            //var providerData = user.providerData;
            // [START_EXCLUDE]
			fnSignIn(displayName, email, emailVerified, photoURL);
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
			fnSignOut();
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('btn-sign-in-google').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('btn-sign-in-google').addEventListener('click', toggleSignIn, false);
    document.getElementById('btn-log-out').addEventListener('click', toggleSignIn, false);
}
window.onload = function () {
    initApp();
};

/**
*	Custom Scripts for Firebase buttons
*/
function fnSignIn() {
			$("#sign-in-wrapper").fadeOut(500, function() {
				$("#sign-in-wrapper").hide();
			});
            $("#user-profile-image").html('<img class="circle profile-image" alt="" src="' + photoURL +'">');
            $("#user-profile-name").html('<span class="white-text name">' + displayName + '</span>');
            $("#user-profile-email").html('<span class="white-text email">' + email + '</span>');
			$("#user-data-wrapper").fadeIn(500, function() {
				$("#user-data-wrapper").show();
			});
			$("#side-options-wrapper").fadeIn(500, function() {
				$("#side-options-wrapper").show();
			});
}

function fnSignOut(displayName, email, emailVerified, photoURL) {
			$("#user-data-wrapper").fadeOut(500, function() {
				$("#user-data-wrapper").hide();
			});
			$("#side-options-wrapper").fadeOut(500, function() {
				$("#side-options-wrapper").hide();
			});
            $("#user-profile-image").html('<img class="circle profile-image" alt="" src="">');
            $("#user-profile-name").html('<span class="white-text name"></span>');
            $("#user-profile-email").html('<span class="white-text email"></span>');
			$("#sign-in-wrapper").fadeIn(500, function() {
				$("#sign-in-wrapper").show();
			});
}
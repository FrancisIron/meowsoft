// JavaScript source code
// Get a reference to the database service
var db = null;
var uid = null;
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
            uid = user.uid;
            //var providerData = user.providerData;
            // [START_EXCLUDE]
			fnLoadUserSettings();
			fnSignIn(displayName, email, emailVerified, photoURL);
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
			uid = null;
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
	db = firebase.firestore();
    initApp();
};


/** Custom Scripts **/

/** User Settings **/
function fnLoadUserSettings() {
	if (uid == null) {return;}
	var docRef = db.collection("users").doc(uid);
	docRef.get().then(function(doc) {
		if (doc.exists) {
			// Read data
			console.log("Document data:", doc.data());
			var backgroundColor = doc.data()["backgroundColor"];
			var textColor = doc.data()["textColor"];
			// Data processing
			//
			// Set data
			$("#color-backs").spectrum("set", backgroundColor);
			$("#color-texts").spectrum("set", textColor);
			// Data processing
			backgroundColor = backgroundColor.replace("rgba", "rgb");
			textColor = textColor.replace("rgba", "rgb");
			// Set data
			changeBackgroundColors(backgroundColor);
			changeTextColors(textColor);
		} else {
			// doc.data() will be undefined in this case
			console.log("No document stored for current user! Creating default document!");
			fnSaveUserSettings()
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}

// Default Settings
function fnSaveUserSettings() {
	if (uid == null) {return;}
	var usersRef = db.collection("users");
	usersRef.doc(uid).set({
		backgroundColor: "rgb(90, 15, 15, 0.9)", 
		textColor: "#FFF"
	}, { merge: true });
}

function fnSaveUserSettingsBackgroundColor(value) {
	if (uid == null) {return;}
	var usersRef = db.collection("users");
	usersRef.doc(uid).set({
		backgroundColor: value
	}, { merge: true });
}

function fnSaveUserSettingsTextColor(value) {
	if (uid == null) {return;}
	var usersRef = db.collection("users");
	usersRef.doc(uid).set({
		textColor: value
	}, { merge: true });
}

/** oAuth buttons **/
function fnSignIn(displayName, email, emailVerified, photoURL) {
	$("#sign-in-wrapper").fadeOut(500, function() {
		$("#sign-in-wrapper").hide();
	});
	$(".user-view").css("border-bottom-style","outset");
	$("#user-profile-image").html('<img class="circle profile-image" alt="" src="' + photoURL +'">');
    $("#user-profile-name").html('<span class="name">' + displayName + '</span>');
    $("#user-profile-email").html('<span class="email">' + email + '</span>');
	setTimeout(function() {
		$("#user-data-wrapper").fadeIn(500, function() {
			$("#user-data-wrapper").show();
		});
		$("#side-options-wrapper").fadeIn(500, function() {
			$("#side-options-wrapper").show();
		});
	}, 100);
}

function fnSignOut() {
	$("#user-data-wrapper").fadeOut(500, function() {
		$("#user-data-wrapper").hide();
	});
	$("#side-options-wrapper").fadeOut(500, function() {
		$("#side-options-wrapper").hide();
	});
	$(".user-view").css("border-bottom-style","none");
	$("#user-profile-image").html('<img class="circle profile-image" alt="" src="">');
	$("#user-profile-name").html('<span class="name"></span>');
	$("#user-profile-email").html('<span class="email"></span>');
	setTimeout(function() {
		$("#sign-in-wrapper").fadeIn(500, function() {
			$("#sign-in-wrapper").show();
		});
	}, 100);
}
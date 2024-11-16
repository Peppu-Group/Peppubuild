
<template>
    <div class="background">
        <div class="main__container">
            <div class="wrapper">
                <div class="form-wrapper sign-in">
                    <div class="formcenter">
                        <img src="./img/logo.png" style="width: 50px; height: 50px"/>
                        <h1 class="walltext">Welcome to Peppubuild</h1>
                    </div>
                    <div class="start">
                        <div class="google-btn google-bk" @click="googleLogin()">
                            <div class="google-icon-wrapper">
                                <img class="google-icon"
                                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
                            </div>
                            <p class="btn-text"><b>Sign in with Google</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userAuth } from './js/firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    fetchSignInMethodsForEmail
} from 'firebase/auth';
import swal from 'sweetalert';

export default {
    /**
     * This is the authentication page.
     * It calls routes for login, logout, and registration.
    */
    name: 'AuthPage',
    methods: {
        /**
         * This function is redundant.
         * It allows new users create an account with email and password.
        */
        createUser() {
            createUserWithEmailAndPassword(userAuth, this.email, this.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    this.callVerify(user.accessToken);
                    // Update user profile with full name immediately
                    updateProfile(userAuth.currentUser, {
                        displayName: this.fname,
                        // photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch(() => {
                        // An error occurred
                        // ...
                    });
                })
                // return error as alert
                .catch((error) => {
                    const errorMessage = error.message;
                    swal("Oops!", `Registration error: ${errorMessage}`, "error");
                });
        },
        /**
         * This function is redundant.
         * It allows users login their account with email and password.
        */
        logUser() {
            signInWithEmailAndPassword(userAuth, this.lemail, this.lpassword)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    this.callVerify(user.accessToken)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    swal("Oops!", `Login error: ${errorMessage}`, "error");
                });
        },
        /**
         * A utility function, to manage GitHub, Facebook, and other providers login.
         * This function uses signInWithPopup, to retrieve credential after login.
         * We store credential and user data in localStorage().
        */
       async sendEmail(email, token) {
        let userSignInMethods = await fetchSignInMethodsForEmail(userAuth, email)
        if (userSignInMethods.length > 0) {
            this.callVerify(token);
        } else {
            // call verify
            this.sendWelcome(email);
            this.callVerify(token);
        }
       },
        providerLogin(authProvider, provider) {
            signInWithPopup(userAuth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = authProvider.credentialFromResult(result);
                    localStorage.setItem('user', JSON.stringify(result.user))
                    localStorage.setItem('oauth', credential.accessToken)
                    const token = credential.accessToken;
                    // The signed-in user info.
                    // const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    this.sendEmail(result.user.email, token)
                }).catch((error) => {
                    // Handle Errors here.
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.customData.email;
                    // The AuthCredential type that was used.
                    // const credential = authProvider.credentialFromError(error);
                    // ...
                    swal("Oops!", `Login error: ${errorMessage}`, "error");
                });
        },
        // Google Authentication
        /**
         * This function contains the scope and  for googleLogin()
        */
        googleLogin() {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/drive.appdata')
            provider.addScope('https://www.googleapis.com/auth/drive.file')
            this.providerLogin(GoogleAuthProvider, provider);
        },
        // Github Authentication
        /**
         * Function isn't in use currently.
         * This function contains the scope for googleLogin()
        */
        githubLogin() {
            const provider = new GithubAuthProvider();
            this.providerLogin(GithubAuthProvider, provider);
        },
        /**
        * Call verify to manage tokens after login.
        * Store tokens and manage expiration.
       */
        callVerify(token) {
            let storecookie = new Promise((resolve, reject) => {
                if (token) {
                    let providerToken = token;
                    // verify token

                    // store token
                    document.cookie = `pepputoken=${providerToken}; max-age=3300`;
                    resolve();
                    var timeleft = 3300;
                    setInterval(async function () {
                        if (timeleft <= 0) {
                            // clearInterval(downloadTimer);
                                return new Promise((resolve, reject) => {
                                    userAuth.onAuthStateChanged((user) => {
                                        if (user) {
                                            user.getIdToken(true).then((accessToken) => {
                                                resolve(document.cookie = `pepputoken=${accessToken}; max-age=3300`)
                                            })
                                        }
                                        reject
                                    })
                                }).then(() => {
                                    timeleft += 3300;
                                })
                        } 
                        timeleft -= 1;
                    }, 1000);
                } else {
                    reject();
                }
            })
            storecookie
                .then(() => {
                    this.$router.push({ name: "Dashboard" });
                }).catch((error) => {
                    swal("Oops!", `Login verification error: ${error}`, "error");
                })
        },
        sendWelcome(userEmail) {
            const form = new FormData();
            form.append('from', 'Ugochi from Peppubuild');
            form.append('to', userEmail);
            form.append('subject', 'Welcome to Peppubuild');
            form.append('template', 'welcome');

            fetch('https://api.mailgun.net/v3/peppubuild.com/messages', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`api:${process.env.VUE_APP_MAILGUN_API_KEY}`)
                },
                body: form
            });
        }
    }
}
</script>

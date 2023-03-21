import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


export const firebase = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAx-tFH5o6MbvzamrNXKyKwp-yC5j9WUUc",
        authDomain: "note-taking-app-5a43a.firebaseapp.com",
        projectId: "note-taking-app-5a43a",
        storageBucket: "note-taking-app-5a43a.appspot.com",
        messagingSenderId: "971849941633",
        appId: "1:971849941633:web:cfa4d9dd19a75cd8af8380"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const signIn = (eml, pass) => {

        let user = signInWithEmailAndPassword(auth, eml, pass).then((userCred) => {
            return userCred
        }).catch((err) => console.log(err));
        return user
    }

    function createUser(eml, pass) {
        let user = createUserWithEmailAndPassword(auth, eml, pass).then((userCred) => {
            return userCred
        }).catch((err) => console.log({ err }));
        return user
    }

    function performOnAuth(func1, func2) {


        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                func1()


            } else {
                // User is signed out
                func2()

            }
        })
    }

    function logOut() {

        signOut(auth)
        console.log('user logged out')

    }


    return {
        app: app,
        auth: auth,
        signIn: signIn,
        createUser: createUser,
        performOnAuth: performOnAuth,
        logOut: logOut,
        currentUser: auth.currentUser

    }

}





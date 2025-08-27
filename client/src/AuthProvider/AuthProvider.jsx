import { useEffect, useState } from "react";
import AuthContext from "./ContextCreate";
import { auth } from "../Firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

 
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();

    // create user
    const createUser = (email, pass) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // login
    const loginUser = (auth, email, pass) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    // google login and signin
    const googleLogin = () => {
        signInWithPopup(auth, provider);
    }


    // logout
    const logOut = () => {
        setLoading(false);
        signOut(auth);
    }

    // delete user

    // forget pass

    // get current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true);
            setUser(currentUser?.user);
            console.log(user);
        });
        return () => unsubscribe();
    }, [])

    // base on user make toggle avatar anf login button in the navbar 

    // save user in the db with encrypt

    // for private router make everything ok (base on user)

    // after login redirect him into the desire router or page

    // use cookie for secure and use verify token and axios interpretor*********

    const info = {
        loading,
        user,
        createUser,
        loginUser,
        googleLogin,
        logOut
    }

    return (
         <AuthContext.Provider value={info} >
            {children}
         </AuthContext.Provider>
    );
};

export default AuthProvider;
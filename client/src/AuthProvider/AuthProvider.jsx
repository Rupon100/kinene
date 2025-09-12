import { useEffect, useState } from "react";
import AuthContext from "./ContextCreate";
import { auth } from "../Firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
 
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    // const axiosSecure = useAxiosSecure();

    // create user
    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // login
    const loginUser = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    // google login and signin
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // delete user

    // forget pass

    // get current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);

            if(currentUser?.email){
                try{
                    // post user to DB
                    const res = await axios.post(`http://localhost:4080/jwt`, { email: currentUser?.email }, { withCredentials: true });
                    console.log('jwt token: ', res?.data);

                }catch(err){
                    console.log("JWT fetch error: ", err);
                }
            }
            setLoading(false);
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
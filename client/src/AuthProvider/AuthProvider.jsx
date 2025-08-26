import AuthContext from "./ContextCreate";

 
const AuthProvider = ({ children }) => {
    // loading, user, login, register, forget, logout, onAuthProvider

    // base on user make toggle avatar anf login button in the navbar 

    // save user in the db with encrypt

    // for private router make everything ok (base on user)

    // after login redirect him into the desire router or page

    // use cookie for secure and use verify token and axios interpretor*********

    const info = {
        name: "Rupon Mia"
    }

    return (
         <AuthContext.Provider value={info} >
            {children}
         </AuthContext.Provider>
    );
};

export default AuthProvider;
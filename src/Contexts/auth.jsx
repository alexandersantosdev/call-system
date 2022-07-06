import {useState, useEffect, createContext} from "react";
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    function loadStorage() {
        setLoading(true);
        const storageUser = localStorage.getItem('systemUser');
        if (storageUser) {
            setUser(JSON.parse(storageUser));
        }
        setLoading(false);
    }

    useEffect(() => {
        loadStorage();
    }, []);

    async function signUp(email, password, name) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (success) => {
                let uid = success.user.uid;
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        avatarUrl: null
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: success.user.email,
                            avatarUrl: null
                        }
                        setUser(data);
                        storageUser(data);
                    });
            }).catch(error => {
                console.log(error);
                setLoadingAuth(false);
            });

        setLoadingAuth(false);
    }

    function storageUser(data) {
        localStorage.setItem('systemUser', JSON.stringify(data));
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('systemUser');
        setUser(null);
    }

    async function signIn(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async success => {
                let uid =success.user.uid;
                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();
                let data = {
                    uid,
                    name: userProfile.data().nome,
                    email: success.user.email,
                    avatarUrl: userProfile.data().avatarUrl
                }
                setUser(data);
                storageUser(data);
            }).catch(error => {
                console.log(error);
                setLoadingAuth(false);
            });
        setLoadingAuth(false);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signOut,
                signIn,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
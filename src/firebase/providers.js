import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FireBaseAuth } from './config'

const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            ok: false,
            errorMessage: errorMessage,
        }
    }
}

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(FireBaseAuth, facebookProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            ok: false,
            errorMessage: errorMessage,
        }
    }
}

export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(FireBaseAuth, githubProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            ok: false,
            errorMessage: errorMessage,
        }
    }
}
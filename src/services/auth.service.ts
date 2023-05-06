import {GoogleAuthProvider, signInWithPopup, signOut, User} from "firebase/auth";
import {AUTH} from "../../firebase";

const provider = new GoogleAuthProvider();

export const googleSignIn = async (): Promise<User> => {
    try {
        const result = await signInWithPopup(AUTH, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        return result.user
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        throw new Error()
    }
}

export const googleSignOut = async (): Promise<void> => {
    try {
        return await signOut(AUTH)
    } catch (e: any) {
        throw new Error(e)
    }
}
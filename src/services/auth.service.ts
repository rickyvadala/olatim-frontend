import {GoogleAuthProvider, signInWithPopup, signOut, User} from "firebase/auth";
import {AUTH} from "../../firebase";

const provider = new GoogleAuthProvider();

export const googleSignIn = async (): Promise<User> => {
    try {
        const result = await signInWithPopup(AUTH, provider)
        return result.user
    } catch (error: any) {
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
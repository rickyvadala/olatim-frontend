import {addDoc, collection} from "@firebase/firestore";
import {DB} from "../../firebase";

export const postResume = async (data: any) => {
    try {
        return await addDoc(collection(DB, "resumes"), data);
    } catch (e: any) {
        throw new Error(e)
    }
}


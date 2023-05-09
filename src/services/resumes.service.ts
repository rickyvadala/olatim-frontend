import {doc, setDoc} from "@firebase/firestore";
import {DB} from "../../firebase";

export const postResume = async (data: any, key: string) => {
    try {
        return await setDoc(doc(DB, "resumes", key), data);
    } catch (e: any) {
        throw new Error(e)
    }
}


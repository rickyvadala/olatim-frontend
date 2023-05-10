import {doc, getDoc, setDoc} from "@firebase/firestore";
import {DB} from "../../firebase";
import {IResume} from "@/models/IResume.interface";

export const postResume = async (data: any, key: string) => {
    try {
        return await setDoc(doc(DB, "resumes", key), data);
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getResume = async (key: string): Promise<IResume | undefined> => {
    try {
        const docSnap = await getDoc(doc(DB, "resumes", key));
        return docSnap.exists() ? docSnap.data() as IResume : undefined
    } catch (e) {
        return undefined
    }
}


import {collection, doc, getDoc, setDoc} from "@firebase/firestore";
import {DB} from "../../firebase";
import {IResume} from "@/models/IResume.interface";

const PATH = "resumes"
export const postResume = async (data: any, key?: string | null) => {
  try {
    return key
      ? await setDoc(doc(DB, PATH, key), data)
      : await setDoc(doc(collection(DB, PATH)), data)
  } catch (e: any) {
    throw new Error(e)
  }
}

export const getResume = async (key: string): Promise<IResume | undefined> => {
  try {
    const docSnap = await getDoc(doc(DB, PATH, key));
    return docSnap.exists() ? docSnap.data() as IResume : undefined
  } catch (e) {
    return undefined
  }
}


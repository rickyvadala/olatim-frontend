import {collection, doc, setDoc} from "@firebase/firestore";
import {DB} from "../../firebase";

const PATH = "messages"
export const postMessage = async (data: any) => {
  try {
    return await setDoc(doc(collection(DB, PATH)), data)
  } catch (e: any) {
    throw new Error(e)
  }
}

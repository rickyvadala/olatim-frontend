import axios from "axios";

const PATH = "/api/messages"
export const postMessage = async (data: any) => {
  try {
    return await axios.post(PATH, data)
  } catch (e: any) {
    throw new Error(e)
  }
}

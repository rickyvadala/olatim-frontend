import {IResume} from "@/models/IResume.interface";
import axios from "axios";

const PATH = '/api/resumes'
export const postResume = async (_data: any, key?: string | null) => {
  try {
    const {data} = await axios.post(PATH, _data, {
      headers: {'ola-uid': key}
    })
    return data
  } catch (e: any) {
    throw new Error(e)
  }
}

export const getResume = async (key: string): Promise<IResume | undefined> => {
  try {
    const {data} = await axios.get(`${PATH}/${key}`)
    return data
  } catch (e) {
    return undefined
  }
}

export const getResumes = async (key: string): Promise<Array<IResume>> => {
  try {
    const {data} = await axios.get(PATH, {
      headers: {'ola-uid': key}
    })
    return data
  } catch (e) {
    return []
  }
}

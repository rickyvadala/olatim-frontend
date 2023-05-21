import {getAuth, User} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {IUser} from "@/models/IUser.interface";
import {useEffect, useState} from "react";

export const useAppAuthState = (): [IUser | undefined, boolean] => {
  const auth = getAuth()
  const [googleUser, loading] = useAuthState(auth)
  const [user, setUser] = useState<IUser | undefined>()

  const userParser = async (googleUser: User | null | undefined) => {
    if (googleUser) {
      const {displayName, uid, email, photoURL, phoneNumber} = googleUser
      setUser({displayName, uid, phoneNumber, email, photoURL})
    } else {
      setUser(undefined)
    }
  }

  useEffect(() => {
    void userParser(googleUser)
  }, [googleUser])

  return [user, loading]
}
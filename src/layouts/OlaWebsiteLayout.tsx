import React, {PropsWithChildren, useCallback, useEffect} from "react";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/common/data/footer";
import {useDispatch} from "react-redux";
import {setResume} from "@/store/dataSlice";
import {getResume} from "@/services/resumes.service";
import {useAppAuthState} from "@/hooks/useAppAuthState";
import {Box} from "@mantine/core";

type OlaWebsiteLayoutProps = PropsWithChildren

export const OlaWebsiteLayout: React.FC<OlaWebsiteLayoutProps> = ({children}) => {
  const [user] = useAppAuthState()
  const dispatch = useDispatch()

  const asyncGetResume = useCallback(async () => {
    if (user?.uid) {
      const res = await getResume(user.uid)
      res && dispatch(setResume(res))
    }
  }, [dispatch, user])

  useEffect(() => void asyncGetResume(), [user, asyncGetResume])

  return (
    <>
      <OlaNavbar/>
      <Box pt={60}>
        {children}
      </Box>
      <OlaFooter data={footer.data}/>
    </>
  )
}
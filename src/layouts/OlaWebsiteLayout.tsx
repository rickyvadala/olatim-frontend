import React, {PropsWithChildren, useEffect} from "react";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/common/data/footer";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser, setResume} from "@/store/authSlice";
import {getResume} from "@/services/resumes.service";

type OlaWebsiteLayoutProps = PropsWithChildren

export const OlaWebsiteLayout: React.FC<OlaWebsiteLayoutProps> = ({children}) => {
    const user = useSelector(selectAuthUser)
    const dispatch = useDispatch()
    const asyncGetResume = async () => {
        if (user?.email) {
            const res = await getResume(user.email)
            res && dispatch(setResume(res))
        }
    }

    useEffect(() => {
        void asyncGetResume()
    }, [user])


    return (
        <>
            <OlaNavbar/>
            {children}
            <OlaFooter data={footer.data}/>
        </>
    )
}
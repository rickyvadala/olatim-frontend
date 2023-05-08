import React, {PropsWithChildren} from "react";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/common/data/footer";

type OlaWebsiteLayoutProps = PropsWithChildren

export const OlaWebsiteLayout: React.FC<OlaWebsiteLayoutProps> = ({children}) => {
    return (
        <>
            <OlaNavbar/>
            {children}
            <OlaFooter data={footer.data}/>
        </>
    )
}
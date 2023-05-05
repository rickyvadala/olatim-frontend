import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
// import {OlaAbout} from "@/components/organisms/OlaAbout/OlaAbout";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/common/data/footer";
import {OLA_LANDING} from "@/common/data/landing";
import { OlaAboutHiring } from "@/components/organisms/OlaAbout/OlaAboutHiring";

export default function Index() {
    return (
        <>
            <OlaHead/>
            <OlaNavbar/>
            <OlaHero {...OLA_LANDING.hiring.hero}/>
            <OlaAboutHiring {...OLA_LANDING.hiring.about}/>
            <OlaContact/>
            <OlaFooter data={footer.data}/>
        </>
    )
}
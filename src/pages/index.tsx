import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from '@/common/data/footer'
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaAbout} from "@/components/organisms/OlaAbout/OlaAbout";
import {OLA_LANDING} from "@/common/data/landing";

export default function Home() {
    return (
        <>
            <OlaHead title={'Olatim | Home'}/>
            <OlaNavbar/>
            <OlaHero {...OLA_LANDING.home.hero}/>
            <OlaAbout {...OLA_LANDING.home.about}/>
            <OlaContact/>
            <OlaFooter data={footer.data}/>
        </>
    )
}

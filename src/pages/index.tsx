import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from '@/common/data/footer'
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaFeatures} from "@/components/organisms/OlaFeatures/OlaFeatures";
import {OLA_LANDING} from "@/common/data/landing";

export default function Home() {
    return (
        <>
            <OlaHead/>
            <OlaNavbar/>
            <OlaHero {...OLA_LANDING.home.hero}/>
            <OlaFeatures/>
            <OlaContact/>
            <OlaFooter data={footer.data}/>
        </>
    )
}

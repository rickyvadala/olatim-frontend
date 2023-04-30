import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaFeatures} from "@/components/organisms/OlaFeatures/OlaFeatures";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/common/data/footer";
import {OLA_LANDING} from "@/common/data/landing";

export default function Index() {
    return (
        <>
            <OlaHead/>
            <OlaNavbar/>
            <OlaHero {...OLA_LANDING.munity.hero}/>
            <OlaFeatures/>
            <OlaContact/>
            <OlaFooter data={footer.data}/>
        </>
    )
}
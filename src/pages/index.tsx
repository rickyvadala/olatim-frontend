import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from '@/__mock__/footer'
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaFeatures} from "@/components/organisms/OlaFeatures/OlaFeatures";

export default function Home() {
    return (
        <>
            <OlaHead/>
            <OlaNavbar/>
            <OlaHero/>
            <OlaFeatures/>
            <OlaContact/>
            <OlaFooter data={footer.data}/>
        </>
    )
}

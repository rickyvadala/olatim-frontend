import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaFeatures} from "@/components/organisms/OlaFeatures/OlaFeatures";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaFooter} from "@/components/organisms/OlaFooter/OlaFooter";
import {footer} from "@/__mock__/footer";

export default function Index() {
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
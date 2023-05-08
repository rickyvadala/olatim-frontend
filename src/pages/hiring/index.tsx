import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
// import {OlaAbout} from "@/components/organisms/OlaAbout/OlaAbout";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OLA_LANDING} from "@/common/data/landing";
import {OlaAboutHiring} from "@/components/organisms/OlaAbout/OlaAboutHiring";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Index() {
    return (
        <>
            <OlaHead title={'Olatim | Hiring'}/>
            <OlaWebsiteLayout>
                <OlaHero {...OLA_LANDING.hiring.hero}/>
                <OlaAboutHiring {...OLA_LANDING.hiring.about}/>
                <OlaContact/>
            </OlaWebsiteLayout>
        </>
    )
}
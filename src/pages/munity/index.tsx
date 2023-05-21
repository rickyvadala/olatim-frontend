import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaAbout} from "@/components/organisms/OlaAbout/OlaAbout";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OLA_LANDING} from "@/common/data/landing";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Index() {
  return (
    <>
      <OlaHead title={'Olatim | Community'}/>
      <OlaWebsiteLayout>
        <OlaHero {...OLA_LANDING.munity.hero}/>
        <OlaAbout {...OLA_LANDING.munity.about}/>
        <OlaContact/>
      </OlaWebsiteLayout>
    </>
  )
}
import {OlaHero} from "@/components/organisms/OlaHero/OlaHero";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";
import {OlaAbout} from "@/components/organisms/OlaAbout/OlaAbout";
import {OLA_LANDING} from "@/common/data/landing";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Home() {
  return (
    <>
      <OlaHead title={'Olatim | Home'}/>
      <OlaWebsiteLayout>
        <OlaHero {...OLA_LANDING.home.hero}/>
        <OlaAbout {...OLA_LANDING.home.about}/>
        <OlaContact/>
      </OlaWebsiteLayout>
    </>
  )
}

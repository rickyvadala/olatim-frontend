import {OlaAuth} from "@/components/organisms/OlaAuth/OlaAuth";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Index() {
  return (
    <>
      <OlaHead title={'Olatim | Auth'}/>
      <OlaWebsiteLayout>
        <OlaAuth/>
      </OlaWebsiteLayout>
    </>
  )
}
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";
import {OlaApp} from "@/components/organisms/OlaApp/OlaApp";

export default function Index() {
  return (
    <>
      <OlaHead title={'Olatim | App'}/>
      <OlaWebsiteLayout>
        <OlaApp/>
      </OlaWebsiteLayout>
    </>
  )
}
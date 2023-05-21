import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaApply} from "@/components/organisms/OlaApply/OlaApply";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Index() {
  return (
    <>
      <OlaHead title={'Olatim | Apply'}/>
      <OlaWebsiteLayout>
        <OlaApply/>
      </OlaWebsiteLayout>
    </>
  )
}
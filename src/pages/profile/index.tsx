import React from "react";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";
import {OlaProfile} from "@/components/organisms/OlaProfile/OlaProfile";

export default function Index() {

    return (
        <>
            <OlaHead title={'Olatim | Profile'}/>
            <OlaWebsiteLayout>
                <OlaProfile/>
            </OlaWebsiteLayout>
        </>
    )
}
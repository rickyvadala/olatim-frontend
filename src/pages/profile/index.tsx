import React from "react";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";

export default function Index() {
    return (
        <>
            <OlaHead title={'Olatim | Profile'}/>
            <OlaWebsiteLayout>
                profile
            </OlaWebsiteLayout>
        </>
    )
}
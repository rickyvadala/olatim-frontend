import React from "react";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaWebsiteLayout} from "@/layouts/OlaWebsiteLayout";
import {OlaContact} from "@/components/organisms/OlaContact/OlaContact";

export default function Index() {

    return (
        <>
            <OlaHead title={'Olatim | Contact'}/>
            <OlaWebsiteLayout>
                <OlaContact/>
            </OlaWebsiteLayout>
        </>
    )
}
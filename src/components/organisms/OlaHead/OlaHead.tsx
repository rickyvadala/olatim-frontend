import Head from "next/head";
import React from "react";

export const OlaHead: React.FC<{ title: string }> = ({title}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Olatim community"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/olatim.svg"/>
        </Head>
    )
}
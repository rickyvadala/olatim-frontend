import {OlaAuth} from "@/components/organisms/OlaAuth/OlaAuth";
import {OlaHead} from "@/components/organisms/OlaHead/OlaHead";
import {OlaNavbar} from "@/components/organisms/OlaNavbar/OlaNavbar";

export default function Auth () {
    return (
        <>
            <OlaHead />
            <OlaNavbar />
            <OlaAuth />
        </>
    )
}
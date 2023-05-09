import {OlaFooterProps} from "@/components/organisms/OlaFooter/OlaFooter";
import {OlaRouter} from "@/router/OlaRouter";

export const footer: OlaFooterProps = {
    "data": [
        {
            "title": "About",
            "links": [
                {
                    "label": "Apply Jobs",
                    "link": OlaRouter.APPLY
                },
                {
                    "label": "Support",
                    "link": "#contact"
                },
            ]
        },
        {
            "title": "Community",
            "links": [
                {
                    "label": "Follow on LinkedIn",
                    "link": "https://www.linkedin.com/company/olatim-com/"
                },
                {
                    "label": "Referral Program",
                    "link": OlaRouter.COMMUNITY
                },
                {
                    "label": "Email hello@olatim.com",
                    "link": "#"
                }
            ]
        }
    ]
}
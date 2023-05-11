import {OlaFooterProps} from "@/components/organisms/OlaFooter/OlaFooter";
import {OlaRouter} from "@/router/OlaRouter";

export const footer: OlaFooterProps = {
    "data": [
        {
            "title": "Hiring",
            "links": [
                {
                    "label": "Learn more",
                    "href": OlaRouter.COMMUNITY,
                    "target": ""
                },
                {
                    "label": "Contact us",
                    "href": OlaRouter.CONTACT,
                    "target": ""
                }
            ]
        },
        {
            "title": "Community",
            "links": [
                {
                    "label": "Learn more",
                    "href": OlaRouter.COMMUNITY,
                    "target": ""
                },
                {
                    "label": "Apply Jobs",
                    "href": OlaRouter.APPLY,
                    "target": ""
                },
            ]
        },
        {
            "title": "Network",
            "links": [
                {
                    "label": "LinkedIn",
                    "href": "https://www.linkedin.com/company/olatim-com/",
                    "target": "_blank"
                },
                {
                    "label": "Email Us",
                    "href": "mailto:hello@olatim.com",
                    "target": "_blank"
                }
            ]
        }
    ]
}
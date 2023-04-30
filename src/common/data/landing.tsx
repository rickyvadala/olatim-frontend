import {OlaHeroProps} from "@/components/organisms/OlaHero/OlaHero";
import {OlaAboutProps} from "@/components/organisms/OlaAbout/OlaAbout";
import {IconDevices2, IconDirectionSign, IconPigMoney, IconUserCheck} from "@tabler/icons-react";

type OlaLandingProps = {
    home: {
        hero: OlaHeroProps,
        about: OlaAboutProps
    }
    hiring: {
        hero: OlaHeroProps,
        about?: OlaAboutProps
    }
    munity: {
        hero: OlaHeroProps,
        about?: OlaAboutProps
    }
}

export const OLA_LANDING: OlaLandingProps = {
    home: {
        hero: {
            title: 'Team growth powered by Latam Talent',
            subtitle: 'Olatim is building a community of top-notch professionals to help you easily scale your business.',
            items: [
                {
                    name: 'Software Engineers',
                    description: '– build secure and scalable applications with experienced developers.'
                },
                {
                    name: 'Data, DevOps, Cloud, Blockchain',
                    description: '– everything that your product needs to perform at the highest level.'
                },
                {
                    name: 'Design, UX/UI, Animation',
                    description: '– website, storytelling, marketing and social media.'
                },
            ],
            buttons: [
                {
                    label: 'Start Hiring',
                    href: '/hiring'
                },
                {
                    label: 'More Info',
                    href: '#about'
                },
            ]
        },
        about: {
            badge: 'Olatim Community',
            title: 'Hire without frictions',
            subtitle: 'Olatim is your best recruiting partner and team builder. We tap into our network of quality professionals to help you find the perfect fit.',
            features: [
                {
                    name: 'Skills & Experience',
                    description:
                        'All of our professionals are pre-screened by our recruiting team, to asses not only their technical knowledge but their soft skills.',
                    icon: IconUserCheck,
                },
                {
                    name: 'Risk Free',
                    description:
                        'Dont make any payments until we find the type of profile that fits your needs.',
                    icon: IconDirectionSign,
                },
                {
                    name: 'Nearshore Global Teams',
                    description:
                        'We help you to build and grow your remote team, by taking advantage of top talent in Latam.',
                    icon: IconDevices2,
                },
                {
                    name: 'One-time-fee',
                    description:
                        'We are a community of tech talent connecting people with remote job opportunities. Make direct hires and pay once.',
                    icon: IconPigMoney,
                },
            ]
        }
    },
    hiring: {
        hero: {
            title: 'Team growth powered by Latam Talent',
            subtitle: 'Olatim is building a community of top-notch professionals to help you easily scale your business.',
            items: [
                {
                    name: 'Software Engineers',
                    description: '– build secure and scalable applications with experienced developers.'
                },
                {
                    name: 'Data, DevOps, Cloud, Blockchain',
                    description: '– everything that your product needs to perform at the highest level.'
                },
                {
                    name: 'Design, UX/UI, Animation',
                    description: '– website, storytelling, marketing and social media.'
                },
            ],
            buttons: [
                {
                    label: 'Start Hiring',
                    href: '/hiring'
                },
                {
                    label: 'More Info',
                    href: '#about'
                },
            ]
        },
    },
    munity: {
        hero: {
            title: 'Team growth powered by Latam Talent',
            subtitle: 'Olatim is building a community of top-notch professionals to help you easily scale your business.',
            items: [
                {
                    name: 'Software Engineers',
                    description: '– build secure and scalable applications with experienced developers.'
                },
                {
                    name: 'Data, DevOps, Cloud, Blockchain',
                    description: '– everything that your product needs to perform at the highest level.'
                },
                {
                    name: 'Design, UX/UI, Animation',
                    description: '– website, storytelling, marketing and social media.'
                },
            ],
            buttons: [
                {
                    label: 'Start Hiring',
                    href: '/hiring'
                },
                {
                    label: 'More Info',
                    href: '#about'
                },
            ]
        },
    }
}
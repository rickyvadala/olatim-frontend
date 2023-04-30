import {OlaHeroProps} from "@/components/organisms/OlaHero/OlaHero";

type OlaLandingProps = {
    home: {
        hero: OlaHeroProps,
    }
    hiring: {
        hero: OlaHeroProps,
    }
    munity: {
        hero: OlaHeroProps,
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
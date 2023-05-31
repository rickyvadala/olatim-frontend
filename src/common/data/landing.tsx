import {OlaHeroProps} from "@/components/organisms/OlaHero/OlaHero";
import {OlaAboutProps} from "@/components/organisms/OlaAbout/OlaAbout";
import {OlaAboutProps1} from "@/components/organisms/OlaAbout/OlaAboutHiring";
import {
  IconCircleNumber1,
  IconCircleNumber2,
  IconCircleNumber3,
  IconCircleNumber4,
  IconDevices2,
  IconDirectionSign,
  IconPigMoney,
  IconUserCheck
} from "@tabler/icons-react";
import {OlaRouter} from "@/router/OlaRouter";

type OlaLandingProps = {
  home: {
    hero: OlaHeroProps,
    about: OlaAboutProps
  }
  hiring: {
    hero: OlaHeroProps,
    about: OlaAboutProps1
  }
  referral: {
    hero: OlaHeroProps,
    about: OlaAboutProps
  }
  munity: {
    hero: OlaHeroProps,
    about: OlaAboutProps
  }
}

export const OLA_LANDING: OlaLandingProps = {
  home: {
    hero: {
      title: 'Team growth powered by Latam Talent.',
      titleHighlight: ['growth', 'talent'],
      subtitle: 'Scale your global team with top-notch professionals, aligned with your goals and strategy.',
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
          href: OlaRouter.CONTACT
        },
        {
          label: 'Find a Job',
          href: OlaRouter.APPLY
        },
      ]
    },
    about: {
      badge: 'Olatim Community',
      title: 'A solution for hiring without frictions',
      subtitle: 'Olatim is your best recruiting partner and team builder. We tap into our network of quality professionals to help you find the perfect fit.',
      features: [
        {
          name: 'Skills & Experience',
          description:
            'Access a curated pool of professionals pre-screened by our team.',
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
            'We help you build and grow your remote team by taking advantage of our wide network of talent in Latam.',
          icon: IconDevices2,
        },
        {
          name: 'One-time-fee',
          description:
            'We are a community helping each other connect with remote job opportunities. Make direct hires and pay once.',
          icon: IconPigMoney,
        },
      ]
    }
  },
  hiring: {
    hero: {
      title: 'Hire directly, with a one-time-fee.',
      titleHighlight: ['Hire directly'],
      subtitle: 'Take your team to the next level by hiring globally in a effortless way, while saving money on overhead costs.',
      items: [
        {
          name: 'Access to curated and qualified talent.',
          description: ''
        },
        {
          name: 'Get support all the way.',
          description: ''
        },
        {
          name: 'Find people aligned with your goals and strategy.',
          description: ''
        },
      ],
      buttons: [
        {
          label: 'Start Hiring',
          href: OlaRouter.CONTACT
        },
        {
          label: 'More Info',
          href: '#about'
        },
      ]
    },
    about: {
      badge: 'How it works',
      title: 'Your \'Zero-Risk\' Technology Partner',
      subtitle: 'We know recruiting is expensive and time consuming. Olatim allows you to build your team while you keep focusing on your business growth.',
      features: [
        {
          name: 'Define your hiring needs',
          description: 'Talk to our team about the perfect fit for the role.',
          icon: IconCircleNumber1,
        },
        {
          name: 'Review pre-screened profiles',
          description: 'Connect with qualified nearshore candidates that match your goals.',
          icon: IconCircleNumber2,
        },
        {
          name: 'Interviews & Meet Ups',
          description: 'Perform your recruitment process. We get as involved as you want.',
          icon: IconCircleNumber3,
        },
        {
          name: 'Hire & Keep Building',
          description: 'Our goal is get you here as fast as possible.',
          icon: IconCircleNumber4,
        },
      ]
    }
  },
  referral: {
    hero: {
      title: 'Earn up to 400 USD for referring a friend.',
      titleHighlight: ['Earn', 'referring'],
      subtitle: 'Already thinking about someone with awesome skills? Just by recommending them to Olatim, you earn money if they get hired.',
      items: [
        {
          name: 'Email us at hello@olatim.com',
          description: ' – Attach your referral LinkedIn profile or CV, and your name.'
        },
        {
          name: 'Wait for the verification',
          description: ' – When accepted, you will receive a confirmation email with more info.'
        },
      ],
      buttons: [
        {
          label: 'Any Questions?',
          href: '#about'
        },
      ]
    },
    about: {
      badge: 'community powered recruiting',
      title: 'FAQs 👇',
      subtitle: 'Helping amazing Latam talent connect with their dream jobs.',
      features: [
        {
          name: 'What is the Referral Program about?',
          description: 'It’s our way to contribute to the community growth, so that everyone wins while job seekers find the opportunities they are looking for.',
          icon: IconCircleNumber1,
        },
        {
          name: 'Who are we looking for?',
          description: ' Software Engineers, Developers, Data Scientists, DevOps, Cloud, Blockchain, UX/UI, Designers, Animation, and other tech-related positions.',
          icon: IconCircleNumber2,
        },
        {
          name: 'Who can benefit from this?',
          description: 'Anyone can submit one or multiple recommendations!',
          icon: IconCircleNumber3,
        },
        {
          name: 'When do I get the benefit?',
          description: 'You are eligible to receive a payment if your recommendation was effectively hired through our services.',
          icon: IconCircleNumber4,
        },
      ]
    }
  },
  munity: {
    hero: {
      title: 'Apply in minutes and land your next remote job in USD.',
      titleHighlight: ['Apply', 'remote', 'USD'],
      subtitle: 'We are a group of developers from Argentina building a curated community of Latam talent. Once you join, we will start referring you everytime your CV fits an open position.',
      items: [
        {
          name: 'ARE YOU A RECRUITER IT?',
          description: ' – Monetize your network by recommending candidates. Receive 90% of the fee if hired.'
        },
        {
          name: 'How it works',
          description: ' – Log In and apply to Olatim as a recruiter IT, we will contact you via Email with all the info you need! 🙂'
        },
      ],
      buttons: [
        {
          label: 'Apply for Jobs',
          href: OlaRouter.APPLY
        },
      ]
    },
    about: {
      badge: 'community powered recruiting',
      title: 'FAQ\'s 👇',
      subtitle: 'Helping amazing Latam talent connect with their dream jobs.',
      features: [
        {
          name: 'Do I have to fill out another endless form?',
          description: 'Don\'t worry, we\'ve got you. At Olatim we know the struggle of seeking new roles, that\'s why our applying process can be completed in <5 minutes.',
          icon: IconCircleNumber1,
        },
        {
          name: 'What kind of profiles are you looking for?',
          description: ' Software Engineers, Developers (Front, Back, Fullstack), Data, DevOps, Cloud, Blockchain, UX/UI, QA, and many other tech-related positions.',
          icon: IconCircleNumber2,
        },
        {
          name: 'Is Olatim an outsourcing platform?',
          description: 'No we aren\'t! You will get a direct contract with your future employer, and we won\'t be taking any money out of your monthly pay.',
          icon: IconCircleNumber3,
        },
        {
          name: 'How much can I make as an IT Recruiter?',
          description: 'At Olatim we value what you bring to the table. You would take 90% of the agreed referral fee, usually the equivalent to one month\'s salary.',
          icon: IconCircleNumber4,
        },
      ]
    }
  }
}

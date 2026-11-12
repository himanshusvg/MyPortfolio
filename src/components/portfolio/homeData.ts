export const assets = '/assets'
export const projectInquiryURL = 'https://tally.so/r/Ge9JVp'

export const icons = {
  briefcase: `${assets}/b97f6.svg`,
  smile: `${assets}/92328.svg`,
  design: `${assets}/700c7.svg`,
  support: `${assets}/73743.svg`,
  heart: `${assets}/430d3.svg`,
  rocket: `${assets}/1d6a9.svg`,
  externalLight: `${assets}/c8e97.svg`,
  externalOrange: `${assets}/716ef.svg`,
  arrowLeft: `${assets}/edc6b.svg`,
  arrowRight: `${assets}/1ca27.svg`,
}

type Client = {
  name: string
  logo: string
  colorLogo?: string
  websiteURL?: string
}

export const clients: Client[] = [
  {
    name: 'Equalent',
    logo: 'equalent-logo-grey.svg',
    colorLogo: 'equalent-logo-color.svg',
    websiteURL: 'https://equalent-msp.de/',
  },
  {
    name: 'Regrooter',
    logo: 'regrooter-logo-grey.svg',
    colorLogo: 'regrooter-logo-color.svg',
    websiteURL: 'https://regrooter.de/',
  },
  {
    name: 'Matching',
    logo: 'matching-logo-grey.svg',
    colorLogo: 'matching-logo-color.svg',
    websiteURL: 'https://www.matching.gmbh/',
  },
]

export const testimonials = [
  {
    quote:
      'Awesome freelancer, already hired him twice. Reliable, loves tiny details and solves everything above our expectations. Good communication, roadmap and stakeholder management.',
    name: 'Robin Schaefer',
    role: 'Founder, Regrooter',
  },
  {
    quote:
      'This was our 2nd project together and It was amazing. The understanding that we had and the trust we build throughout the last two projects have turned out as a great result at the end. Would love to work with them again for sure.',
    name: 'Robin Schaefer',
    role: 'Founder, Regrooter',
  },
  {
    quote:
      'Himanshu is a great freelancer to work with. He understand the problem and find accurate solutions. He manages the roadmap and milestones quite well and deliver on time. Would definetly recommend him.',
    name: 'Adam Scott',
    role: 'Co-Founder, Skoolink',
  },
  {
    quote:
      'Himanshu is amazing to work with and a great guy. Working with him for last 4 projects and will continue in future as well. He has build two websites for me yet and a saas platform. Always delivers over the expectations.',
    name: 'Frank Wienecke',
    role: 'Founder, Matching, Equalent',
  },
]

export const services = [
  [
    '01',
    'Product Design',
    'Turning product ideas and user needs into meaningful experiences, from early concepts to polished interfaces.',
  ],
  [
    '02',
    'UX & UI Design',
    'Creating intuitive user journeys and clean interfaces that make digital products easier to use.',
  ],
  [
    '03',
    'Prototyping & Interaction',
    'Bringing ideas to life through interactive prototypes that communicate and validate design decisions.',
  ],
  [
    '04',
    'Design Systems',
    'Building reusable components and consistent visual foundations for scalable digital experiences.',
  ],
]

import 'server-only'

import { unstable_cache } from 'next/cache'
import type {
  CaseStudy,
  Client,
  Experiment,
  Media,
  Testimonial,
} from '@/payload-types'
import type {
  CaseStudyItem,
  ClientItem,
  ExperimentItem,
  PortfolioImage,
  TestimonialItem,
} from '@/components/portfolio/types'
import { getPayloadClient } from '@/lib/payload'
import { portfolioTags } from '@/lib/portfolio-cache'

function imageFrom(media: number | string | Media): PortfolioImage | null {
  if (typeof media !== 'object' || !media.url) return null

  return {
    url: media.url,
    alt: media.alt,
    width: media.width || 1200,
    height: media.height || 800,
  }
}

export const getCaseStudies = unstable_cache(async (): Promise<CaseStudyItem[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'case-studies',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    sort: 'displayOrder',
  })

  return result.docs.flatMap((doc: CaseStudy) => {
    const cover = imageFrom(doc.cover)
    if (!cover) return []
    return [{
      id: String(doc.id),
      title: doc.title,
      description: doc.description,
      tags: doc.tags?.map((tag) => tag.label) ?? [],
      cover,
      projectURL: doc.projectURL || undefined,
    }]
  })
}, ['portfolio-case-studies'], { tags: [portfolioTags.caseStudies] })

export const getClients = unstable_cache(async (): Promise<ClientItem[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'clients',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    sort: 'displayOrder',
  })

  return result.docs.flatMap((doc: Client) => {
    const logo = imageFrom(doc.logo)
    if (!logo) return []
    return [{
      id: String(doc.id),
      name: doc.name,
      logo,
      websiteURL: doc.websiteURL || undefined,
    }]
  })
}, ['portfolio-clients'], { tags: [portfolioTags.clients] })

export const getTestimonials = unstable_cache(async (): Promise<TestimonialItem[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    depth: 0,
    draft: false,
    limit: 100,
    overrideAccess: false,
    sort: 'displayOrder',
  })

  return result.docs.map((doc: Testimonial) => ({
    id: String(doc.id),
    quote: doc.quote,
    name: doc.name,
    role: doc.role,
  }))
}, ['portfolio-testimonials'], { tags: [portfolioTags.testimonials] })

export const getExperiments = unstable_cache(async (): Promise<ExperimentItem[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'experiments',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    sort: ['column', 'displayOrder'],
  })

  return result.docs.flatMap((doc: Experiment) => {
    const image = imageFrom(doc.image)
    if (!image) return []
    return [{
      id: String(doc.id),
      title: doc.title,
      image,
      column: doc.column,
      aspectRatio: doc.aspectRatio,
      projectURL: doc.projectURL || undefined,
    }]
  })
}, ['portfolio-experiments'], { tags: [portfolioTags.experiments] })

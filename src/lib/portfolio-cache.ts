import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const portfolioTags = {
  caseStudies: 'portfolio:case-studies',
  clients: 'portfolio:clients',
  experiments: 'portfolio:experiments',
  testimonials: 'portfolio:testimonials',
} as const

export const allPortfolioTags = Object.values(portfolioTags)

export function createPortfolioHooks(tag: string) {
  const afterChange: CollectionAfterChangeHook = () => {
    revalidateTag(tag, 'max')
  }
  const afterDelete: CollectionAfterDeleteHook = () => {
    revalidateTag(tag, 'max')
  }

  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

export function createMediaPortfolioHooks() {
  const invalidate = () => {
    allPortfolioTags.forEach((tag) => revalidateTag(tag, 'max'))
  }
  const afterChange: CollectionAfterChangeHook = invalidate
  const afterDelete: CollectionAfterDeleteHook = invalidate

  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

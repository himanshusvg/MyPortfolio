import type { CollectionConfig } from 'payload'
import { createPortfolioHooks, portfolioTags } from '@/lib/portfolio-cache'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    group: 'Portfolio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder', '_status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: createPortfolioHooks(portfolioTags.caseStudies),
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'projectURL',
      type: 'text',
      admin: { description: 'Optional URL opened by “View Project”.' },
    },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}

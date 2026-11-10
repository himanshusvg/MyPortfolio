import type { CollectionConfig } from 'payload'
import { createPortfolioHooks, portfolioTags } from '@/lib/portfolio-cache'

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'column', 'displayOrder', '_status'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: createPortfolioHooks(portfolioTags.experiments),
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'column',
      type: 'select',
      required: true,
      defaultValue: '1',
      options: [
        { label: 'Left', value: '1' },
        { label: 'Middle', value: '2' },
        { label: 'Right', value: '3' },
      ],
    },
    {
      name: 'aspectRatio',
      type: 'text',
      required: true,
      defaultValue: '1 / 1',
      admin: { description: 'CSS ratio such as “1 / 1” or “370 / 429”.' },
    },
    { name: 'projectURL', type: 'text' },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}

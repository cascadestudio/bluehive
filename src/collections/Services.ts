import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => Boolean(user), // Only authenticated users can create
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Service title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Service description',
      },
    },
    {
      name: 'useCases',
      type: 'array',
      required: false,
      admin: {
        description: 'List of use case paragraphs for this service',
      },
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Use case paragraph',
          },
        },
      ],
    },
  ],
  timestamps: true, // Adds createdAt and updatedAt fields
}

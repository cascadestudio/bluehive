import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'createdAt'],
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
        description: 'Project title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Project description',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main project image',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'project-categories',
      hasMany: true,
      admin: {
        description: 'Project categories',
      },
    },
    {
      name: 'selectedProject',
      type: 'select',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: '4',
          value: '4',
        },
      ],
      defaultValue: 'none',
      validate: async (value, { data, req }) => {
        // If value is 'none', it's always valid
        if (value === 'none') {
          return true
        }

        const payload = req.payload

        // Check if this position is already taken by another project
        const { docs: existingProjects } = await payload.find({
          collection: 'projects',
          where: {
            and: [
              {
                selectedProject: {
                  equals: value,
                },
              },
              {
                id: {
                  not_equals: data?.id, // Exclude current project if editing
                },
              },
            ],
          },
          limit: 1,
        })

        if (existingProjects.length > 0) {
          return `Position ${value} is already assigned to another project. Please choose a different position.`
        }

        return true
      },
      admin: {
        description:
          "Select project display order on home page (1-4). If a position is already taken, you'll see a validation error.",
      },
    },
  ],
  timestamps: true, // Adds createdAt and updatedAt fields
}

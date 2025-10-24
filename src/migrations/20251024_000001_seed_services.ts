import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Check if services already exist (safety check)
  const existing = await payload.find({
    collection: 'services',
    limit: 1,
  })

  if (existing.docs.length > 0) {
    payload.logger.info('Services already exist, skipping seed')
    return
  }

  payload.logger.info('Seeding services...')

  const services = [
    {
      title: 'IoT-based data integration, management and analysis platforms',
      description:
        'Comprehensive IoT solutions for real-time data collection, processing, and visualization.',
      useCases: [
        {
          useCase:
            'Real-time monitoring and control of industrial equipment and processes across multiple locations',
        },
        {
          useCase:
            'Smart building management systems with energy optimization and predictive maintenance capabilities',
        },
        {
          useCase:
            'Connected device ecosystems with centralized data analytics and automated decision-making',
        },
      ],
    },
    {
      title: 'Visual recognition solutions',
      description: 'Advanced computer vision systems for automated visual inspection and analysis.',
      useCases: [
        {
          useCase:
            'Quality control and defect detection in manufacturing processes with high accuracy and speed',
        },
        {
          useCase:
            'Automated inventory management through visual product identification and tracking',
        },
        {
          useCase:
            'Security and access control systems using facial recognition and object detection',
        },
      ],
    },
    {
      title: 'Vibration-based anomaly detection and predictive maintenance',
      description:
        'Intelligent monitoring systems that detect equipment anomalies through vibration analysis.',
      useCases: [
        {
          useCase:
            'Early detection of mechanical failures in rotating equipment, reducing unplanned downtime by up to 80%',
        },
        {
          useCase:
            'Condition-based maintenance scheduling for critical industrial machinery and production lines',
        },
        {
          useCase:
            'Real-time health monitoring of motors, pumps, and bearings with automated alert systems',
        },
      ],
    },
    {
      title: 'Laser-based truck load measurement solutions',
      description:
        'Precise volumetric measurement systems for logistics and transportation optimization.',
      useCases: [
        {
          useCase:
            'Automated load volume calculation for trucks and containers, ensuring optimal space utilization',
        },
        {
          useCase:
            'Real-time loading verification to prevent overloading and ensure compliance with regulations',
        },
        {
          useCase:
            'Integration with logistics management systems for improved billing accuracy and operational efficiency',
        },
      ],
    },
  ]

  for (const service of services) {
    await payload.create({
      collection: 'services',
      data: service,
    })
    payload.logger.info(`✅ Created service: ${service.title}`)
  }

  payload.logger.info('✅ Services seeded successfully')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Rolling back service seed...')

  // Find all services
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  // Delete all services
  for (const service of services.docs) {
    await payload.delete({
      collection: 'services',
      id: service.id,
    })
    payload.logger.info(`Deleted service: ${service.title}`)
  }

  payload.logger.info('✅ Service seed rollback completed')
}

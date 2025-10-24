import React from 'react'
import { PersonCard } from './PersonCard'
import { SectionHeader } from './SectionHeader'

export const About: React.FC = () => {
  return (
    <section id="about" className="section-border">
      <SectionHeader
        title="ABOUT BLUEHIVE"
        introText="BlueHive Digital Solutions designs, builds, and maintains tailored industrial IoT solutions for sectors such as water, wastewater, environment, recycling, mining, and aggregates. We transform data from machines, vibration sensors, and cameras into actionable insights through advanced analytics, machine learning, and computer vision. These insights are delivered via dashboards, monitoring, alerting, and reporting tools, helping stakeholders improve efficiency, reliability, and sustainability. Backed by strong academic and industry partnerships, our multidisciplinary team ensures solutions that are both robust and future-ready."
      />

      <div className="brand-grid">
        <div className="col-span-3">
          <PersonCard
            image="/images/vincent-mottier.jpg"
            name="Vincent Mottier"
            position="Co-Founder & CEO"
            description="Vincent combines a background in environmental engineering and information technology with experience in global IT firms and in product management for asset performance management. He has created and scaled software platforms for utilities and is now excited to drive the growth of his own company. Curious, innovative, and persevering, he is motivated by transforming new ideas into tangible solutions."
            linkedinUrl="https://linkedin.com/in/vincent-mottier"
          />
        </div>
        <div className="col-span-3">
          <PersonCard
            image="/images/patrick-zhao.jpg"
            name="Patrick Zhao"
            position="Co-Founder & CTO"
            description="Patrick is a software engineer with a background in microengineering and robotics. He specializes in computer vision, machine learning, and robotics, with hands-on experience in Python, C++, Rust, and JavaScript. At BlueHive, he develops AI vision systems for bulk material monitoring and leads initiatives in model training, system integration, and robotics innovation. Curious and inventive, he is driven by solving complex problems and advancing new technologies.
"
            linkedinUrl="https://linkedin.com/in/patrick-zhao"
          />
        </div>
      </div>
    </section>
  )
}

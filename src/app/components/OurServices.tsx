import React from 'react'

export const OurServices = (): React.JSX.Element => {
  return (
    <section className="grid grid-cols-12">
      <h2 className="col-span-12 font-section-title mb-2">OUR SERVICES</h2>

      <div className="col-span-6 space-y-6">
        <p>Our services are guided by three core values:</p>
        <p>
          <b>Innovation</b> – We harness the potential of digital technologies by testing and
          validating new tools and approaches in collaboration with trusted partners. Only the
          solutions that combine performance, flexibility, and real business value are integrated
          into our offerings.
        </p>
        <p>
          <b>Rigor</b> – We apply proven engineering practices and robust methodologies to build
          systems that are reliable, scalable, and sustainable. Modular architectures and modern
          DevOps methods ensure teamwork, knowledge sharing, and long-term resilience.
        </p>
        <p>
          <b>Pragmatism</b> – We stay close to customer needs, focusing on practical, incremental,
          and iterative solutions. Rather than building “technology for technology’s sake,” we
          validate requirements with our clients and deliver exactly what they need, in the form
          that best serves their operations.
        </p>
      </div>
    </section>
  )
}

import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-blue pt-8 pb-12 px-4 md:px-8 mt-16 md:mt-32">
      <div className="brand-grid">
        {/* Contact Us */}
        <div className="col-span-12 sm:col-span-6 md:col-span-2">
          <h3 className="font-tag mb-4">Contact Us</h3>
          <div className="space-y-2 text-sm">
            <p>
              <a
                href="mailto:contact@bluehive.ch"
                className="hover:text-brand-blue transition-colors"
              >
                contact@bluehive.ch
              </a>
            </p>
            <p>
              <a href="tel:+41225912631" className="hover:text-brand-blue transition-colors">
                +41 22 591 26 31
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/company/bluehive-digital-solutions"
                className="hover:text-brand-blue transition-colors"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        {/* Head Office */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h3 className="font-tag mb-4">Head Office</h3>
          <address className="text-sm not-italic">
            <a
              href="https://maps.google.com/?q=20+chemin+Michée-Chauderon+1203+Genève"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              <p>BlueHive Digital Solutions LLC,</p>
              <p>20, chemin Michée-Chauderon,</p>
              <p>CH-1203 Genève</p>
            </a>
          </address>
        </div>

        {/* Offices */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h3 className="font-tag mb-4">Offices</h3>
          <address className="text-sm not-italic">
            <a
              href="https://maps.google.com/?q=rue+de+Lyon+77+1203+Genève"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              <p>BlueHive Digital Solutions LLC,</p>
              <p>rue de Lyon 77,</p>
              <p>CH-1203 Genève</p>
            </a>
          </address>
        </div>

        {/* Sitemap */}
        <div className="col-span-12 sm:col-span-6 md:col-span-2">
          <h3 className="font-tag mb-4">Sitemap</h3>
          <nav className="space-y-2 text-sm">
            <p>
              <a href="#projects" className="hover:text-brand-blue transition-colors">
                Projects
              </a>
            </p>
            <p>
              <a href="#services" className="hover:text-brand-blue transition-colors">
                Services
              </a>
            </p>
            <p>
              <a href="#about" className="hover:text-brand-blue transition-colors">
                About
              </a>
            </p>
          </nav>
        </div>

        {/* Legal */}
        <div className="col-span-12 sm:col-span-6 md:col-span-2">
          <h3 className="font-tag mb-4">Legal</h3>
          <div className="text-sm">
            <p>
              <a href="/legal-notice" className="hover:text-brand-blue transition-colors">
                Legal notice
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

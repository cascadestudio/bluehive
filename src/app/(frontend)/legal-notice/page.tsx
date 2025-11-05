import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice and terms of use for BlueHive Digital Solutions website',
}

export default function LegalNoticePage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Legal Notice</h1>

      <div className="prose prose-invert max-w-none space-y-8 text-sm md:text-base">
        {/* Éditeur du site */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">1. Site Editor</h2>
          <p>This website is published by:</p>
          <address className="not-italic mt-2">
            <p className="font-semibold">BlueHive Digital Solutions LLC</p>
            <p>20, chemin Michée-Chauderon</p>
            <p>CH-1203 Genève</p>
            <p>Switzerland</p>
            <p className="mt-4">
              <strong>Phone:</strong>{' '}
              <a href="tel:+41225912631" className="text-brand-blue hover:underline">
                +41 22 591 26 31
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
                contact@bluehive.ch
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href="https://bluehive.ch" className="text-brand-blue hover:underline">
                https://bluehive.ch
              </a>
            </p>
            {/* TODO: Add registration number if available */}
            {/* <p className="mt-2">
                <strong>Registration number (RC):</strong> [À compléter]
              </p> */}
            {/* TODO: Add VAT number if applicable */}
            {/* <p>
                <strong>VAT number:</strong> [À compléter]
              </p> */}
          </address>
        </section>

        {/* Directeur de publication */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">2. Publication Director</h2>
          {/* TODO: Add publication director name */}
          <p>Publication Director: [À compléter - Nom du responsable]</p>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">3. Hosting</h2>
          {/* TODO: Add hosting provider information */}
          <p>This website is hosted on a private server.</p>
          {/* <p>
              <strong>Hosting provider:</strong> [À compléter - Nom de l'hébergeur]
            </p>
            <address className="not-italic mt-2">
              <p>[Adresse de l'hébergeur]</p>
              <p>[Téléphone]</p>
              <p>
                <a href="[URL]" className="text-brand-blue hover:underline">
                  [Site web]
                </a>
              </p>
            </address> */}
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">4. Intellectual Property</h2>
          <p>
            The entire content of this website, including but not limited to texts, images,
            graphics, logos, videos, and software, is the exclusive property of BlueHive Digital
            Solutions LLC, unless otherwise stated. All rights are reserved.
          </p>
          <p className="mt-4">
            Any reproduction, representation, modification, publication, or adaptation of all or
            part of the elements of the site, regardless of the means or process used, is prohibited
            without prior written authorization from BlueHive Digital Solutions LLC.
          </p>
          <p className="mt-4">
            Unauthorized use of the site or any of its contents will give rise to legal proceedings.
            The same applies to databases appearing on the website, which are protected by the
            provisions of the Swiss Federal Law on Copyright and Related Rights.
          </p>
        </section>

        {/* Protection des données */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">5. Personal Data Protection</h2>
          <p>
            In accordance with the Swiss Federal Data Protection Act (FADP), you have the right to
            access, rectify, and delete data concerning you. You can exercise this right by
            contacting us at:{' '}
            <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
              contact@bluehive.ch
            </a>
          </p>
          <p className="mt-4">
            The personal information collected on this site is intended for the use of BlueHive
            Digital Solutions LLC and will not be communicated to third parties. This information
            may be used for statistical purposes and to improve the quality of our services.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">6. Cookies</h2>
          <p>
            This website may use cookies to improve user experience and analyze site traffic. By
            continuing to browse this site, you accept the use of cookies.
          </p>
          <p className="mt-4">
            You can configure your browser to refuse cookies, but this may affect the functionality
            of certain parts of the site.
          </p>
        </section>

        {/* Responsabilité */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            BlueHive Digital Solutions LLC cannot be held responsible for direct or indirect damage
            caused to the user's equipment when accessing the site, resulting either from the use of
            equipment that does not meet the specifications indicated, or from the appearance of a
            bug or incompatibility.
          </p>
          <p className="mt-4">
            BlueHive Digital Solutions LLC cannot also be held responsible for indirect damage (such
            as loss of market or loss of opportunity) resulting from the use of the site.
          </p>
          <p className="mt-4">
            Interactive spaces (contact forms, comments) are available to users. BlueHive Digital
            Solutions LLC reserves the right to delete, without prior notice, any content posted in
            this space that would contravene applicable law in Switzerland, in particular provisions
            relating to data protection.
          </p>
        </section>

        {/* Liens externes */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">8. External Links</h2>
          <p>
            This website may contain links to external websites. BlueHive Digital Solutions LLC has
            no control over these external sites and cannot be held responsible for their content,
            privacy policies, or practices.
          </p>
        </section>

        {/* Droit applicable */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">9. Applicable Law</h2>
          <p>
            These terms and conditions are governed by Swiss law. Any dispute relating to the use of
            this site shall be subject to the exclusive jurisdiction of the courts of Geneva,
            Switzerland.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">10. Contact</h2>
          <p>For any questions regarding these legal notices, you can contact us:</p>
          <address className="not-italic mt-2">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
                contact@bluehive.ch
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+41225912631" className="text-brand-blue hover:underline">
                +41 22 591 26 31
              </a>
            </p>
          </address>
        </section>

        {/* Date de mise à jour */}
        <section className="mt-12 pt-8 border-t border-brand-blue">
          <p className="text-sm text-gray-400">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </section>
      </div>
    </div>
  )
}

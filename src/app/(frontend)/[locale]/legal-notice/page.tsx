import React from 'react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

const translations = {
  en: {
    title: 'Legal Notice',
    description: 'Legal notice and terms of use for BlueHive Digital Solutions website',
    h1: 'Legal Notice',
    siteEditor: 'Site Editor',
    publishedBy: 'This website is published by:',
    phone: 'Phone:',
    email: 'Email:',
    website: 'Website:',
    registrationNumber: 'Registration number (RC):',
    vatNumber: 'VAT number:',
    publicationDirector: 'Publication Director',
    hosting: 'Hosting',
    hostedOn: 'This website is hosted on a private server.',
    hostingProvider: 'Hosting provider:',
    intellectualProperty: 'Intellectual Property',
    ipText1:
      'The entire content of this website, including but not limited to texts, images, graphics, logos, videos, and software, is the exclusive property of BlueHive Digital Solutions Sàrl, unless otherwise stated. All rights are reserved.',
    ipText2:
      'Any reproduction, representation, modification, publication, or adaptation of all or part of the elements of the site, regardless of the means or process used, is prohibited without prior written authorization from BlueHive Digital Solutions Sàrl.',
    ipText3:
      'Unauthorized use of the site or any of its contents will give rise to legal proceedings. The same applies to databases appearing on the website, which are protected by the provisions of the Swiss Federal Law on Copyright and Related Rights.',
    dataProtection: 'Personal Data Protection',
    dataProtectionText1:
      'In accordance with the Swiss Federal Data Protection Act (FADP), you have the right to access, rectify, and delete data concerning you. You can exercise this right by contacting us at:',
    dataProtectionText2:
      'The personal information collected on this site is intended for the use of BlueHive Digital Solutions Sàrl and will not be communicated to third parties. This information may be used for statistical purposes and to improve the quality of our services.',
    cookies: 'Cookies',
    cookiesText1:
      'This website may use cookies to improve user experience and analyze site traffic. By continuing to browse this site, you accept the use of cookies.',
    cookiesText2:
      'You can configure your browser to refuse cookies, but this may affect the functionality of certain parts of the site.',
    liability: 'Limitation of Liability',
    liabilityText1:
      "BlueHive Digital Solutions Sàrl cannot be held responsible for direct or indirect damage caused to the user's equipment when accessing the site, resulting either from the use of equipment that does not meet the specifications indicated, or from the appearance of a bug or incompatibility.",
    liabilityText2:
      'BlueHive Digital Solutions Sàrl cannot also be held responsible for indirect damage (such as loss of market or loss of opportunity) resulting from the use of the site.',
    liabilityText3:
      'Interactive spaces (contact forms, comments) are available to users. BlueHive Digital Solutions Sàrl reserves the right to delete, without prior notice, any content posted in this space that would contravene applicable law in Switzerland, in particular provisions relating to data protection.',
    externalLinks: 'External Links',
    externalLinksText:
      'This website may contain links to external websites. BlueHive Digital Solutions Sàrl has no control over these external sites and cannot be held responsible for their content, privacy policies, or practices.',
    applicableLaw: 'Applicable Law',
    applicableLawText:
      'These terms and conditions are governed by Swiss law. Any dispute relating to the use of this site shall be subject to the exclusive jurisdiction of the courts of Geneva, Switzerland.',
    contact: 'Contact',
    contactText: 'For any questions regarding these legal notices, you can contact us:',
    lastUpdated: 'Last updated:',
  },
  fr: {
    title: 'Mentions légales',
    description: "Mentions légales et conditions d'utilisation du site BlueHive Digital Solutions",
    h1: 'Mentions légales',
    siteEditor: 'Éditeur du site',
    publishedBy: 'Ce site est édité par :',
    phone: 'Téléphone :',
    email: 'Email :',
    website: 'Site web :',
    registrationNumber: "Numéro d'immatriculation (RC) :",
    vatNumber: 'Numéro de TVA :',
    publicationDirector: 'Directeur de publication',
    hosting: 'Hébergement',
    hostedOn: 'Ce site est hébergé sur un serveur privé.',
    hostingProvider: 'Hébergeur :',
    intellectualProperty: 'Propriété intellectuelle',
    ipText1:
      "L'ensemble du contenu de ce site, y compris mais sans s'y limiter, les textes, images, graphiques, logos, vidéos et logiciels, est la propriété exclusive de BlueHive Digital Solutions Sàrl, sauf indication contraire. Tous droits réservés.",
    ipText2:
      'Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de BlueHive Digital Solutions Sàrl.',
    ipText3:
      "L'utilisation non autorisée du site ou de tout son contenu donnera lieu à des poursuites judiciaires. Il en va de même pour les bases de données apparaissant sur le site web, qui sont protégées par les dispositions de la loi fédérale suisse sur le droit d'auteur et les droits voisins.",
    dataProtection: 'Protection des données personnelles',
    dataProtectionText1:
      "Conformément à la loi fédérale suisse sur la protection des données (LPD), vous avez le droit d'accéder, de rectifier et de supprimer les données vous concernant. Vous pouvez exercer ce droit en nous contactant à :",
    dataProtectionText2:
      "Les informations personnelles collectées sur ce site sont destinées à l'usage de BlueHive Digital Solutions Sàrl et ne seront pas communiquées à des tiers. Ces informations peuvent être utilisées à des fins statistiques et pour améliorer la qualité de nos services.",
    cookies: 'Cookies',
    cookiesText1:
      "Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur et analyser le trafic du site. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.",
    cookiesText2:
      'Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter le fonctionnement de certaines parties du site.',
    liability: 'Limitation de responsabilité',
    liabilityText1:
      "BlueHive Digital Solutions Sàrl ne peut être tenue responsable des dommages directs ou indirects causés à l'équipement de l'utilisateur lors de l'accès au site, résultant soit de l'utilisation d'un équipement ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.",
    liabilityText2:
      "BlueHive Digital Solutions Sàrl ne peut également être tenue responsable des dommages indirects (tels que perte de marché ou perte d'opportunité) résultant de l'utilisation du site.",
    liabilityText3:
      'Des espaces interactifs (formulaires de contact, commentaires) sont disponibles aux utilisateurs. BlueHive Digital Solutions Sàrl se réserve le droit de supprimer, sans préavis, tout contenu publié dans cet espace qui contreviendrait à la législation applicable en Suisse, en particulier les dispositions relatives à la protection des données.',
    externalLinks: 'Liens externes',
    externalLinksText:
      "Ce site peut contenir des liens vers des sites web externes. BlueHive Digital Solutions Sàrl n'a aucun contrôle sur ces sites externes et ne peut être tenue responsable de leur contenu, de leurs politiques de confidentialité ou de leurs pratiques.",
    applicableLaw: 'Droit applicable',
    applicableLawText:
      "Ces conditions générales sont régies par le droit suisse. Tout litige relatif à l'utilisation de ce site relève de la compétence exclusive des tribunaux de Genève, Suisse.",
    contact: 'Contact',
    contactText:
      'Pour toute question concernant ces mentions légales, vous pouvez nous contacter :',
    lastUpdated: 'Dernière mise à jour :',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = translations[locale as keyof typeof translations] || translations.en

  return {
    title: t.title,
    description: t.description,
  }
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">{t.h1}</h1>

      <div className="prose prose-invert max-w-none space-y-8 text-sm md:text-base">
        {/* Éditeur du site */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">1. {t.siteEditor}</h2>
          <p>{t.publishedBy}</p>
          <address className="not-italic mt-2">
            <p className="font-semibold">BlueHive Digital Solutions Sàrl</p>
            <p>20, chemin Michée-Chauderon</p>
            <p>CH-1203 Genève</p>
            <p>Switzerland</p>
            <p className="mt-4">
              <strong>{t.phone}</strong>{' '}
              <a href="tel:+41225912631" className="text-brand-blue hover:underline">
                +41 22 591 26 31
              </a>
            </p>
            <p>
              <strong>{t.email}</strong>{' '}
              <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
                contact@bluehive.ch
              </a>
            </p>
            <p>
              <strong>{t.website}</strong>{' '}
              <a href="https://bluehive.ch" className="text-brand-blue hover:underline">
                https://bluehive.ch
              </a>
            </p>
            <p className="mt-2">
              <strong>{t.registrationNumber}</strong> CH-660.1.362.021-2
            </p>
            <p>
              <strong>{t.vatNumber}</strong> CHE-470.040.656
            </p>
          </address>
        </section>

        {/* Directeur de publication */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">2. {t.publicationDirector}</h2>
          <p>{t.publicationDirector}: Vincent Mottier</p>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">3. {t.hosting}</h2>
          <p>{t.hostedOn}</p>
          <p>
            <strong>{t.hostingProvider}</strong> Infomaniak
          </p>
          <address className="not-italic mt-2">
            <p>Infomaniak</p>
            <p>20, chemin de la Croix-Rouge 1227 Carouge, Switzerland</p>
          </address>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">4. {t.intellectualProperty}</h2>
          <p>{t.ipText1}</p>
          <p className="mt-4">{t.ipText2}</p>
          <p className="mt-4">{t.ipText3}</p>
        </section>

        {/* Protection des données */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">5. {t.dataProtection}</h2>
          <p>
            {t.dataProtectionText1}{' '}
            <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
              contact@bluehive.ch
            </a>
          </p>
          <p className="mt-4">{t.dataProtectionText2}</p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">6. {t.cookies}</h2>
          <p>{t.cookiesText1}</p>
          <p className="mt-4">{t.cookiesText2}</p>
        </section>

        {/* Responsabilité */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">7. {t.liability}</h2>
          <p>{t.liabilityText1}</p>
          <p className="mt-4">{t.liabilityText2}</p>
          <p className="mt-4">{t.liabilityText3}</p>
        </section>

        {/* Liens externes */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">8. {t.externalLinks}</h2>
          <p>{t.externalLinksText}</p>
        </section>

        {/* Droit applicable */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">9. {t.applicableLaw}</h2>
          <p>{t.applicableLawText}</p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">10. {t.contact}</h2>
          <p>{t.contactText}</p>
          <address className="not-italic mt-2">
            <p>
              <strong>{t.email}</strong>{' '}
              <a href="mailto:contact@bluehive.ch" className="text-brand-blue hover:underline">
                contact@bluehive.ch
              </a>
            </p>
            <p>
              <strong>{t.phone}</strong>{' '}
              <a href="tel:+41225912631" className="text-brand-blue hover:underline">
                +41 22 591 26 31
              </a>
            </p>
          </address>
        </section>

        {/* Date de mise à jour */}
        <section className="mt-12 pt-8 border-t border-brand-blue">
          <p className="text-sm text-gray-400">
            {t.lastUpdated}{' '}
            {new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
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

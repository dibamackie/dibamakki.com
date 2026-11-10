import Portfolio from '@/components/Portfolio'
import { projects, services } from '@/data/projects'
import { siteUrl } from '@/data/site'

const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Diba Makki',
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: 'Full Stack Developer',
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  sameAs: ['https://github.com/dibamackie', 'https://linkedin.com/in/dibamakki'],
  knowsAbout: ['Full stack development', 'Automation', 'Web applications', 'Web design', 'Browser extensions', 'AI integration', 'APIs', 'React', 'Next.js', 'Node.js'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'Diba Makki', publisher: { '@id': `${siteUrl}/#person` } },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#services`,
      name: 'Diba Makki — Full Stack Development',
      url: siteUrl,
      image: `${siteUrl}/profile.jpg`,
      founder: { '@id': `${siteUrl}/#person` },
      areaServed: [{ '@type': 'City', name: 'Toronto' }, { '@type': 'Country', name: 'Canada' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: services.map((service) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, description: service.description } })),
      },
    },
    {
      '@type': 'ItemList',
      name: 'Selected projects',
      itemListElement: projects.filter((project) => project.title).map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'CreativeWork', name: project.title, description: project.description, creator: { '@id': `${siteUrl}/#person` }, ...(project.live || project.github ? { url: project.live || project.github } : {}) },
      })),
    },
  ],
}

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }} />
    <Portfolio />
  </>
}

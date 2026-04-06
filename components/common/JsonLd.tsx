const BASE_URL = 'https://mateuszpaulus.dev'

interface JsonLdProps {
  locale: string
}

export default function JsonLd({ locale }: JsonLdProps) {
  const isEn = locale === 'en'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mateusz Paulus',
    url: BASE_URL,
    image: `${BASE_URL}/icons/icon-512x512.png`,
    jobTitle: 'Fullstack Developer',
    description: isEn
      ? 'Fullstack Developer specializing in Next.js, TypeScript and Node.js.'
      : 'Fullstack Developer specjalizujący się w Next.js, TypeScript i Node.js.',
    knowsAbout: [
      'Next.js', 'React', 'TypeScript',
      'Node.js', 'PostgreSQL', 'Tailwind CSS',
      'Docker', 'AWS', 'REST API', 'GraphQL',
    ],
    sameAs: [
      'https://github.com/mateuszpaulus',
      'https://linkedin.com/in/mateuszpaulus',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

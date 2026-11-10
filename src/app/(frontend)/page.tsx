import HomePage from '@/components/portfolio/HomePage'
import {
  getCaseStudies,
  getClients,
  getTestimonials,
} from '@/lib/portfolio-content'

export default async function Page() {
  const [caseStudies, clients, testimonials] = await Promise.all([
    getCaseStudies(),
    getClients(),
    getTestimonials(),
  ])

  return (
    <HomePage
      caseStudies={caseStudies}
      clients={clients}
      testimonials={testimonials}
    />
  )
}

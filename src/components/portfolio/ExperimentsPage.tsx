'use client'

import { useRouter } from 'next/navigation'
import { MobileMenu } from './MobileMenu'
import { SiteFooter } from './SiteFooter'
import { projectInquiryURL } from './homeData'

const assets = '/assets'

type Experiment = {
  title: string
  image: string
  url: string
}

const experiments: Experiment[] = [
  {
    title: 'TypeRun',
    image: 'typerun-thumbnail.png',
    url: 'https://typerun.figma.site/',
  },
]

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <a
      className="experiment-card"
      href={experiment.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${experiment.title} project`}
    >
      <span className="experiment-thumbnail">
        <img
          src={`${assets}/${experiment.image}`}
          alt={`${experiment.title} project thumbnail`}
          width="1200"
          height="630"
        />
      </span>
      <span className="experiment-title">{experiment.title}</span>
    </a>
  )
}

export default function ExperimentsPage() {
  const router = useRouter()

  return (
    <main className="experiments-page">
      <header className="site-header experiments-header">
        <button
          className="logo logo-button"
          type="button"
          onClick={() => router.push('/')}
          aria-label="Himanshu home"
        >
          himanshu.
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => router.push('/')}>
            Projects
          </button>
          <button className="active" type="button">
            Experiments
          </button>
          <button type="button" onClick={() => router.push('/about')}>
            About Me
          </button>
          <button type="button" onClick={() => router.push('/resume')}>
            Resume
          </button>
        </nav>
        <a
          className="button experiments-cta"
          href={projectInquiryURL}
          target="_blank"
          rel="noreferrer"
          aria-label="Start a project"
        >
          <span>Start a project</span>
          <img src={`${assets}/c8e97.svg`} alt="" width="18" height="18" />
        </a>
        <MobileMenu active="experiments" />
      </header>

      <section className="experiments-gallery" aria-label="Side projects">
        {experiments.map((experiment) => (
          <ExperimentCard experiment={experiment} key={experiment.title} />
        ))}
      </section>

      <SiteFooter className="experiments-footer" />
    </main>
  )
}

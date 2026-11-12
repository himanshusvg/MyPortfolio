'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, ProjectCard, SectionTitle } from './HomeComponents'
import { MobileMenu } from './MobileMenu'
import { SiteFooter } from './SiteFooter'
import { assets, clients, icons, projectInquiryURL, services, testimonials } from './homeData'
import { useHeroBreakout } from './useHeroBreakout'

export default function HomePage() {
  const router = useRouter()
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const {
    heroRef,
    portraitRef,
    gameBallRef,
    gamePhase,
    gameScore,
    finalScore,
    didWinGame,
    ballSize,
    movePortrait,
    resetPortrait,
    closeGameResult,
  } = useHeroBreakout()

  useEffect(() => {
    if (window.location.hash !== '#contact') return
    const frame = requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const goToCalendar = () => {
    router.push('/#contact')
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const changeTestimonial = (direction: number) => {
    setTestimonialIndex(
      (currentIndex) => (currentIndex + direction + testimonials.length) % testimonials.length,
    )
  }

  const visibleTestimonials = [0, 1].map(
    (offset) => testimonials[(testimonialIndex + offset) % testimonials.length],
  )
  const isGameActive = gamePhase === 'playing'

  return (
    <main className={`home-page ${isGameActive ? 'game-active' : ''}`}>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Himanshu home" data-game-obstacle="logo">
          himanshu.
        </a>
        <nav aria-label="Primary navigation">
          <button
            className="active project-nav-source"
            type="button"
            data-game-ball-source="projects"
          >
            {'Projects'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/experiments')}
            data-game-obstacle="experiments"
          >
            Experiments
          </button>
          <button type="button" onClick={() => router.push('/about')} data-game-obstacle="about">
            About Me
          </button>
          <button type="button" onClick={() => router.push('/resume')} data-game-obstacle="resume">
            Resume
          </button>
        </nav>
        <Button icon gameObstacle="cta" href={projectInquiryURL}>
          Start a project
        </Button>
        <MobileMenu active="projects" />
      </header>

      <section
        className="hero"
        id="top"
        ref={heroRef}
        onPointerMove={movePortrait}
        onPointerLeave={resetPortrait}
      >
        <div className="hero-portrait-wrap">
          <div className="hero-portrait" ref={portraitRef}>
            <img src={`${assets}/a1391.png`} alt="Portrait of Himanshu Ranjan Raj" />
          </div>
        </div>
        <div className="hero-content reveal is-visible">
          <h1>Himanshu Ranjan Raj</h1>
          <p />
          <div className="button-row">
            <Button secondary onClick={goToCalendar}>
              Schedule A meeting
            </Button>
            <Button href={projectInquiryURL}>Start a project</Button>
          </div>
        </div>
        {gamePhase === 'playing' && (
          <div className="breakout-rules" aria-live="polite">
            <strong>Keep it alive</strong>
            <ul>
              <li>Move the portrait to stop Projects from falling.</li>
              <li>Hit the logo, navigation, or CTA to earn 5 points.</li>
              <li>Keep your pointer inside the hero or the game ends.</li>
              <li>Return Projects to its exact nav position to win 10,000 points.</li>
            </ul>
          </div>
        )}
      </section>

      {gamePhase === 'playing' && (
        <>
          <div
            className="breakout-project-ball"
            ref={gameBallRef}
            style={{ width: ballSize.width, height: ballSize.height }}
          >
            Projects
          </div>
          <div className="breakout-score">Points: {gameScore}</div>
        </>
      )}

      {gamePhase === 'finished' && (
        <div
          className="breakout-result"
          role="dialog"
          aria-modal="true"
          aria-labelledby="breakout-final-score"
        >
          <p id="breakout-final-score">
            {didWinGame ? 'You won: 10,000 points' : `Final score: ${finalScore}`}
          </p>
          <button className="button" type="button" onClick={closeGameResult}>
            Close
          </button>
        </div>
      )}

      <section className="page-section" id="work">
        <SectionTitle icon={icons.briefcase}>Selected Work</SectionTitle>
        <div className="projects">
          {[1, 2, 3].map((project) => (
            <ProjectCard key={project} index={project} />
          ))}
        </div>
      </section>

      <section className="page-section" id="about">
        <SectionTitle icon={icons.smile}>About Me</SectionTitle>
        <div className="about-layout reveal">
          <img className="about-photo" src={`${assets}/0381f.png`} alt="Himanshu seated indoors" />
          <div className="about-copy">
            <div>
              <h3>
                I'm a product designer who thinks beyond pixels.{' '}
                <span>
                  I help startups and scaleups turn complex ideas into products people actually want
                  to use.
                </span>
              </h3>
              <p />
            </div>
            <Button secondary icon onClick={() => router.push('/about')}>
              More About Me
            </Button>
          </div>
        </div>
      </section>

      <section className="page-section" id="services">
        <SectionTitle icon={icons.design}>What I Bring</SectionTitle>
        <div className="services-panel reveal">
          <div className="service-list">
            {services.map(([number, title, description]) => (
              <article className="service-card" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <Button secondary wide icon href={projectInquiryURL}>
            Start a project
          </Button>
        </div>
      </section>

      <section className="page-section" id="clients">
        <SectionTitle icon={icons.support}>Important Clients</SectionTitle>
        <div className="split-layout reveal">
          <div className="intro-column">
            <h3>
              Good design starts with understanding people, their needs, and the problems worth
              solving.
            </h3>
            <Button secondary onClick={goToCalendar}>
              Schedule A meeting
            </Button>
          </div>
          <div className="client-grid">
            {clients.map((client) => {
              const clientContent = (
                <>
                  <div className={`client-logo ${client.colorLogo ? 'client-logo--swap' : ''}`}>
                    <img className="client-logo-default" src={`${assets}/${client.logo}`} alt="" />
                    {client.colorLogo && (
                      <img
                        className="client-logo-color"
                        src={`${assets}/${client.colorLogo}`}
                        alt=""
                      />
                    )}
                  </div>
                  <span>{client.name}</span>
                </>
              )

              return client.websiteURL ? (
                <a
                  className="client"
                  href={client.websiteURL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${client.name}`}
                  key={client.name}
                >
                  {clientContent}
                </a>
              ) : (
                <div className="client" key={client.name}>
                  {clientContent}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="page-section testimonials" id="testimonials">
        <SectionTitle icon={icons.heart}>Testimonials</SectionTitle>
        <div className="split-layout reveal">
          <div className="intro-column">
            <h3>These are words of my clients and awseom people i have worked with!</h3>
          </div>
          <div className="testimonial-area" aria-live="polite">
            <div className="testimonial-list">
              {visibleTestimonials.map((testimonial, index) => (
                <article
                  className="testimonial-card"
                  key={`${testimonial.name}-${testimonialIndex}-${index}`}
                >
                  <p>"{testimonial.quote}"</p>
                  <footer>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                    <span>{((testimonialIndex + index) % testimonials.length) + 1}/ 4</span>
                  </footer>
                </article>
              ))}
            </div>
            <div className="carousel-controls !justify-end">
              <button
                type="button"
                onClick={() => changeTestimonial(-1)}
                aria-label="Previous testimonials"
              >
                <img src={icons.arrowLeft} alt="" width="24" height="24" />
              </button>
              <button
                type="button"
                onClick={() => changeTestimonial(1)}
                aria-label="Next testimonials"
              >
                <img src={icons.arrowRight} alt="" width="24" height="24" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="contact">
        <SectionTitle icon={icons.rocket}>Lets Get Started !</SectionTitle>
        <div
          className="contact-layout contact-layout-desktop-aligned reveal"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px 64px',
            rowGap: '24px',
          }}
        >
          <div className="intro-column" style={{ width: '410px' }}>
            <h3 className="contact-heading" style={{ width: '100%', whiteSpace: 'nowrap' }}>
              Have a project in mind?
              <span>Let's talk.</span>
            </h3>
            <Button href={projectInquiryURL}>Start a project</Button>
          </div>
          <iframe
            className="calendar-preview"
            src="https://cal.com/himanshux/30min?embed=true&layout=month_view"
            title="Book a 30 minute meeting with Himanshu"
            loading="lazy"
            style={{ width: '100%' }}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

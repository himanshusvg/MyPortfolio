"use client"

import { useRouter } from "next/navigation"

const assets = "/assets"

const description =
  "Worked with clients and startups to design web and mobile experiences focused on usability, structure, and clarity. My work included user flows, wireframes, UI design, interactive prototypes, and design systems across different digital products. I collaborated with clients to turn ideas into usable interfaces while balancing user needs and business goals."

const experience = [
  {
    title: "Freelance Product Designer",
    organization: "Remote",
    dates: "April 2023 - Present",
    image: "0f835.png",
    featured: true,
  },
  {
    title: "Figma Community Lead",
    organization: "Friends of Figma, Design for Social Impact",
    dates: "October 2026 - Present",
    image: "7c811.png",
  },
  {
    title: "Founder",
    organization: "Outline Studio",
    dates: "August 2026 - Present",
    image: "3fb80.png",
  },
  {
    title: "Product Design Intern",
    organization: "Pamprazzi",
    dates: "Nov 2024 - May 2025",
    image: "00dc0.png",
  },
]

const skills = [
  "Product design",
  "User Flow",
  "Visual Design",
  "User Research",
  "Wireframing",
  "Prototyping",
  "Responsive Design",
  "Design Systems",
  "Collaboration",
  "Usability Testing",
  "Interaction Design",
  "Information architecture",
  "AI Workflow Integration",
  "Prompt Engineering",
  "Webflow Development",
  "Framer Development",
]

function ResumeEntry({
  title,
  organization,
  dates,
  image,
  featured = false,
  last = false,
}: {
  title: string
  organization: string
  dates: string
  image: string
  featured?: boolean
  last?: boolean
}) {
  return (
    <article className={`resume-entry ${last ? "resume-entry-last" : ""}`}>
      <img className="resume-entry-logo" src={`${assets}/${image}`} alt="" />
      <div className="resume-entry-copy">
        <div>
          <h3 className={featured ? "featured" : ""}>{title}</h3>
          <div className="resume-meta">
            <span>{organization}</span>
            <i />
            <span>{dates}</span>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default function ResumePage() {
  const router = useRouter()

  return (
    <main className="resume-page">
      <header className="site-header resume-header">
        <button
          className="logo logo-button"
          type="button"
          onClick={() => router.push("/")}
          aria-label="Himanshu home"
        >
          himanshu.
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => router.push("/")}>
            Projects
          </button>
          <button type="button" onClick={() => router.push("/experiments")}>
            Experiments
          </button>
          <button type="button" onClick={() => router.push("/about")}>
            About Me
          </button>
          <button className="active" type="button">
            Resume
          </button>
        </nav>
        <a
          className="button resume-download"
          href="/resume/Himanshu-Ranjan-Raj-Resume.pdf"
          download="Himanshu-Ranjan-Raj-Resume.pdf"
          aria-label="Download Himanshu Ranjan Raj's resume PDF"
        >
          <span>Download Resume</span>
          <img
            src={`${assets}/243ba.svg`}
            alt=""
            width="20"
            height="20"
          />
        </a>
      </header>

      <section className="resume-intro">
        <div className="resume-profile">
          <div className="resume-avatar">
            <img
              src={`${assets}/resume-avatar.png`}
              alt="Himanshu Ranjan Raj"
            />
          </div>
          <div>
            <h1>Himanshu Ranjan Raj</h1>
            <p>
              Product &amp; web designer focused on clean systems, smooth
              interactions, and meaningful details.
            </p>
          </div>
        </div>
        <div className="resume-actions">
          <div>
            <button className="button" type="button">
              Start A Project
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => router.push("/#contact")}
            >
              Schedule A Meeting
            </button>
          </div>
          <div className="resume-socials">
            <a
              href="https://www.linkedin.com/in/himanshu-ux/"
              target="_blank"
              rel="noreferrer"
              aria-label="Himanshu on LinkedIn"
            >
              <img src={`${assets}/e9052.svg`} alt="" width="32" height="32" />
            </a>
            <a
              href="https://medium.com/@uxhimanshu"
              target="_blank"
              rel="noreferrer"
              aria-label="Himanshu on Medium"
            >
              <img src={`${assets}/f6e5f.svg`} alt="" width="32" height="32" />
            </a>
          </div>
        </div>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        <div className="resume-entry-list">
          {experience.map((entry, index) => (
            <ResumeEntry
              {...entry}
              last={index === experience.length - 1}
              key={entry.title}
            />
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <ResumeEntry
          title="Netaji Subhash Engineering College"
          organization="B.Tech in Computer Science and Business Systems"
          dates="Sept 2022 - Jul 2026"
          image="6404f.png"
          last
        />
      </section>

      <section className="resume-section resume-skills-section">
        <h2>Skills</h2>
        <div className="resume-skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <footer className="footer resume-footer">
        <button
          className="logo footer-logo logo-button"
          type="button"
          onClick={() => router.push("/")}
        >
          himanshu.
        </button>
        <div className="footer-links">
          <div>
            <strong>Navigate</strong>
            <button type="button" onClick={() => router.push("/")}>
              Projects
            </button>
            <button type="button" onClick={() => router.push("/experiments")}>
              Experiments
            </button>
            <button type="button" onClick={() => router.push("/about")}>
              About Me
            </button>
            <button type="button" onClick={() => router.push("/resume")}>
              Resume
            </button>
          </div>
          <div>
            <strong>Connect</strong>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              X (Twitter)
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div>
            <strong>Based in</strong>
            <span>AMS &nbsp; 3:52 PM</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { MobileMenu } from "./MobileMenu"
import { SiteFooter } from "./SiteFooter"
import { projectInquiryURL } from "./homeData"

const assets = "/assets"

const defaultDescription =
  "Worked with clients and startups to design web and mobile experiences focused on usability, structure, and clarity. My work included user flows, wireframes, UI design, interactive prototypes, and design systems across different digital products. I collaborated with clients to turn ideas into usable interfaces while balancing user needs and business goals."

const experience = [
  {
    title: "Freelance Product Designer",
    organization: "Remote",
    dates: "April 2023 - Present",
    image: "0f835.png",
    description:
      "Worked with startups and clients to design intuitive digital products across SaaS platforms, websites, and mobile applications. Led projects from wireframing and user flows to high-fidelity UI, interactive prototyping, and responsive implementation. Focused on translating business requirements into clear, user-centered experiences that balance usability with visual quality.",
    featured: true,
  },
  {
    title: "Figma Community Lead",
    organization: "Friends of Figma, Design for Social Impact",
    dates: "October 2026 - Present",
    image: "7c811.png",
    description:
      "Contribute to the design community by fostering collaboration, knowledge sharing, and engagement among designers. Support initiatives that bring designers together to explore design for social impact, exchange ideas, and learn from one another while helping create an inclusive, community-driven design environment.",
  },
  {
    title: "Founder",
    organization: "Outline Studio",
    dates: "August 2026 - Present",
    image: "3fb80.png",
    description:
      "Building a design studio focused on creating thoughtful digital experiences for startups and growing businesses. Lead the design process across UI/UX, landing pages, websites, and digital products, while managing client communication, project strategy, and delivery. Focus on combining strong visual design with business objectives to help brands communicate clearly and grow online.",
  },
  {
    title: "Product Design Intern",
    organization: "Pamprazzi",
    dates: "Nov 2024 - May 2025",
    image: "00dc0.png",
    description:
      "Contributed to product design initiatives by translating requirements into user flows, wireframes, and high-fidelity interfaces. Worked in Figma to explore design solutions, develop prototypes, and refine user experiences based on project needs. Collaborated with the team to maintain visual consistency and deliver intuitive, user-focused digital experiences.",
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
  description,
  featured = false,
  last = false,
}: {
  title: string
  organization: string
  dates: string
  image: string
  description?: string
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
        <p>{description ?? defaultDescription}</p>
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
        <MobileMenu active="resume" />
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
            <a
              className="button"
              href={projectInquiryURL}
              target="_blank"
              rel="noreferrer"
            >
              Start A Project
            </a>
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
          description="B.Tech in Computer Science and Business Systems, combining foundations in software development, business processes, and analytical problem-solving. Developed an understanding of how technology and business intersect to shape digital products and user experiences."
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

      <SiteFooter className="resume-footer" />
    </main>
  )
}

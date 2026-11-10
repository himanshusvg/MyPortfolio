"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { ExperimentItem } from "./types"

const assets = "/assets"

function ExperimentCard({ experiment }: { experiment: ExperimentItem }) {
  const content = (
    <>
      <span
        className="experiment-thumbnail"
        style={{ aspectRatio: experiment.aspectRatio }}
      >
        <Image
          src={experiment.image.url}
          alt={experiment.image.alt}
          width={experiment.image.width}
          height={experiment.image.height}
        />
      </span>
      <span className="experiment-title">{experiment.title}</span>
    </>
  )

  return experiment.projectURL ? (
    <a className="experiment-card" href={experiment.projectURL}>
      {content}
    </a>
  ) : (
    <div className="experiment-card">{content}</div>
  )
}

export default function ExperimentsPage({
  experiments,
}: {
  experiments: ExperimentItem[]
}) {
  const router = useRouter()
  const experimentColumns = (["1", "2", "3"] as const).map((column) =>
    experiments.filter((experiment) => experiment.column === column),
  )

  return (
    <main className="experiments-page">
      <header className="site-header experiments-header">
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
          <button className="active" type="button">
            Experiments
          </button>
          <button type="button" onClick={() => router.push("/about")}>
            About Me
          </button>
          <button type="button" onClick={() => router.push("/resume")}>
            Resume
          </button>
        </nav>
        <button className="button experiments-cta" type="button">
          <span>Start a project</span>
          <img
            src={`${assets}/c8e97.svg`}
            alt=""
            width="18"
            height="18"
          />
        </button>
      </header>

      <section className="experiments-gallery" aria-label="Side projects">
        {!experiments.length && (
          <p className="cms-empty-state">Experiments are being prepared.</p>
        )}
        {experimentColumns.map((column, columnIndex) => (
          <div className="experiment-column" key={columnIndex}>
            {column.map((experiment) => (
              <ExperimentCard
                experiment={experiment}
                key={experiment.title}
              />
            ))}
          </div>
        ))}
      </section>

      <footer className="footer experiments-footer">
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
              Home
            </button>
            <button type="button" onClick={() => router.push("/")}>
              Projects
            </button>
            <button type="button" onClick={() => router.push("/about")}>
              About
            </button>
            <button type="button">Contact</button>
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

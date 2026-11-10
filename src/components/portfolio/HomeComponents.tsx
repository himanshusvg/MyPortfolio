import type { ReactNode } from "react"
import Image from "next/image"
import { icons } from "./homeData"
import type { CaseStudyItem } from "./types"

export function SectionTitle({
  icon,
  children,
}: {
  icon: string
  children: ReactNode
}) {
  return (
    <div className="section-title">
      <img src={icon} alt="" width="36" height="36" />
      <h2>{children}</h2>
    </div>
  )
}

export function Button({
  children,
  secondary = false,
  wide = false,
  icon = false,
  onClick,
  gameObstacle,
}: {
  children: ReactNode
  secondary?: boolean
  wide?: boolean
  icon?: boolean
  onClick?: () => void
  gameObstacle?: string
}) {
  return (
    <button
      type="button"
      className={`button ${secondary ? "button-secondary" : ""} ${
        wide ? "button-wide" : ""
      }`}
      onClick={onClick}
      data-game-obstacle={gameObstacle}
    >
      <span>{children}</span>
      {icon && (
        <img
          src={secondary ? icons.externalOrange : icons.externalLight}
          alt=""
          width="18"
          height="18"
        />
      )}
    </button>
  )
}

export function ProjectCard({
  project,
  index,
}: {
  project: CaseStudyItem
  index: number
}) {
  const image = (
    <Image
      src={project.cover.url}
      alt={project.cover.alt}
      width={project.cover.width}
      height={project.cover.height}
    />
  )

  return (
    <article className="project-card reveal">
      <div className="project-copy">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        {project.projectURL ? (
          <a className="button" href={project.projectURL}>
            <span>View Project</span>
          </a>
        ) : (
          <Button>View Project</Button>
        )}
      </div>
      {project.projectURL ? (
        <a className="project-image" id={`project-${index}`} href={project.projectURL}>
          {image}
        </a>
      ) : (
        <div className="project-image" id={`project-${index}`}>
          {image}
        </div>
      )}
    </article>
  )
}

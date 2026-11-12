import type { ReactNode } from 'react'
import youMatterCover from '@/imports/Cover_behance_thumbnails-1.png'
import skoolinkHero from '@/imports/Hero_Cover-thumbnail-2.png'
import equalentCover from '@/imports/cs_cover_thubmnail.png'
import { assets, icons } from './homeData'

export function SectionTitle({ icon, children }: { icon: string; children: ReactNode }) {
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
  href,
}: {
  children: ReactNode
  secondary?: boolean
  wide?: boolean
  icon?: boolean
  onClick?: () => void
  gameObstacle?: string
  href?: string
}) {
  const className = `button ${secondary ? 'button-secondary' : ''} ${wide ? 'button-wide' : ''}`
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <img
          src={secondary ? icons.externalOrange : icons.externalLight}
          alt=""
          width="18"
          height="18"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
        data-game-obstacle={gameObstacle}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick} data-game-obstacle={gameObstacle}>
      {content}
    </button>
  )
}

export function ProjectCard({ index }: { index: number }) {
  const isSkoolink = index === 1
  const isYouMatter = index === 2
  const isEqualent = index === 3
  const skoolinkURL =
    'https://skoolink.notion.site/Skoolink-Designing-a-more-engaging-digital-classroom-4152bd0030618055a643cf5a0266e237'
  const youMatterURL = 'https://youmatter.notion.site/'
  const equalentURL = 'https://equalent.notion.site/'
  const projectURL = isSkoolink
    ? skoolinkURL
    : isYouMatter
      ? youMatterURL
      : isEqualent
        ? equalentURL
        : undefined
  const projectImage = (
    <img
      src={
        isSkoolink
          ? skoolinkHero.src
          : isYouMatter
            ? youMatterCover.src
            : isEqualent
              ? equalentCover.src
              : `${assets}/5cd2f.png`
      }
      alt={
        isSkoolink
          ? 'Skoolink mobile learning app'
          : isYouMatter
            ? 'YouMatter student mental health support project'
            : isEqualent
              ? 'Equalent IT services website'
              : 'Mobile app screens on a green background'
      }
    />
  )

  return (
    <article
      className={`project-card reveal ${isSkoolink ? 'project-card--skoolink' : ''} ${
        isYouMatter ? 'project-card--youmatter' : ''
      } ${isEqualent ? 'project-card--equalent' : ''}`}
    >
      <div className="project-copy">
        <div>
          <h3>
            {isSkoolink ? (
              'Skoolink — Designing a more engaging digital classroom'
            ) : isYouMatter ? (
              'YouMatter — Making mental health support more approachable for students'
            ) : isEqualent ? (
              <span className="fg-inline-bold">
                Equalent — Crafting a digital presence for IT services
              </span>
            ) : (
              'Heading'
            )}
          </h3>
          <p>
            {isSkoolink
              ? 'Skoolink is a mobile learning app that brings classroom, community and gamified challenges into one place for school students.'
              : isYouMatter
                ? 'Designing a safe, supportive space where students can express their emotions, connect with counsellors, and access mental health resources without fear of judgment.'
                : isEqualent
                  ? "Designed a professional website to showcase Equalent's services and strengthen its digital presence."
                  : 'Product & web designer focused on clean systems, smooth interactions, and meaningful details.'}
          </p>
          <div className="tags">
            <span>
              {isSkoolink
                ? 'Mobile App'
                : isYouMatter
                  ? 'Mobile app'
                  : isEqualent
                    ? 'Website'
                    : 'Tag 1'}
            </span>
            <span>
              {isSkoolink
                ? 'Client Project'
                : isYouMatter
                  ? 'Passion Project'
                  : isEqualent
                    ? 'Client Project'
                    : 'Tag 1'}
            </span>
            <span>
              {isSkoolink
                ? 'EdTech'
                : isYouMatter
                  ? 'Mental Health'
                  : isEqualent
                    ? 'IT Services'
                    : 'Tag 1'}
            </span>
          </div>
        </div>
        {projectURL ? (
          <a className="button" href={projectURL} target="_blank" rel="noreferrer">
            <span>View Project</span>
          </a>
        ) : (
          <Button>View Project</Button>
        )}
      </div>
      {projectURL ? (
        <a
          className="project-image"
          id={`project-${index}`}
          href={projectURL}
          target="_blank"
          rel="noreferrer"
          aria-label={`View the ${isSkoolink ? 'Skoolink' : isYouMatter ? 'YouMatter' : 'Equalent'} case study`}
        >
          {projectImage}
        </a>
      ) : (
        <button
          type="button"
          className="project-image"
          id={`project-${index}`}
          aria-label={`Case study ${index} — coming soon`}
        >
          {projectImage}
        </button>
      )}
    </article>
  )
}

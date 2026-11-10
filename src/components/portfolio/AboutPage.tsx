"use client"

import { useRouter } from "next/navigation"

const assets = "/assets"

const interests = [
  ["AI tools", "8f67d.png"],
  ["Matcha deserts", "454dc.png"],
  ["Minimal interfaces", "b5d23.png"],
  ["Sketching in coffee shops", "e2ef1.png"],
  ["Street photography", "32ddd.png"],
  ["Tokyo cafés", "eb64c.png"],
  ["Design systems", "e08d5.png"],
  ["Ambient music", "989eb.png"],
  ["Matcha", "8a8d3.png"],
  ["Interior design", "6f608.png"],
  ["Long walks", "ff8e8.png"],
]

const movies = [
  "16b09.png",
  "e4c23.png",
  "499f5.png",
  "ac5e9.png",
  "8ab91.png",
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="about-page">
      <header className="site-header about-header">
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
          <button className="active" type="button">
            About Me
          </button>
          <button type="button" onClick={() => router.push("/resume")}>
            Resume
          </button>
        </nav>
        <button className="button about-header-cta" type="button">
          <span>Start a project</span>
          <img
            src={`${assets}/0e5e0.svg`}
            alt=""
            width="18"
            height="18"
          />
        </button>
      </header>

      <section className="about-hero-section">
        <div className="about-hero-photo">
          <img src={`${assets}/0381f.png`} alt="Himanshu Ranjan Raj" />
          <div className="photo-pagination" aria-hidden="true">
            <span />
            <span />
            <span className="selected" />
            <span />
          </div>
        </div>
        <div className="about-hero-copy">
          <div>
            <h1>
              Hi, I am Himanshu.
              <span>
                Product Designer focused on clarity and real-world use
              </span>
            </h1>
            <div className="about-bio">
              <p>
                Hey, I’m Himanshu — a Product Designer who makes pixels behave
                and products make sense.
              </p>
              <p>
                I turn complicated problems into simple, thoughtful experiences
                for the people who actually have to use them. From websites that
                look good to products that actually work, I enjoy connecting the
                dots between design, business, and human behaviour.
              </p>
              <p>
                When I’m not moving pixels around in Figma, I’m probably
                overthinking a design decision, writing something poetic, or
                convincing myself that one more portfolio redesign is definitely
                the last one.
              </p>
              <p>
                Good design, questionable sleep schedule, endless curiosity.
                That’s pretty much me.
              </p>
            </div>
          </div>
          <button
            className="button about-joke-button"
            type="button"
            onClick={(event) => {
              const jokes = [
                "Why did the designer break up with the font? It just wasn’t their type.",
                "Why did the scarecrow win an award? Because he was outstanding in his field.",
                "What do you call a fake noodle? An impasta.",
                "Why was the computer cold? It left its Windows open.",
                "Why did the bicycle fall over? It was two-tired.",
              ]
              const trigger = event.currentTarget
              const jokeIndex = Number(trigger.dataset.jokeIndex || "0")
              trigger.dataset.jokeIndex = String(
                (jokeIndex + 1) % jokes.length,
              )

              const jokeScreen = document.createElement("div")
              const jokeText = document.createElement("p")
              const closeButton = document.createElement("button")
              const jokeTextId = "current-lame-joke"

              jokeScreen.setAttribute("role", "dialog")
              jokeScreen.setAttribute("aria-modal", "true")
              jokeScreen.setAttribute("aria-labelledby", jokeTextId)
              jokeText.id = jokeTextId
              jokeText.textContent = jokes[jokeIndex]
              closeButton.type = "button"
              closeButton.textContent = "Okay, that was terrible"

              Object.assign(jokeScreen.style, {
                position: "fixed",
                inset: "0",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
                padding: "32px",
                background: "#ffffff",
                color: "#302720",
                fontFamily: '"Geist:Medium", sans-serif',
                textAlign: "center",
                opacity: "0",
                transition: "opacity 120ms ease",
              })
              Object.assign(jokeText.style, {
                maxWidth: "900px",
                margin: "0",
                fontSize: "clamp(24px, 4vw, 48px)",
                lineHeight: "1.15",
              })
              Object.assign(closeButton.style, {
                cursor: "pointer",
                border: "0",
                borderRadius: "12px",
                padding: "13px 16px",
                background: "#d96542",
                color: "#fbf7ef",
                fontFamily: '"Geist:Medium", sans-serif',
                fontSize: "16px",
                lineHeight: "16px",
              })

              const closeJoke = () => {
                document.removeEventListener("keydown", closeOnEscape)
                jokeScreen.style.opacity = "0"
                window.setTimeout(() => {
                  jokeScreen.remove()
                  trigger.focus()
                }, 120)
              }
              const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
                if (keyboardEvent.key === "Escape") closeJoke()
              }

              closeButton.addEventListener("click", closeJoke)
              document.addEventListener("keydown", closeOnEscape)
              jokeScreen.append(jokeText, closeButton)
              document.body.appendChild(jokeScreen)
              requestAnimationFrame(() => {
                jokeScreen.style.opacity = "1"
                closeButton.focus()
              })
            }}
          >
            Click here to read a joke written by me !!!
          </button>
        </div>
      </section>

      <section className="about-content-section interests-section">
        <h2>
          What I'm into <span>right now</span>
        </h2>
        <div className="interest-list">
          {interests.map(([label, image]) => (
            <div className="interest-chip" key={label}>
              <img src={`${assets}/${image}`} alt="" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-content-section movies-section">
        <div className="about-section-heading">
          <h2>
            My All Time Fav Movies
            <span>(Yes I am a movie nerd and these may change someday)</span>
          </h2>
          <button className="button" type="button">
            Wanna see my Letterboxd ?
          </button>
        </div>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <img
              src={`${assets}/${movie}`}
              alt={`Favorite movie poster ${index + 1}`}
              key={movie}
            />
          ))}
        </div>
      </section>

      <section className="about-content-section reading-section">
        <h2>
          What I am Reading Currently?
          <span>Thanks for asking, I am reading...</span>
        </h2>
        <div className="reading-gallery">
          <div className="reading-cover">
            <img
              src={`${assets}/6df2d.png`}
              alt="Current Hindi book cover"
            />
          </div>
          <div className="reading-shelf">
            <img
              src={`${assets}/80d39.png`}
              alt="Illustrated bookshelf filled with books"
            />
          </div>
        </div>
      </section>

      <footer className="footer about-page-footer">
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
            <button type="button">About</button>
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

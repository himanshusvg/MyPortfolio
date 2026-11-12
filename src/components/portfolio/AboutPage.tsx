"use client"

import moviesInterestImage from "@/imports/download__7_.jpg"
import buildingStartupInterestImage from "@/imports/Steve_Jobs.jpg"
import poetryInterestImage from "@/imports/The_Moment_of_Writing_by_Amit_Chaudhuri.jpg"
import { useRouter } from "next/navigation"
import { MobileMenu } from "./MobileMenu"
import { SiteFooter } from "./SiteFooter"
import { projectInquiryURL } from "./homeData"

const assets = "/assets"

const interests = [
  ["AI tools", "8f67d.png"],
  ["Movies", moviesInterestImage.src],
  ["Minimal interfaces", "b5d23.png"],
  ["Poetry", poetryInterestImage.src],
  ["Street photography", "32ddd.png"],
  ["Cafés", "eb64c.png"],
  ["Design systems", "e08d5.png"],
  ["Ambient music", "989eb.png"],
  ["Building Startup", buildingStartupInterestImage.src],
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
        <a
          className="button about-header-cta"
          href={projectInquiryURL}
          target="_blank"
          rel="noreferrer"
          aria-label="Start a project"
        >
          <span>Start a project</span>
          <img
            src={`${assets}/0e5e0.svg`}
            alt=""
            width="18"
            height="18"
          />
        </a>
        <MobileMenu active="about" />
      </header>

      <section className="about-hero-section">
        <div className="about-hero-photo">
          <style>{`
            @keyframes about-photo-cycle {
              0%, 16% { opacity: 1; }
              20%, 100% { opacity: 0; }
            }

            @keyframes about-dot-cycle {
              0%, 16% { width: 21px; height: 13px; background: #fafafa; }
              20%, 100% { width: 10px; height: 10px; background: rgba(233, 233, 240, 0.5); }
            }

            .about-hero-photo > .about-carousel-image {
              position: absolute;
              inset: 0;
              opacity: 0;
              animation: about-photo-cycle 25s infinite;
            }

            .photo-pagination .about-carousel-dot {
              animation: about-dot-cycle 25s infinite;
            }

            .about-carousel-image:nth-of-type(2),
            .about-carousel-dot:nth-child(2) { animation-delay: 5s; }
            .about-carousel-image:nth-of-type(3),
            .about-carousel-dot:nth-child(3) { animation-delay: 10s; }
            .about-carousel-image:nth-of-type(4),
            .about-carousel-dot:nth-child(4) { animation-delay: 15s; }
            .about-carousel-image:nth-of-type(5),
            .about-carousel-dot:nth-child(5) { animation-delay: 20s; }

            @media (prefers-reduced-motion: reduce) {
              .about-hero-photo > .about-carousel-image,
              .photo-pagination .about-carousel-dot { animation: none; }
              .about-hero-photo > .about-carousel-image:first-of-type { opacity: 1; }
              .photo-pagination .about-carousel-dot:first-child {
                width: 21px;
                height: 13px;
                background: #fafafa;
              }
            }
          `}</style>
          <img
            className="about-carousel-image"
            src={`${assets}/0381f.png`}
            alt="Himanshu Ranjan Raj"
          />
          <img
            className="about-carousel-image"
            src={`${assets}/about-carousel-2.jpg`}
            alt="Himanshu taking a mirror selfie"
          />
          <img
            className="about-carousel-image"
            src={`${assets}/about-carousel-3.jpg`}
            alt="Himanshu standing outdoors"
          />
          <img
            className="about-carousel-image"
            src={`${assets}/about-carousel-4.jpg`}
            alt="Himanshu sitting on architectural steps"
          />
          <img
            className="about-carousel-image"
            src={`${assets}/about-carousel-5.jpg`}
            alt="Himanshu at the beach"
          />
          <div className="photo-pagination" aria-hidden="true">
            <span className="about-carousel-dot" />
            <span className="about-carousel-dot" />
            <span className="about-carousel-dot" />
            <span className="about-carousel-dot" />
            <span className="about-carousel-dot" />
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
                I'm a Product Designer who enjoys making sense of complex
                problems and turning them into simple, thoughtful experiences. I
                like exploring ideas, understanding people, and finding the
                little details that make a product feel just right.
              </p>
              <p>
                Outside of design, I'm someone with a lot of interests and
                probably too many open tabs in my head. I enjoy reading, writing
                poetry, playing chess, and getting lost in conversations about
                things I know very little about. I'm naturally curious, sometimes
                a little philosophical, and always interested in learning
                something new.
              </p>
              <p>
                I have a thing for words, whether it's a good book, a line of
                poetry, or something I've written myself. I enjoy observing
                little things, overthinking unnecessary things, and finding
                meaning in ordinary moments. I guess I'm still figuring out
                quite a few things about life, and I'm perfectly okay with that.
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
              <img src={image.startsWith("/") ? image : `${assets}/${image}`} alt="" />
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
          <a
            className="button"
            href="https://letterboxd.com/himanshuansh/"
            target="_blank"
            rel="noreferrer"
          >
            Wanna see my Letterboxd ?
          </a>
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

      <SiteFooter className="about-page-footer" />
    </main>
  )
}

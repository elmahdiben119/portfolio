'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Github, Linkedin, Mail, MapPin, Code, Database, Smartphone, Palette, ChevronRight, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDarkMode)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      })
    }

    function drawParticles() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      requestAnimationFrame(drawParticles)
    }

    drawParticles()

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [darkMode])

  const skills = {
    "Programming Languages": ["C", "C#", "Dart", "Go", "Java", "Javascript", "PHP", "Swift", "Typescript"],
    "Frontend": ["HTML5", "Vue", "JQuery", "CSS3", "Sass", "Bootstrap", "Webpack", "Babel"],
    "Backend": ["NodeJS", "Express", "MongoDB", "MySQL", "PostgreSQL", "Firebase", ".NET", "Laravel"],
    "Mobile": ["Flutter"],
    "Design": ["Figma", "Sketch", "XD"]
  }

  const categoryIcons = {
    "Programming Languages": <Code className="h-6 w-6" />,
    "Frontend": <Code className="h-6 w-6" />,
    "Backend": <Database className="h-6 w-6" />,
    "Mobile": <Smartphone className="h-6 w-6" />,
    "Design": <Palette className="h-6 w-6" />,
  }

  return (
    <div className={`flex flex-col min-h-[100dvh] ${darkMode ? 'dark' : ''}`}>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <div className="relative z-10 flex flex-col min-h-[100dvh] bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <span className="sr-only">El Mahdi Benbrahim</span>
            <span className="font-bold text-xl">EMB</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#skills">
              Skills
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
              Contact
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-in-up">
                    El Mahdi Benbrahim
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 animate-fade-in-up animation-delay-200">
                    Software Engineer | Problem Solver | Tech Enthusiast
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 animate-fade-in-up animation-delay-300">
                  <MapPin className="h-4 w-4" />
                  <span>Paris, France</span>
                </div>
                <div className="space-x-4 animate-fade-in-up animation-delay-400">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#contact"
                  >
                    Contact Me
                  </Link>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="about">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 animate-fade-in-up">About Me</h2>
              <div className="space-y-4 text-gray-500 md:text-lg dark:text-gray-400 animate-fade-in-up animation-delay-200">
                <p>
                  As a software engineer, I am curious, independent, and meticulous. My passion lies in creating fast and
                  efficient applications that provide real value to users. With over 3 years of experience working on
                  various projects, I have developed a keen sense of listening and service, allowing me to understand
                  clients needs and provide tailored solutions.
                </p>
                <p>
                  I am constantly seeking further education to enhance my technical expertise and stay at the forefront of
                  the latest technologies. My desire to constantly push boundaries drives me to embrace new challenges
                  with enthusiasm and enjoyment. My background has provided me with a solid foundation that I apply daily
                  to ensure high-quality results.
                </p>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32" id="skills">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 animate-fade-in-up">Skills</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div key={category} className={`space-y-4 animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                    <h3 className="text-xl font-semibold flex items-center space-x-2">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                      <span>{category}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium transition-transform hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="contact">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 animate-fade-in-up">Contact Me</h2>
              <form className="max-w-md mx-auto space-y-4 animate-fade-in-up animation-delay-200">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" placeholder="Enter your email" required type="email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Message</label>
                  <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" required />
                </div>
                <Button type="submit" className="w-full group">
                  Send Message
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 El Mahdi Benbrahim. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/elmahdiben119">
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="https://www.linkedin.com/in/benbrahimelmahdi/">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="mailto:benbrahim.elmahdi@gmail.com">
              <span className="sr-only">Email</span>
              <Mail className="h-4 w-4" />
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  )
}

const keyframes = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const styles = `
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  .animation-delay-400 {
    animation-delay: 400ms;
  }
`

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = keyframes + styles
  document.head.appendChild(styleElement)
}
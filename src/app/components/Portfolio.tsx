'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Github, MousePointer, UserCircle2, Linkedin, Mail, Code, Database, Smartphone, Palette, ChevronRight, Moon, Sun, X, Menu, Download, ArrowUp, Phone, ExternalLink, Quote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import { useCookies } from 'react-cookie'
import { motion } from 'framer-motion'
import CalendlyBadgeWidget from "./ui/CalendlyBadgeWidget"

export default function Portfolio() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [formStatus, setFormStatus] = useState<string>('')
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true)
  const [cookies, setCookie] = useCookies(['darkMode', 'cookieConsent'])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    setMounted(true)
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedDarkMode = cookies.darkMode === 'true'
    setDarkMode(savedDarkMode || prefersDarkMode)
    setShowCookieConsent(cookies.cookieConsent === undefined)
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [cookies.darkMode, cookies.cookieConsent])

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (activeIndex !== null) {
      const text = testimonials[activeIndex].text
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayTexts(prev => {
            const newTexts = [...prev]
            newTexts[activeIndex] = text.slice(0, i + 1)
            return newTexts
          })
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 50) // Adjust typing speed here

      return () => {
        clearInterval(typingInterval)
      }
    }
  }, [activeIndex])

  const handleInteraction = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index)
    } else {
      setActiveIndex(index)
    }
    setDisplayTexts(prev => {
      const newTexts = [...prev]
      newTexts[index] = ""
      return newTexts
    })
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveIndex(null)
      setDisplayTexts(testimonials.map(() => ""))
    }
  }

  const skills = {
    "Programming Languages": ["C", "C#", "Dart", "Go", "Java", "Javascript", "PHP", "Swift", "Typescript"],
    "Frontend": ["HTML5", "Vue", "React", "Tailwind", "JQuery", "CSS3", "Sass", "Bootstrap", "Webpack", "Babel"],
    "Backend": ["NodeJS", "ExpressJS", "MongoDB", "MySQL", "PostgreSQL", "Firebase", ".NET", "Laravel", "Symfony"],
    "Mobile": ["Flutter", "React Native", "Ionic"],
    "Design": ["Figma", "Sketch", "XD"]
  }

  const categoryIcons = {
    "Programming Languages": <Code className="h-6 w-6" />,
    "Frontend": <Code className="h-6 w-6" />,
    "Backend": <Database className="h-6 w-6" />,
    "Mobile": <Smartphone className="h-6 w-6" />,
    "Design": <Palette className="h-6 w-6" />,
  }

  const testimonials = [
    {
      name: "Miri Oussama",
      position: "Senior Technical Expert @CGI | Scrum, Java, Angular",
      relationship: "Worked directly with El Mahdi",
      image: "/placeholder.svg?height=100&width=100",
      text: "Having a great sense of teamwork, El Mahdi is an enthusiastic, skilled, and hard-working developer. I really enjoyed working with him."
    },
    {
      name: "SAGHOUGH Omar",
      position: "Assistant Manager Supply Chain at OCP SA",
      relationship: "Managed El Mahdi directly",
      image: "/placeholder.svg?height=100&width=100",
      text: "El Mahdi demonstrated great professionalism in all the tasks entrusted to him during his time in the procurement department."
    },
    {
      name: "Gadrouz Youssef",
      position: "Scrum Master at Davidson consulting",
      relationship: "Managed El Mahdi directly",
      image: "/placeholder.svg?height=100&width=100",
      text: "Very dedicated and efficient developer."
    }
  ]

  const [displayTexts, setDisplayTexts] = useState<string[]>(testimonials.map(() => ""))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mwpednjw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setFormStatus('Thanks for your submission!')
        form.reset()
      } else {
        setFormStatus('Oops! There was a problem submitting your form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus('Oops! There was a problem submitting your form')
    }
  }


  const handleDownloadResume = () => {
    const resumeUrl = '/files/CV_El_Mahdi_BENBRAHIM_FR.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.setAttribute('download', 'CV_El_Mahdi_BENBRAHIM_FR.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const declineCookies = () => {
    setShowCookieConsent(false)
    setCookie('cookieConsent', 'false', { path: '/', maxAge: 31536000 }) // 1 year
  }

  const acceptCookies = () => {
    setShowCookieConsent(false)
    setCookie('cookieConsent', 'true', { path: '/', maxAge: 31536000 }) // 1 year
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "El Mahdi Benbrahim",
    "jobTitle": "Software Engineer",
    "description": "Passionate software engineer specializing in web development and mobile apps",
    "image": "https://www.elmahdibenbrahim.com/profile-image.jpg",
    "url": "https://www.elmahdibenbrahim.com",
    "sameAs": [
      "https://github.com/elmahdibenbrahim",
      "https://linkedin.com/in/elmahdibenbrahim"
    ],
    "knowsAbout": Object.values(skills).flat()
  }


  useEffect(() => {
    if (hoveredIndex !== null) {
      const text = testimonials[hoveredIndex].text
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayTexts(prev => {
            const newTexts = [...prev]
            newTexts[hoveredIndex] = text.slice(0, i + 1)
            return newTexts
          })
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 50)

      return () => {
        clearInterval(typingInterval)
      }
    }
  }, [hoveredIndex])

  const projects = [
    {
      title: "LeadGuru",
      description: "LeadGuru is a platform that can help you manage all leads from various campaigns, keep track of closed/opened ones, and identify your best lead source. It's an all-in-one Platform.",
      image: "/images/projects/leadguru.png?height=200&width=300",
      link: "https://www.leadguru.ma/",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript"]
    },
    {
      "title": "Declic Center",
      "description": "Déclic Center is a business center located in Melun, offering a range of services including business domiciliation, fully-equipped office rentals, and call answering services. Positioned close to Paris, Déclic Center provides companies with a professional address and a variety of flexible options for growing their business.",
      "image": "/images/projects/decliccenter.svg",
      "link": "https://www.decliccenter.fr/",
      "technologies": ["Vue.js", "TypeScript", "Vuetify ", "SCSS"]
    }
  ]

  if (!mounted) return null

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className={`flex flex-col min-h-[100dvh] ${darkMode ? 'dark' : ''}`}>
        <canvas ref={canvasRef} className="fixed inset-0 z-0" />
        <div className="relative z-10 flex flex-col min-h-[100dvh] bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <header className="bg-transparent">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link className="flex items-center justify-center" href="#">
                <span className="sr-only">El Mahdi Benbrahim</span>
                <span className="font-mono text-lg font-bold text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                  {'</>'}
                </span>
              </Link>
              <nav className="hidden md:flex gap-6 items-center">
                <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:underline underline-offset-4">
                  About
                </button>
                <button onClick={() => scrollToSection('skills')} className="text-sm font-medium hover:underline underline-offset-4">
                  Skills
                </button>
                <button onClick={() => scrollToSection('projects')} className="text-sm font-medium hover:underline underline-offset-4">
                  Projects
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium hover:underline underline-offset-4">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:underline underline-offset-4">
                  Contact
                </button>
              </nav>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            {isMenuOpen && (
              <nav className="md:hidden bg-white dark:bg-gray-900 absolute w-full z-50 py-4">
                <div className="container mx-auto px-4 flex flex-col gap-4">
                  <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:underline underline-offset-4">
                    About
                  </button>
                  <button onClick={() => scrollToSection('skills')} className="text-sm font-medium hover:underline underline-offset-4">
                    Skills
                  </button>
                  <button onClick={() => scrollToSection('projects')} className="text-sm font-medium hover:underline underline-offset-4">
                    Projects
                  </button>
                  <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium hover:underline underline-offset-4">
                    Testimonials
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:underline underline-offset-4">
                    Contact
                  </button>
                </div>
              </nav>
            )}
          </header>
          <main className="flex-1">
            <motion.section
              className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="mb-8">
                      <Image
                        src="/images/elmahdibenbrahim.jpeg"
                        alt="El Mahdi Benbrahim"
                        width={256}
                        height={256}
                        className="rounded-full mx-auto"
                      />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      El Mahdi Benbrahim
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                      Software Engineer | Problem Solver | Tech Enthusiast
                    </p>
                  </motion.div>
                  <motion.div
                    className="space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    <Button onClick={() => scrollToSection('contact')} variant="outline" className="transition-all duration-300 ease-in-out transform hover:scale-105">
                      Contact Me
                    </Button>
                    <Button onClick={handleDownloadResume} className="bg-primary text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105">
                      Download Resume <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="about">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 animate-fade-in-up">About Me</h2>
                <div className="space-y-4 text-gray-500 md:text-lg dark:text-gray-400 animate-fade-in-up animation-delay-200">
                  <p>
                    As a software engineer, I am curious, independent, and meticulous. My passion lies in creating fast and
                    efficient applications that provide real value to users. With over 4 years of experience working on
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
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="projects">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Projects</h2>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                      <div className="relative h-48 w-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          objectFit="contain"
                          className="transition-transform duration-300 transform hover:scale-105 p-6"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-sm rounded-full text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-200"
                        >
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="testimonials">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Testimonials</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`bg-white dark:bg-gray-700 rounded-lg p-6 transition-all duration-300 ease-in-out ${activeIndex === index ? 'shadow-xl -translate-y-1' : 'shadow'
                        }`}
                      onMouseEnter={() => !isMobile && handleInteraction(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => isMobile && handleInteraction(index)}
                      tabIndex={0}
                      role="button"
                      aria-expanded={activeIndex === index}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleInteraction(index)
                        }
                      }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <UserCircle2 className="h-12 w-12 text-gray-400" />
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.relationship}</p>
                      <Quote className="h-6 w-6 text-gray-400 mb-2" />
                      <div className="relative h-24 overflow-hidden">
                        {activeIndex !== index && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                            <MousePointer className="h-5 w-5 mr-2" />
                            <span>{isMobile ? "Tap to read" : "Hover to read"}</span>
                          </div>
                        )}
                        <p
                          className="text-gray-800 dark:text-gray-200 absolute inset-0"
                          aria-live="polite"
                        >
                          {displayTexts[index]}
                          {activeIndex === index && (
                            <span className="inline-block w-0.5 h-5 bg-current animate-blink ml-0.5"></span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.7s step-end infinite;
        }
      `}</style>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="contact">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 animate-fade-in-up">Contact Me</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 animate-fade-in-up animation-delay-200">
                  <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" name="email" placeholder="Enter your email" required type="email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message">Message</label>
                    <Textarea className="min-h-[100px]" id="message" name="message" placeholder="Enter your message" required />
                  </div>
                  <Button type="submit" className="w-full group">
                    Send Message
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  {formStatus && (
                    <p className={`text-center ${formStatus.includes('Oops') ? 'text-red-500' : 'text-green-500'}`}>
                      {formStatus}
                    </p>
                  )}
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
              <Link className="text-xs hover:underline underline-offset-4" href="tel:+33769242104">
                <span className="sr-only">Phone</span>
                <Phone className="h-4 w-4" />
              </Link>
            </nav>
          </footer>
        </div>
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 p-2 z-50 left-0 right-0 w-10 mx-auto bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
        {showCookieConsent && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 dark:bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 sm:mb-0">
                This website uses cookies to enhance the user experience.
              </p>
              <div className="flex space-x-4">
                <Button onClick={acceptCookies} className="bg-primary text-primary-foreground">
                  Accept
                </Button>
                <Button onClick={declineCookies} variant="outline">
                  Decline
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* <CalendlyBadgeWidget /> */}
      </div >
    </>
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
  .flip-card {
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
`

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = keyframes + styles
  document.head.appendChild(styleElement)
}
'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Mail, Menu, Volume2, VolumeX, X } from 'lucide-react'
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi'
import { projects, services } from '@/data/projects'

const FlamingoCanvas = dynamic(() => import('./three/FlamingoCanvas'), { ssr: false, loading: () => <div className="scene-loader">Warming up the sky…</div> })

const socials = [
  { label: 'GitHub', href: 'https://github.com/dibamackie', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dibamakki', icon: Linkedin },
  { label: 'Email', href: 'mailto:diba.mak@gmail.com', icon: Mail },
]

export default function Portfolio() {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let cleanup
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
        const gsap = gsapModule.default
        const ScrollTrigger = triggerModule.ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
          gsap.from('.hero-kicker, .hero-title span, .hero-copy, .hero-actions', { y: 42, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', delay: .25 })
          gsap.utils.toArray('[data-reveal]').forEach((el) => gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 86%' }, y: 65, opacity: 0, duration: .9, ease: 'power3.out' }))
          gsap.timeline({ scrollTrigger: { trigger: '.service-list', start: 'top 80%' } })
            .from('.service-line', { scaleX: 0, duration: .9, stagger: .08, ease: 'power3.inOut' })
            .from('.service-list li', { y: 28, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out' }, '<.15')
          gsap.utils.toArray('.project-card').forEach((card) => gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 82%' }, y: 80, opacity: 0, rotate: 1.5, duration: 1, ease: 'power3.out' }))
        }, root)
        cleanup = () => ctx.revert()
      })
    }
    return () => cleanup?.()
  }, [])

  return (
    <main ref={root}>
      <a className="skip-link" href="#projects">Skip to projects</a>
      <header className="nav-shell">
        <a className="wordmark" href="#home" aria-label="Diba Makki, home">DIBA<span>®</span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          {['Projects', 'Services', 'About', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <a className="availability" href="#contact"><i /> Available for ideas</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-scene" aria-hidden="true"><FlamingoCanvas /></div>
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-content">
          <p className="hero-kicker"><span>Apps · Automations · Websites</span><span>Toronto · Canada</span></p>
          <h1 className="hero-title"><span>I’m Diba.</span><span>I build apps, tools,</span><span>and <em>games</em>.</span></h1>
          <div className="hero-bottom">
            <p className="hero-copy">Full stack developer working across web apps, browser extensions, backend services, and games.</p>
            <div className="hero-actions"><a className="button button-dark" href="#projects">View my projects <ArrowDown size={17} /></a></div>
          </div>
        </div>
        <FlightSound />
        <div className="scroll-note">Scroll to explore <span /></div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-heading" data-reveal><div className="section-label"><span>01</span> Selected work</div><h2>Things I’ve<br/><em>built.</em></h2><p>Web apps, a browser extension, a machine learning tool, a backend service, and a game in progress.</p></div>
        <div className="project-list">
          {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
        </div>
      </section>

      <section className="skills section" id="services">
        <div className="services-intro" data-reveal><div className="section-label light"><span>02</span> Services</div><h2>How I can<br/><em>help.</em></h2></div>
        <ol className="service-list">{services.map((service, i) => <li key={service.title}><i className="service-line" aria-hidden="true" /><span className="service-num">{String(i + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.description}</p></li>)}</ol>
        <p className="skills-note">Not sure which one you need? <a href="#contact">Tell me about the project <ArrowUpRight size={13} /></a></p>
      </section>

      <section className="about section" id="about">
        <div className="about-portrait" data-reveal><Image src="/profile.jpg" alt="Diba Makki" width={900} height={1125}/><div className="portrait-stamp">Toronto<br/>based</div></div>
        <div className="about-copy" data-reveal><div className="section-label"><span>03</span> About</div><h2>From business<br/>to <em>code.</em></h2><p>I’m a full stack developer with a background in business. I like taking an idea from a rough sketch to something that works, whether that’s a web app, a tool that saves people time, or a game.</p><p>That background shapes how I work: I start with who the project is for and what it needs to do, then build it end to end.</p></div>
      </section>

      <Contact />
      <footer><a className="wordmark footer-mark" href="#home">DIBA<span>®</span></a><p>Designed & built with curiosity<br/>© {new Date().getFullYear()} Diba Makki</p><div>{socials.map(({label,href}) => <a key={label} href={href}>{label}</a>)}</div></footer>
    </main>
  )
}

function FlightSound() {
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    if (audioRef.current) {
      audioRef.current.source.stop()
      audioRef.current.context.close()
      audioRef.current = null
    }
  }, [])

  function stopSound() {
    clearTimeout(timerRef.current)
    if (audioRef.current) {
      audioRef.current.source.stop()
      audioRef.current.context.close()
      audioRef.current = null
    }
    setPlaying(false)
  }

  function startSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const context = new AudioContext()
    const duration = 10
    const wingbeatDuration = 1.35
    const sampleRate = context.sampleRate
    const buffer = context.createBuffer(1, duration * sampleRate, sampleRate)
    const channel = buffer.getChannelData(0)

    for (let i = 0; i < channel.length; i += 1) {
      const time = i / sampleRate
      const beat = time % wingbeatDuration
      const downstroke = Math.exp(-Math.pow((beat - wingbeatDuration * .13) / (wingbeatDuration * .12), 2))
      const upstroke = .32 * Math.exp(-Math.pow((beat - wingbeatDuration * .61) / (wingbeatDuration * .16), 2))
      const fade = Math.min(time / .25, (duration - time) / .6, 1)
      channel[i] = (Math.random() * 2 - 1) * (downstroke + upstroke) * .36 * Math.max(0, fade)
    }

    const source = context.createBufferSource()
    const lowpass = context.createBiquadFilter()
    const gain = context.createGain()
    source.buffer = buffer
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1250, context.currentTime)
    lowpass.Q.setValueAtTime(.7, context.currentTime)
    gain.gain.setValueAtTime(.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(.22, context.currentTime + .12)
    gain.gain.setValueAtTime(.22, context.currentTime + duration - .65)
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration)
    source.connect(lowpass).connect(gain).connect(context.destination)
    source.start()
    audioRef.current = { context, source }
    setPlaying(true)
    timerRef.current = setTimeout(stopSound, duration * 1000 + 100)
  }

  function toggleSound() {
    if (playing) stopSound()
    else startSound()
  }

  return <button className={playing ? 'sound-toggle is-playing' : 'sound-toggle'} onClick={toggleSound} aria-label={playing ? 'Stop flamingo wing sound' : 'Play flamingo wing sound'} aria-pressed={playing}>
    {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    <span>{playing ? 'Flight sound on' : 'Hear it fly'}</span>
    <i><b /><b /><b /></i>
  </button>
}

function ProjectCard({ project }) {
  const gallery = project.gallery?.length ? project.gallery : null
  const [active, setActive] = useState(0)
  const [previewing, setPreviewing] = useState(false)
  const sizes = project.featured ? '(max-width: 900px) 100vw, 88vw' : '(max-width: 900px) 100vw, 44vw'
  const name = project.title || 'Untitled game'
  const video = project.video || null
  const visualRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!previewing || !gallery || gallery.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % gallery.length), 1400)
    return () => clearInterval(id)
  }, [previewing, gallery])

  // Muted video preview: plays while hovered or focused, pauses (keeping its place) when the pointer leaves.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (previewing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.play().catch(() => {})
    else el.pause()
  }, [previewing])

  // Touch screens have no hover, so there the video plays while the card is mostly on screen.
  useEffect(() => {
    if (!video || !window.matchMedia('(hover: none)').matches) return
    const observer = new IntersectionObserver(([entry]) => setPreviewing(entry.intersectionRatio >= .6), { threshold: [0, .6] })
    observer.observe(visualRef.current)
    return () => observer.disconnect()
  }, [video])

  const previewProps = gallery || video ? {
    tabIndex: 0,
    'aria-label': video ? `${name} gameplay preview` : `${name} screenshots`,
    onPointerEnter: (e) => { if (!(video && e.pointerType === 'touch')) setPreviewing(true) },
    onPointerLeave: (e) => { if (video && e.pointerType === 'touch') return; setPreviewing(false); setActive(0) },
    onFocus: () => setPreviewing(true),
    onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setPreviewing(false); setActive(0) } },
  } : {}

  return <article className={`project-card ${project.featured ? 'featured' : ''}`}>
    <div ref={visualRef} className={`project-visual ${project.color || ''} ${previewing ? 'is-previewing' : ''}`} {...previewProps}>
      {gallery ? <div className="project-gallery">
        {gallery.map((src, i) => <figure key={src} className={i === active ? 'is-active' : ''}><Image src={src} alt={`${name} screenshot ${i + 1}`} fill sizes={sizes}/></figure>)}
        <div className="gallery-dots">{gallery.map((src, i) => <button key={src} type="button" className={i === active ? 'is-active' : ''} onClick={() => setActive(i)} aria-label={`Show screenshot ${i + 1}`}/>)}</div>
        <span className="gallery-hint">{gallery.length} screenshots</span>
      </div> : video ? <div className="project-video">
        {project.image && <Image src={project.image} alt={project.imageAlt || `${name} preview`} fill sizes={sizes}/>}
        <video ref={videoRef} src={video} poster={project.image || undefined} muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1}/>
        <span className="gallery-hint video-hint">Hover to play</span>
      </div> : project.image ? <Image src={project.image} alt={project.imageAlt || `${name} project preview`} fill sizes={sizes}/> : <AbstractVisual label={project.visualLabel}/>}
      <span className="project-number">{project.number}</span>
      <span className="project-pill">{project.eyebrow}</span>
    </div>
    <div className="project-info"><div className="project-heading">{project.title && <h3>{project.title}</h3>}{project.status && <span className="project-status"><i/>{project.status}</span>}</div><p>{project.description}</p>{project.stack.length > 0 && <div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>}<div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">{project.liveLabel || 'Live project'} <ArrowUpRight/></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <Github/></a>}</div></div>
  </article>
}

function AbstractVisual({ label }) { return <div className="abstract-art"><div/><div/><span>{label || '{ }'}</span></div> }

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  async function submit(e) { e.preventDefault(); setStatus('loading'); try { const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) }); if (!res.ok) throw new Error(); setStatus('success'); setForm({name:'',email:'',message:''}) } catch { setStatus('error') } }
  return <section className="contact section" id="contact"><div data-reveal><div className="section-label light"><span>04</span> Say hello</div><h2>Have a spark<br/>of an <em>idea?</em></h2><p>A role, a project, or a question: I’d like to hear about it.</p><div className="social-row">{socials.map(({label,href,icon:Icon}) => <a href={href} key={label} aria-label={label}><Icon/></a>)}</div></div><form onSubmit={submit} data-reveal><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@somewhere.com"/></label><label>Tell me a little about it<textarea required rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="A project, an idea, a hello…"/></label><button className="button button-pink" disabled={status==='loading'}>{status==='loading'?'Sending…':'Send it my way'} <ArrowUpRight size={17}/></button>{status==='success'&&<p className="form-note">Message sent. I’ll be in touch soon ✦</p>}{status==='error'&&<p className="form-note">That didn’t fly. Email me directly instead.</p>}</form></section>
}

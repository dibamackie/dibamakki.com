'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Mail, Menu, Volume2, VolumeX, X } from 'lucide-react'
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi'
import { projects, skills } from '@/data/projects'

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
          {['Story', 'Projects', 'About', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <a className="availability" href="#contact"><i /> Available for ideas</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-scene" aria-hidden="true"><FlamingoCanvas /></div>
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-content">
          <p className="hero-kicker"><span>Creative developer</span><span>Toronto · Canada</span></p>
          <h1 className="hero-title"><span>Hi, I’m Diba —</span><span>I build <em>playful</em></span><span>digital experiences.</span></h1>
          <div className="hero-bottom">
            <p className="hero-copy">I mix code, motion, and a little theatrical timing to make interfaces people remember.</p>
            <div className="hero-actions"><a className="button button-dark" href="#projects">View my projects <ArrowDown size={17} /></a><a className="text-link" href="/resume.pdf">Résumé <ArrowUpRight size={15} /></a></div>
          </div>
        </div>
        <FlightSound />
        <div className="scroll-note">Scroll to explore <span /></div>
      </section>

      <section className="story section" id="story">
        <div className="section-label"><span>01</span> The story</div>
        <div className="story-grid">
          <p data-reveal className="story-lead">The web can do more than sit still.</p>
          <div data-reveal className="story-copy"><p>I create responsive digital worlds where brand, interaction, and engineering move as one.</p><p>Every build starts with a human feeling—curiosity, delight, ease—and ends with clean, dependable code.</p></div>
        </div>
        <DraggableMarquee />
      </section>

      <section className="projects section" id="projects">
        <div className="section-heading" data-reveal><div className="section-label"><span>02</span> Selected work</div><h2>Projects with<br/><em>personality.</em></h2><p>Big ideas, made tangible. Open one up and have a wander.</p></div>
        <div className="project-list">
          {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
        </div>
      </section>

      <section className="skills section" id="skills">
        <div data-reveal><div className="section-label light"><span>03</span> Toolkit</div><h2>Tools I use to<br/>make ideas <em>move.</em></h2></div>
        <div className="skill-cloud" data-reveal>{skills.map((skill, i) => <span key={skill} style={{ '--i': i }}>{skill}</span>)}</div>
        <p className="skills-note">Business-aware thinking · Creative problem-solving · Production-minded builds</p>
      </section>

      <section className="about section" id="about">
        <div className="about-portrait" data-reveal><Image src="/profile.jpg" alt="Diba Makki" width={900} height={1125}/><div className="portrait-stamp">curious<br/>by nature</div></div>
        <div className="about-copy" data-reveal><div className="section-label"><span>04</span> About Diba</div><h2>Logic in one hand.<br/><em>Imagination</em> in the other.</h2><p>I’m a creative frontend developer who combines business knowledge, visual storytelling, and technical craft. I like translating ambitious ideas into experiences that feel intuitive, warm, and just unexpected enough.</p><p>When I’m not nudging pixels or animating a flamingo, I’m usually learning a new tool or finding a better question to ask.</p><a className="button button-outline" href="/resume.pdf">Read my résumé <ArrowUpRight size={17}/></a></div>
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

function DraggableMarquee() {
  const marqueeRef = useRef(null)
  const dragRef = useRef({ dragging: false, startX: 0, startOffset: 0 })
  const [offset, setOffset] = useState(0)
  const words = ['IDEA', 'DESIGN', 'MOTION', 'CODE']

  function wrapOffset(nextOffset) {
    const marquee = marqueeRef.current
    const group = marquee?.firstElementChild
    if (!group) return nextOffset

    const gap = parseFloat(getComputedStyle(marquee).columnGap) || 0
    const loopWidth = group.getBoundingClientRect().width + gap
    if (!loopWidth) return nextOffset

    let wrappedOffset = nextOffset
    while (wrappedOffset <= -loopWidth) wrappedOffset += loopWidth
    while (wrappedOffset > 0) wrappedOffset -= loopWidth
    return wrappedOffset
  }

  function startDrag(e) {
    dragRef.current = { dragging: true, startX: e.clientX, startOffset: offset }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function drag(e) {
    if (!dragRef.current.dragging) return
    const nextOffset = dragRef.current.startOffset + e.clientX - dragRef.current.startX
    setOffset(wrapOffset(nextOffset))
  }

  function stopDrag(e) {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function moveWithKeys(e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    setOffset((currentOffset) => wrapOffset(currentOffset + (e.key === 'ArrowRight' ? 32 : -32)))
  }

  return (
    <div
      ref={marqueeRef}
      className="marquee"
      style={{ '--drag-x': `${offset}px` }}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onKeyDown={moveWithKeys}
      role="slider"
      aria-label="Drag design, motion, and code words"
      aria-valuemin={-100}
      aria-valuemax={100}
      aria-valuenow={Math.round(offset)}
      tabIndex={0}
    >
      {Array.from({ length: 5 }).map((_, groupIndex) => (
        <span className="marquee-group" aria-hidden={groupIndex > 0} key={groupIndex}>
          {words.map((word) => (
            <span className="marquee-word" key={`${groupIndex}-${word}`}>{word}</span>
          ))}
        </span>
      ))}
    </div>
  )
}

function ProjectCard({ project }) {
  return <article className={`project-card ${project.featured ? 'featured' : ''}`}>
    <div className={`project-visual ${project.color || ''}`}>
      {project.image ? <Image src={project.image} alt="Colorful berry pastries in a cinematic studio scene" fill sizes="(max-width: 900px) 100vw, 88vw"/> : <AbstractVisual number={project.number}/>} 
      <span className="project-number">{project.number}</span>
      <span className="project-pill">{project.eyebrow}</span>
    </div>
    <div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight/></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <Github/></a>}</div></div>
  </article>
}

function AbstractVisual({ number }) { return <div className="abstract-art"><div/><div/><span>{number === '02' ? 'Connect' : number === '03' ? 'Care' : '{ }'}</span></div> }

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  async function submit(e) { e.preventDefault(); setStatus('loading'); try { const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) }); if (!res.ok) throw new Error(); setStatus('success'); setForm({name:'',email:'',message:''}) } catch { setStatus('error') } }
  return <section className="contact section" id="contact"><div data-reveal><div className="section-label light"><span>05</span> Say hello</div><h2>Have a spark<br/>of an <em>idea?</em></h2><p>Let’s turn it into something people want to spend time with.</p><div className="social-row">{socials.map(({label,href,icon:Icon}) => <a href={href} key={label} aria-label={label}><Icon/></a>)}</div></div><form onSubmit={submit} data-reveal><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@somewhere.com"/></label><label>Tell me a little about it<textarea required rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="A project, an idea, a hello…"/></label><button className="button button-pink" disabled={status==='loading'}>{status==='loading'?'Sending…':'Send it my way'} <ArrowUpRight size={17}/></button>{status==='success'&&<p className="form-note">Message sent. I’ll be in touch soon ✦</p>}{status==='error'&&<p className="form-note">That didn’t fly. Email me directly instead.</p>}</form></section>
}

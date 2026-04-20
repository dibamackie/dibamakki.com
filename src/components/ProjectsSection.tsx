'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projectCategories = [
  {
    category: 'Web Apps',
    projects: [
      {
        title: 'HeartByte — Campus Health Center Management Platform',
        description: 'Group-developed web application designed to improve accessibility and usability of campus health center services for Seneca Polytechnic students and staff.',
        tags: ['React', 'Next.js', 'Tailwind', 'Node.js'],
        github: '#',
        demo: 'https://www.heartbyte.site/',
        accent: 'border-pink-500',
      },
      {
        title: 'Fragments — Cloud-Based Backend Microservice',
        description: 'Backend microservice for authenticated users to create, store, and manage data fragments using secure REST APIs, cloud storage, and containerized deployment.',
        tags: ['Node.js', 'Express', 'AWS Cognito', 'AWS S3', 'Docker', 'GitHub Actions'],
        github: '#',
        demo: '#',
        accent: 'border-lime-500',
      },
      {
        title: 'LEGO Sets Web App — Full-Stack SSR with Auth',
        description: 'Server-rendered (EJS) full-stack app for browsing LEGO sets and managing CRUD features with authentication, sessions, and login history tracking.',
        tags: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Sequelize', 'MongoDB', 'Mongoose', 'Tailwind'],
        github: '#',
        demo: 'https://web-322-lime.vercel.app/',
        accent: 'border-cyan-500',
      }
    ]
  },
  {
    category: 'Android Apps',
    projects: [
      {
        title: 'CityFix — Civic Issue Reporting App',
        description: 'Android app for reporting city issues, assigning priority levels, and tracking resolution status.',
        tags: ['Android', 'Kotlin', 'Java'],
        github: 'https://github.com/dibamackie/CityReports',
        accent: 'border-orange-500',
      },
      {
        title: 'PrintReceipt — Order & Receipt Calculation App',
        description: 'Android app that calculates photo and canvas order totals based on size, quantity, tax, and optional delivery fees.',
        tags: ['Android', 'Kotlin', 'Java'],
        github: 'https://github.com/dibamackie/PrintReceipt',
        accent: 'border-yellow-500',
      },
      {
        title: 'PackageTracker — Delivery Tracking App with Maps',
        description: 'Android app for managing and tracking package deliveries with status updates and Google Maps location visualization.',
        tags: ['Android', 'Kotlin', 'Java', 'Google Maps API'],
        github: 'https://github.com/dibamackie/PackageTracker',
        accent: 'border-blue-500',
      }
    ]
  },
  {
    category: 'Java',
    projects: [
      {
        title: 'StaySync — Hotel Reservation Management System',
        description: 'Java-based hotel reservation system with Admin and Guest interfaces, managing booking, check-in/out, payments, and reporting using synchronized SQL and MongoDB databases.',
        tags: ['Java', 'SQL', 'MongoDB', 'OOP'],
        github: 'https://github.com/dibamackie/HotelReservation/tree/main',
        accent: 'border-purple-500',
      },
      {
        title: 'Auto Loan Calculator — JavaFX Desktop Application',
        description: 'JavaFX desktop application that calculates auto loan payments, manages saved rates, and generates detailed amortization schedules through an interactive GUI.',
        tags: ['Java', 'JavaFX', 'OOP', 'MVC'],
        github: 'https://github.com/dibamackie/LoanApplication',
        accent: 'border-indigo-500',
      }
    ]
  },
  {
    category: 'Python',
    projects: [
      {
        title: 'Strategy Game Engine with Hash Tables and AI',
        description: 'Python-based game engine featuring a custom hash table, game tree evaluation, and a Minimax-driven AI opponent.',
        tags: ['Python', 'Hash Tables', 'Game Trees', 'Minimax'],
        github: 'https://github.com/dibamackie/Python-game',
        accent: 'border-rose-500',
      }
    ]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 sm:px-12 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-4xl sm:text-6xl font-black uppercase text-zinc-100 mb-16 tracking-tight"
        >
          Featured <span className="text-zinc-500 stroke-zinc-100">Builds.</span>
        </motion.h2>

        <div className="space-y-24">
          {projectCategories.map((categoryGroup, index) => (
            <div key={categoryGroup.category}>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="font-display text-3xl sm:text-4xl font-bold uppercase text-lime-400 mb-10 pb-4 border-b-2 border-zinc-800"
              >
                {categoryGroup.category}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryGroup.projects.map((project, pIndex) => (
                  <ProjectCard key={project.title} project={project} index={pIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative bg-zinc-950 border-2 ${project.accent} p-6 flex flex-col h-full punk-shadow hover:punk-shadow-hover transition-all duration-300`}
    >
      <h4 className="font-display text-xl font-bold uppercase text-zinc-100 mb-4 tracking-tight">{project.title}</h4>
      <p className="text-zinc-400 mb-8 flex-grow text-sm sm:text-base">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-xs font-bold uppercase px-2 py-1 bg-zinc-800 text-zinc-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-auto border-t border-zinc-800 pt-4">
        {project.github && project.github !== '#' && (
          <a href={project.github} className="text-zinc-500 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm font-bold uppercase">
            <FiGithub size={18} /> Code
          </a>
        )}
        {project.demo && project.demo !== '#' && (
          <a href={project.demo} className="text-zinc-500 hover:text-pink-400 transition-colors flex items-center gap-2 text-sm font-bold uppercase">
            <FiExternalLink size={18} /> Live
          </a>
        )}
      </div>
    </motion.div>
  );
}

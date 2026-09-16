import { useEffect, useState } from 'react'
import { ArrowRight, CheckSquare2, FolderKanban, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusPill } from '../components/StatusPill'
import { assignments, projects, tasks } from '../data/mock'

const heroFallback =
  'linear-gradient(90deg, rgba(18, 73, 176, 0.92), rgba(26, 126, 255, 0.48))'

export function Home() {
  const [heroBackground, setHeroBackground] = useState(heroFallback)

  useEffect(() => {
    let active = true

    fetch('/palacio-rio-madeira.webp')
      .then((response) => response.text())
      .then((base64Image) => {
        if (!active) return

        setHeroBackground(
          `linear-gradient(90deg, rgba(18, 73, 176, 0.84), rgba(26, 126, 255, 0.34)), url("data:image/webp;base64,${base64Image.trim()}")`,
        )
      })
      .catch(() => {
        if (!active) return
        setHeroBackground(heroFallback)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <div className="home-hero">
        <div>
          <p>Olá, Anderson 👋</p>
          <h1>Aqui é onde os projetos ganham vida.</h1>
          <span>
            Acompanhe o essencial e avance para os detalhes apenas quando precisar.
          </span>
        </div>

        <div
          className="hero-image"
          style={{ backgroundImage: heroBackground }}
        >
          <div>Projetos conectam pessoas, decisões e resultados.</div>
        </div>
      </div>

      <div className="home-grid">
        <section className="panel panel-wide">
          <div className="panel-head">
            <h2>Últimas Movimentações</h2>
            <span>Somente o que mudou recentemente.</span>
          </div>

          <div className="movement-list">
            {projects.slice(0, 2).map((project, index) => (
              <div className="movement-row" key={project.id}>
                <div className="movement-icon">
                  <FolderKanban size={18} />
                </div>

                <div>
                  <strong>{project.title}</strong>
                  <small>
                    Status alterado para {project.status.toLowerCase()}
                  </small>
                </div>

                <StatusPill>{project.status}</StatusPill>
                <time>{index ? 'há 4 horas' : 'há 2 horas'}</time>
              </div>
            ))}

            <div className="movement-row">
              <div className="movement-icon">
                <CheckSquare2 size={18} />
              </div>

              <div>
                <strong>{tasks[0].title}</strong>
                <small>Nova atualização registrada na tarefa.</small>
              </div>

              <StatusPill>{tasks[0].status}</StatusPill>
              <time>há 1 dia</time>
            </div>

            <div className="movement-row">
              <div className="movement-icon">
                <Link2 size={18} />
              </div>

              <div>
                <strong>{assignments[0].title}</strong>
                <small>Atribuição vinculada ao seu trabalho.</small>
              </div>

              <StatusPill>{assignments[0].status}</StatusPill>
              <time>há 1 dia</time>
            </div>
          </div>
        </section>

        <section className="panel compact-panel">
          <div className="panel-head inline">
            <h2>Minhas Tarefas</h2>
            <Link to="/tarefas">
              Ver todas <ArrowRight size={15} />
            </Link>
          </div>

          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="simple-row">
              <span className="check-dot" />
              <div>
                <strong>{task.title}</strong>
                <small>{task.date}</small>
              </div>
            </div>
          ))}
        </section>

        <section className="panel compact-panel">
          <div className="panel-head inline">
            <h2>Meus Projetos</h2>
            <Link to="/projetos">
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>

          {projects.slice(0, 2).map((project) => (
            <div key={project.id} className="simple-project">
              <img src={project.image} alt="" />

              <div>
                <strong>{project.title}</strong>
                <small>{project.subtitle}</small>
                <div className="progress">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

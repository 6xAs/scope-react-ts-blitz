import { useEffect, useState } from 'react'
import { AlertCircle, ArrowRight, CheckSquare2, FileText, FolderKanban, LifeBuoy, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusPill } from '../components/StatusPill'
import { projects, tasks } from '../data/mock'
import { getUnifiedWorkItems, sourceLabel } from '../integrations'
import type { WorkItem } from '../integrations/types'
import '../interoperability.css'

const heroFallback =
  'linear-gradient(90deg, rgba(18, 73, 176, 0.92), rgba(26, 126, 255, 0.48))'

function SourceIcon({ item }: { item: WorkItem }) {
  if (item.source === 'SEI') return <FileText size={18} />
  if (item.source === 'GLPI') return <LifeBuoy size={18} />
  return <Link2 size={18} />
}

export function Home() {
  const [heroBackground, setHeroBackground] = useState(heroFallback)
  const [externalItems, setExternalItems] = useState<WorkItem[]>([])

  useEffect(() => {
    getUnifiedWorkItems().then(setExternalItems)
  }, [])

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

  const attentionCount = externalItems.filter((item) => item.attention).length
  const recentExternal = externalItems.slice(0, 2)

  return (
    <div>
      <div className="home-hero">
        <div>
          <p>Olá, Anderson Seixas 👋</p>
          <h1>Aqui é onde os projetos ganham vida.</h1>
          <span>
            Acompanhe o essencial e avance para os detalhes apenas quando precisar.
          </span>

          {attentionCount > 0 && (
            <Link to="/atribuicoes" className="home-attention-link">
              <AlertCircle size={16} />
              <span>
                <strong>{attentionCount}</strong>{' '}
                {attentionCount === 1 ? 'item precisa' : 'itens precisam'} da sua atenção
              </span>
              <ArrowRight size={15} />
            </Link>
          )}
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
          <div className="panel-head inline">
            <div>
              <h2>Últimas Movimentações</h2>
              <span>Somente o que mudou recentemente, dentro e fora do Scope.</span>
            </div>

            <Link to="/atribuicoes">
              Acompanhamentos <ArrowRight size={15} />
            </Link>
          </div>

          <div className="movement-list">
            {projects.slice(0, 1).map((project, index) => (
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

            {recentExternal.map((item) => (
              <div className="movement-row" key={item.id}>
                <div className="movement-icon">
                  <SourceIcon item={item} />
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <small>
                    {item.description} · {sourceLabel(item.source)}
                  </small>
                </div>

                <StatusPill>{item.status}</StatusPill>
                <time>{item.updated}</time>
              </div>
            ))}
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

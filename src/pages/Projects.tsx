import { ExternalLink, MoreVertical, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { projects } from '../data/mock'

const tabs = [
  'Últimas Movimentações',
  'Minha Equipe',
  'Em Andamento',
  'Planejamento',
  'Concluídos',
  'Em Risco',
  'Cancelados',
]

export function Projects() {
  const [active, setActive] = useState(tabs[0])
  const navigate = useNavigate()

  const list = active === tabs[0] ? projects.slice(0, 4) : projects

  return (
    <div>
      <div className="title-row">
        <div>
          <h1>Projetos</h1>
          <p>
            Acompanhe projetos institucionais com leitura rápida e foco no próximo passo.
          </p>
        </div>

        <button className="primary">
          <Plus size={17} />
          Novo Projeto
        </button>
      </div>

      <PageTabs tabs={tabs} active={active} onChange={setActive} />

      <div className="cards-grid project-grid">
        {list.map((project) => (
          <article className="project-card" key={project.id}>
            <button className="more">
              <MoreVertical size={18} />
            </button>

            <div className="project-main">
              <img src={project.image} alt="" />

              <div>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <StatusPill>{project.status}</StatusPill>
              </div>
            </div>

            <div className="progress-line">
              <div className="progress">
                <span style={{ width: `${project.progress}%` }} />
              </div>
              <strong>{project.progress}%</strong>
            </div>

            <small className="updated">Atualizado {project.updated}</small>

            <div className="card-actions">
              <button
                className="primary small"
                onClick={() => navigate(`/kanban/projeto/${project.id}`)}
              >
                Kanban
              </button>

              {project.hasExternal && (
                <a
                  className="soft-button"
                  href="https://www.rondonia.ro.gov.br/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={15} />
                  Link externo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

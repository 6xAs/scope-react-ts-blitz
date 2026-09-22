import {
  AlertTriangle,
  Archive,
  ArrowUpRight,
  Clock3,
  Copy,
  ExternalLink,
  MoreVertical,
  Pencil,
  Plus,
  Settings2,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { projects } from '../data/mock'
import '../project-kanban.css'
import '../attention.css'

const tabs = [
  'Últimas Movimentações',
  'Atenção',
  'Minha Equipe',
  'Em Andamento',
  'Planejamento',
  'Concluídos',
  'Em Risco',
  'Cancelados',
]

export function Projects() {
  const [active, setActive] = useState(tabs[0])
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null)

    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])

  const attentionProjects = projects.filter((project) => project.attention)

  const list =
    active === tabs[0]
      ? projects.filter((project) => !project.attention).slice(0, 4)
      : projects

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

      {active === 'Atenção' ? (
        <section className="attention-workspace">
          <div className="attention-intro">
            <span className="attention-intro-icon">
              <AlertTriangle size={18} />
            </span>

            <div>
              <strong>Projetos que precisam de atenção</strong>
              <p>
                Projetos entram aqui quando apresentam baixa movimentação, pouca
                participação da equipe ou marcos que permanecem sem avanço.
              </p>
            </div>

            <span className="attention-count">
              {attentionProjects.length} projetos
            </span>
          </div>

          <div className="attention-list">
            {attentionProjects.map((project) => (
              <article
                className="attention-card project-attention-card"
                key={project.id}
              >
                <div className="attention-rail" />

                <div className="attention-card-content">
                  <div className="attention-card-top">
                    <div className="attention-badges">
                      <span className="attention-badge overdue">
                        <Clock3 size={13} />
                        {project.attention?.staleDays} dias sem movimentação relevante
                      </span>

                      <span className="attention-badge stale">
                        <Users size={13} />
                        Participação {project.attention?.participationPercent}%
                      </span>
                    </div>

                    <StatusPill>{project.status}</StatusPill>
                  </div>

                  <div className="project-attention-main">
                    <img src={project.image} alt="" />

                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.attention?.reason}</p>
                    </div>
                  </div>

                  <div className="attention-meta project-attention-meta">
                    <span>
                      <Users size={15} />
                      <div>
                        <small>Participação</small>
                        <strong>
                          {project.attention?.activeMembers} de{' '}
                          {project.attention?.teamSize} membros ativos
                        </strong>
                      </div>
                    </span>

                    <span>
                      <Clock3 size={15} />
                      <div>
                        <small>Última movimentação</small>
                        <strong>{project.updated}</strong>
                      </div>
                    </span>

                    <span>
                      <AlertTriangle size={15} />
                      <div>
                        <small>Marcos pendentes</small>
                        <strong>
                          {project.attention?.pendingMilestones} aguardando avanço
                        </strong>
                      </div>
                    </span>

                    <span>
                      <div className="project-attention-progress">
                        <small>Progresso geral</small>
                        <div>
                          <span style={{ width: `${project.progress}%` }} />
                        </div>
                        <strong>{project.progress}%</strong>
                      </div>
                    </span>
                  </div>
                </div>

                <a
                  className="attention-action"
                  href={`/kanban/projeto/${project.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Acompanhar projeto
                  <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div className="cards-grid project-grid">
        {list.map((project) => (
          <article className="project-card project-card-refined" key={project.id}>
            <div
              className="project-menu-wrap"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="project-menu-trigger"
                aria-label={`Mais opções de ${project.title}`}
                aria-expanded={openMenu === project.id}
                onClick={() =>
                  setOpenMenu((current) =>
                    current === project.id ? null : project.id,
                  )
                }
              >
                <MoreVertical size={18} />
              </button>

              {openMenu === project.id && (
                <div className="project-popover" role="menu">
                  <button type="button" role="menuitem">
                    <Settings2 size={16} />
                    Detalhes e configurações
                  </button>
                  <button type="button" role="menuitem">
                    <Pencil size={16} />
                    Editar projeto
                  </button>
                  <button type="button" role="menuitem">
                    <Users size={16} />
                    Gerenciar equipe
                  </button>
                  <button type="button" role="menuitem">
                    <Copy size={16} />
                    Duplicar projeto
                  </button>

                  {project.hasExternal && (
                    <a
                      href={
                        project.externalUrl ??
                        'https://www.rondonia.ro.gov.br/'
                      }
                      target="_blank"
                      rel="noreferrer"
                      role="menuitem"
                    >
                      <ExternalLink size={16} />
                      Abrir link externo
                    </a>
                  )}

                  <div className="project-popover-divider" />

                  <button
                    type="button"
                    role="menuitem"
                    className="project-popover-danger"
                  >
                    <Archive size={16} />
                    Arquivar projeto
                  </button>
                </div>
              )}
            </div>

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

            <a
              className="primary project-follow-button"
              href={`/kanban/projeto/${project.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Acompanhar projeto
              <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
        </div>
      )}
    </div>
  )
}

import {
  Archive,
  ArrowUpRight,
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
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null)

    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])

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
    </div>
  )
}

import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { assignments } from '../data/mock'

const tabs = [
  'Últimas Movimentações',
  'Processos SEI',
  'Chamados GLPI',
  'Demandas Internas',
  'Blocos de Assinatura',
]

export function Assignments() {
  const [active, setActive] = useState(tabs[0])

  const list =
    active === tabs[0]
      ? assignments.slice(0, 4)
      : assignments.filter((assignment) => {
          if (active === 'Processos SEI') {
            return assignment.source === 'SEI'
          }

          if (active === 'Chamados GLPI') {
            return assignment.source === 'GLPI'
          }

          return true
        })

  return (
    <div>
      <div className="title-row">
        <div>
          <h1>Atribuições Vinculadas</h1>
          <p>
            Itens que nascem em outros sistemas, mas impactam seu trabalho no Scope.
          </p>
        </div>
      </div>

      <PageTabs tabs={tabs} active={active} onChange={setActive} />

      <div className="cards-grid assignment-grid">
        {list.map((assignment) => (
          <article className="assignment-card" key={assignment.id}>
            <div className={`source-badge ${assignment.source.toLowerCase()}`}>
              {assignment.source}
            </div>

            <h3>{assignment.title}</h3>
            <p>{assignment.subtitle}</p>
            <StatusPill>{assignment.status}</StatusPill>

            <div className="assignment-note">
              Última movimentação registrada {assignment.updated}.
            </div>

            <small>{assignment.owner}</small>

            <a
              className="primary small link-btn"
              href={assignment.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} />
              Abrir sistema externo
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Inbox,
  UserCheck,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { assignments } from '../data/mock'
import '../assignments-sei.css'
import '../attention.css'

const tabs = [
  'Últimas Movimentações',
  'Atenção',
  'Processos SEI',
  'Chamados GLPI',
  'Demandas Internas',
  'Blocos de Assinatura',
]

type SeiUnit = {
  id: string
  name: string
  description: string
}

type SeiProcess = {
  id: string
  number: string
  subject: string
  unit: string
  unitLabel: string
  status: 'Em análise' | 'Pendente' | 'Em andamento'
  updated: string
  assignedToMe: boolean
  assignee?: string
  sender: string
}

type AttentionAssignment = {
  id: string
  source: 'SEI' | 'GLPI' | 'Interna'
  title: string
  subtitle: string
  owner: string
  context: string
  status: 'Em análise' | 'Pendente' | 'Em andamento'
  overdue: string
  stale: string
  deadline: string
  externalUrl: string
}

const seiUnits: SeiUnit[] = [
  {
    id: 'SETIC-CGDI',
    name: 'SETIC-CGDI',
    description: 'Comissão de Governo Digital',
  },
  {
    id: 'SETIC-CGM',
    name: 'SETIC-CGM',
    description: 'Comissão de Gestão de Mudanças',
  },
  {
    id: 'SETIC-COMPIDBMPBC',
    name: 'SETIC-COMPIDBMPBC',
    description:
      'Comissão Permanente de Inventário e Desfazimento de Bens Móveis',
  },
  {
    id: 'SETIC-GSERV',
    name: 'SETIC-GSERV',
    description: 'Gerência de Serviços',
  },
]

const seiProcesses: SeiProcess[] = [
  {
    id: 'sei-gserv-01',
    number: '0024.001234/2026-11',
    subject: 'Contratação de solução de monitoramento de serviços',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    status: 'Em análise',
    updated: 'há 18 min',
    assignedToMe: true,
    assignee: 'Anderson Seixas',
    sender: 'SETIC-GAB',
  },
  {
    id: 'sei-gserv-02',
    number: '0024.004812/2026-44',
    subject: 'Atualização do catálogo de serviços de TIC',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    status: 'Em andamento',
    updated: 'há 1 h',
    assignedToMe: true,
    assignee: 'Anderson Seixas',
    sender: 'SETIC-CGOV',
  },
  {
    id: 'sei-gserv-03',
    number: '0024.006740/2026-08',
    subject: 'Revisão do fluxo de atendimento e escalonamento',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    status: 'Pendente',
    updated: 'há 3 h',
    assignedToMe: false,
    sender: 'SETIC-COINFRA',
  },
  {
    id: 'sei-gserv-04',
    number: '0024.007115/2026-31',
    subject: 'Solicitação de apoio técnico para unidade administrativa',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    status: 'Em análise',
    updated: 'ontem',
    assignedToMe: false,
    sender: 'SETIC-GAB',
  },
  {
    id: 'sei-cgdi-01',
    number: '0024.003581/2026-20',
    subject: 'Proposta de atualização do Plano de Transformação Digital',
    unit: 'SETIC-CGDI',
    unitLabel: 'Comissão de Governo Digital',
    status: 'Em andamento',
    updated: 'há 2 h',
    assignedToMe: false,
    sender: 'SETIC-GAB',
  },
  {
    id: 'sei-cgm-01',
    number: '0024.005200/2026-17',
    subject: 'Registro de mudança em serviço institucional crítico',
    unit: 'SETIC-CGM',
    unitLabel: 'Comissão de Gestão de Mudanças',
    status: 'Pendente',
    updated: 'há 4 h',
    assignedToMe: false,
    sender: 'SETIC-GSERV',
  },
  {
    id: 'sei-compi-01',
    number: '0024.008711/2026-59',
    subject: 'Inventário de equipamentos para desfazimento',
    unit: 'SETIC-COMPIDBMPBC',
    unitLabel: 'Comissão Permanente de Inventário',
    status: 'Em análise',
    updated: 'ontem',
    assignedToMe: false,
    sender: 'SETIC-COADM',
  },
]

const attentionAssignments: AttentionAssignment[] = [
  {
    id: 'attention-sei-01',
    source: 'SEI',
    title: 'Processo 0024.009112/2026-73',
    subtitle: 'Resposta técnica para contratação de serviço de TIC',
    owner: 'Anderson Seixas',
    context: 'Mesa SEI · SETIC-GSERV',
    status: 'Em análise',
    overdue: '5 dias de atraso',
    stale: 'Sem movimentação há 8 dias',
    deadline: '17/09/2026',
    externalUrl: 'https://sei.ro.gov.br/',
  },
  {
    id: 'attention-glpi-01',
    source: 'GLPI',
    title: 'Chamado #15284',
    subtitle: 'Validação de indisponibilidade recorrente de serviço',
    owner: 'Equipe GSERV',
    context: 'Fila de atendimento · GSERV',
    status: 'Pendente',
    overdue: '3 dias de atraso',
    stale: 'Sem movimentação há 6 dias',
    deadline: '19/09/2026',
    externalUrl: 'https://glpi.sistemas.ro.gov.br/',
  },
  {
    id: 'attention-interna-01',
    source: 'Interna',
    title: 'Atualização do inventário de serviços',
    subtitle: 'Consolidar informações pendentes das coordenações',
    owner: 'Anderson Seixas',
    context: 'Demanda interna · SETIC-GSERV',
    status: 'Em andamento',
    overdue: '2 dias de atraso',
    stale: 'Sem movimentação há 5 dias',
    deadline: '20/09/2026',
    externalUrl: 'https://www.rondonia.ro.gov.br/',
  },
  {
    id: 'attention-sei-02',
    source: 'SEI',
    title: 'Processo 0024.008709/2026-12',
    subtitle: 'Manifestação sobre atualização do catálogo de serviços',
    owner: 'Mesa SETIC-GSERV',
    context: 'Sem atribuição nominal',
    status: 'Pendente',
    overdue: '1 dia de atraso',
    stale: 'Sem movimentação há 4 dias',
    deadline: '21/09/2026',
    externalUrl: 'https://sei.ro.gov.br/',
  },
]

export function Assignments() {
  const [active, setActive] = useState(tabs[0])
  const [selectedUnit, setSelectedUnit] = useState('SETIC-GSERV')

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

  const currentUnit = seiUnits.find((unit) => unit.id === selectedUnit) ?? seiUnits[3]

  const unitProcesses = useMemo(
    () => seiProcesses.filter((process) => process.unit === selectedUnit),
    [selectedUnit],
  )

  const assignedCount = unitProcesses.filter((process) => process.assignedToMe).length

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

      {active === 'Atenção' ? (
        <section className="attention-workspace">
          <div className="attention-intro">
            <span className="attention-intro-icon">
              <AlertTriangle size={18} />
            </span>
            <div>
              <strong>Atribuições que precisam de atenção</strong>
              <p>
                Reúne itens de sistemas externos ou demandas internas que estão
                atrasados e também não recebem movimentação há alguns dias.
              </p>
            </div>
            <span className="attention-count">
              {attentionAssignments.length} itens
            </span>
          </div>

          <div className="attention-list">
            {attentionAssignments.map((item) => (
              <article className="attention-card" key={item.id}>
                <div className="attention-rail" />

                <div className="attention-card-content">
                  <div className="attention-card-top">
                    <div className="attention-badges">
                      <span
                        className={`attention-source ${item.source.toLowerCase()}`}
                      >
                        {item.source}
                      </span>
                      <span className="attention-badge overdue">
                        <AlertTriangle size={13} />
                        {item.overdue}
                      </span>
                      <span className="attention-badge stale">
                        <Clock3 size={13} />
                        {item.stale}
                      </span>
                    </div>

                    <StatusPill>{item.status}</StatusPill>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>

                  <div className="attention-meta">
                    <span>
                      <Building2 size={15} />
                      <div>
                        <small>Origem / contexto</small>
                        <strong>{item.context}</strong>
                      </div>
                    </span>

                    <span>
                      <UserCheck size={15} />
                      <div>
                        <small>Responsável</small>
                        <strong>{item.owner}</strong>
                      </div>
                    </span>

                    <span>
                      <Clock3 size={15} />
                      <div>
                        <small>Prazo</small>
                        <strong>{item.deadline}</strong>
                      </div>
                    </span>
                  </div>
                </div>

                <a
                  className="attention-action"
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={15} />
                  Abrir origem
                </a>
              </article>
            ))}
          </div>
        </section>
      ) : active === 'Processos SEI' ? (
        <section className="sei-workspace">
          <div className="sei-unit-panel">
            <div className="sei-unit-panel-header">
              <div>
                <span className="sei-eyebrow">Mesa SEI</span>
                <h2>Processos por unidade</h2>
                <p>
                  Selecione uma unidade para visualizar o que está na mesa e identificar
                  rapidamente os processos atribuídos diretamente a você.
                </p>
              </div>

              <div className="sei-current-unit">
                <Building2 size={18} />
                <div>
                  <span>Unidade ativa</span>
                  <strong>{currentUnit.name}</strong>
                  <small>{currentUnit.description}</small>
                </div>
              </div>
            </div>

            <div className="sei-unit-list" role="list" aria-label="Unidades SEI">
              {seiUnits.map((unit) => (
                <button
                  type="button"
                  key={unit.id}
                  className={`sei-unit-card ${selectedUnit === unit.id ? 'active' : ''}`}
                  onClick={() => setSelectedUnit(unit.id)}
                >
                  <span className="sei-unit-radio" aria-hidden="true" />
                  <span>
                    <strong>{unit.name}</strong>
                    <small>{unit.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sei-summary-row">
            <div className="sei-summary-card">
              <span className="sei-summary-icon">
                <Inbox size={17} />
              </span>
              <div>
                <strong>{unitProcesses.length}</strong>
                <span>processos na mesa da unidade</span>
              </div>
            </div>

            <div className="sei-summary-card highlighted">
              <span className="sei-summary-icon">
                <UserCheck size={17} />
              </span>
              <div>
                <strong>{assignedCount}</strong>
                <span>atribuídos diretamente a você</span>
              </div>
            </div>

            <div className="sei-summary-explainer">
              <CheckCircle2 size={17} />
              <span>
                O processo continua pertencendo à unidade e à mesa SEI, mas o Scope
                evidencia quando existe uma atribuição nominal para você.
              </span>
            </div>
          </div>

          <div className="sei-process-section-header">
            <div>
              <span className="sei-eyebrow">Processos SEI</span>
              <h3>{currentUnit.name}</h3>
            </div>

            <div className="sei-process-legend">
              <span>
                <i className="sei-legend-dot assigned" />
                Atribuído a você
              </span>
              <span>
                <i className="sei-legend-dot unit" />
                Na mesa da unidade
              </span>
            </div>
          </div>

          <div className="sei-process-list">
            {unitProcesses.map((process) => (
              <article
                className={`sei-process-card ${
                  process.assignedToMe ? 'assigned-to-me' : ''
                }`}
                key={process.id}
              >
                <div className="sei-process-status-rail" />

                <div className="sei-process-main">
                  <div className="sei-process-topline">
                    <div className="sei-process-badges">
                      {process.assignedToMe ? (
                        <span className="sei-badge assigned">
                          <UserCheck size={13} />
                          Atribuído a você
                        </span>
                      ) : (
                        <span className="sei-badge unit">
                          <Users size={13} />
                          Na mesa da unidade
                        </span>
                      )}

                      <span className="sei-badge mesa">
                        <Inbox size={13} />
                        Mesa SEI · {process.unit}
                      </span>
                    </div>

                    <StatusPill>{process.status}</StatusPill>
                  </div>

                  <div className="sei-process-title-row">
                    <div>
                      <strong>Processo {process.number}</strong>
                      <h4>{process.subject}</h4>
                    </div>
                  </div>

                  <div className="sei-process-meta">
                    <span>
                      <small>Unidade</small>
                      <strong>{process.unitLabel}</strong>
                    </span>
                    <span>
                      <small>Origem</small>
                      <strong>{process.sender}</strong>
                    </span>
                    <span>
                      <small>Última movimentação</small>
                      <strong>{process.updated}</strong>
                    </span>
                    <span>
                      <small>Atribuição</small>
                      <strong>
                        {process.assignedToMe
                          ? process.assignee
                          : 'Sem atribuição nominal'}
                      </strong>
                    </span>
                  </div>
                </div>

                <a
                  className="sei-process-action"
                  href="https://sei.ro.gov.br/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={15} />
                  Abrir no SEI
                </a>
              </article>
            ))}

            {unitProcesses.length === 0 && (
              <div className="sei-empty-state">
                <Inbox size={28} />
                <strong>Nenhum processo mockado nesta unidade.</strong>
                <span>Selecione outra unidade para continuar a navegação.</span>
              </div>
            )}
          </div>
        </section>
      ) : (
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
      )}
    </div>
  )
}

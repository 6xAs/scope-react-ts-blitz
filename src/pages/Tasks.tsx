import {
  AlertTriangle,
  Calendar,
  Clock3,
  MoreVertical,
  Plus,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { tasks } from '../data/mock'
import '../attention.css'

const tabs = [
  'Últimas Movimentações',
  'Atenção',
  'Minhas Tarefas',
  'Em Andamento',
  'Pendentes',
  'Concluídas',
  'Criadas por mim',
  'Todas as Tarefas',
]

const attentionTasks = [
  {
    id: 'revisao-catalogo',
    title: 'Revisar catálogo de serviços da GSERV',
    description:
      'A revisão está pendente e não recebeu novas movimentações desde a última atualização.',
    owner: 'Anderson Seixas',
    priority: 'Alta',
    deadline: '18/09/2026',
    overdue: '4 dias de atraso',
    stale: 'Sem movimentação há 7 dias',
  },
  {
    id: 'validacao-fluxo-sei',
    title: 'Validar fluxo de acompanhamento de processos SEI',
    description:
      'A tarefa ultrapassou o prazo planejado e segue sem registro de avanço recente.',
    owner: 'Carla Mendes',
    priority: 'Média',
    deadline: '19/09/2026',
    overdue: '3 dias de atraso',
    stale: 'Sem movimentação há 5 dias',
  },
  {
    id: 'documentacao-pdtic',
    title: 'Atualizar evidências de acompanhamento do PDTIC',
    description:
      'Existem entregas aguardando atualização antes da próxima reunião de acompanhamento.',
    owner: 'Lucas Medeiros',
    priority: 'Alta',
    deadline: '20/09/2026',
    overdue: '2 dias de atraso',
    stale: 'Sem movimentação há 4 dias',
  },
]

export function Tasks() {
  const [active, setActive] = useState(tabs[0])
  const navigate = useNavigate()

  const list = active === 'Últimas Movimentações' ? tasks.slice(0, 4) : tasks

  return (
    <div>
      <div className="title-row">
        <div>
          <h1>Tarefas</h1>
          <p>Gerencie suas atividades com foco no que importa.</p>
        </div>

        <button className="primary">
          <Plus size={17} />
          Nova Tarefa
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
              <strong>Demandas que precisam de atenção</strong>
              <p>
                Aqui aparecem tarefas com prazo vencido e sem movimentação recente.
                A ideia é destacar o que corre risco de ficar esquecido.
              </p>
            </div>
            <span className="attention-count">
              {attentionTasks.length} itens
            </span>
          </div>

          <div className="attention-list">
            {attentionTasks.map((task) => (
              <article className="attention-card" key={task.id}>
                <div className="attention-rail" />

                <div className="attention-card-content">
                  <div className="attention-card-top">
                    <div className="attention-badges">
                      <span className="attention-badge overdue">
                        <AlertTriangle size={13} />
                        {task.overdue}
                      </span>
                      <span className="attention-badge stale">
                        <Clock3 size={13} />
                        {task.stale}
                      </span>
                    </div>

                    <span
                      className={`priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority} prioridade
                    </span>
                  </div>

                  <h3>{task.title}</h3>
                  <p>{task.description}</p>

                  <div className="attention-meta">
                    <span>
                      <Calendar size={15} />
                      <div>
                        <small>Prazo</small>
                        <strong>{task.deadline}</strong>
                      </div>
                    </span>

                    <span>
                      <UserRound size={15} />
                      <div>
                        <small>Responsável</small>
                        <strong>{task.owner}</strong>
                      </div>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="attention-action"
                  onClick={() => navigate(`/kanban/tarefa/${task.id}`)}
                >
                  Acompanhar tarefa
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div className="cards-grid task-grid">
          {list.map((task) => (
            <article className="task-card" key={task.id}>
              <button className="more">
                <MoreVertical size={18} />
              </button>

              <div className="task-card-top">
                <div className="task-icon">✓</div>

                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              </div>

              <div className="pill-row">
                <StatusPill>{task.status}</StatusPill>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority} prioridade
                </span>
              </div>

              <div className="meta-row">
                <span>
                  <Calendar size={16} />
                  {task.date}
                </span>

                <span>
                  <UserRound size={16} />
                  {task.owner}
                </span>

                <button
                  className="soft-button"
                  onClick={() => navigate(`/kanban/tarefa/${task.id}`)}
                >
                  Abrir Kanban
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

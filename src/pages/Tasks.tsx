import { Calendar, MoreVertical, Plus, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTabs } from '../components/PageTabs'
import { StatusPill } from '../components/StatusPill'
import { tasks } from '../data/mock'

const tabs = [
  'Últimas Movimentações',
  'Minhas Tarefas',
  'Em Andamento',
  'Pendentes',
  'Concluídas',
  'Criadas por mim',
  'Todas as Tarefas',
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
    </div>
  )
}

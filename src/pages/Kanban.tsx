import { ArrowLeft, Calendar, Plus, Users } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { projects, tasks } from '../data/mock'

const columns = [
  {
    title: 'Backlog',
    items: ['Levantar requisitos', 'Mapear dependências', 'Revisar documentação'],
  },
  {
    title: 'Em análise',
    items: ['Definir arquitetura', 'Validar escopo'],
  },
  {
    title: 'Em execução',
    items: ['Implementar integração', 'Criar testes', 'Atualizar ambiente'],
  },
  {
    title: 'Validação',
    items: ['Homologar com equipe', 'Revisar aceite'],
  },
  {
    title: 'Concluído',
    items: ['Preparar infraestrutura', 'Aprovação inicial'],
  },
]

export function Kanban() {
  const { kind, id } = useParams()
  const isProject = kind === 'projeto'

  const title = isProject
    ? projects.find((project) => project.id === id)?.title
    : tasks.find((task) => task.id === id)?.title

  const back = isProject ? '/projetos' : '/tarefas'

  return (
    <div>
      <div className="kanban-title">
        <Link to={back} className="back-link">
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1>{title ?? 'Quadro Kanban'}</h1>
          <p>
            {isProject ? 'Projeto' : 'Tarefa'} · acompanhamento visual do fluxo de trabalho
          </p>
        </div>
      </div>

      <div className="kanban-toolbar">
        <div>
          <Users size={16} />
          Equipe vinculada
        </div>

        <div>
          <Calendar size={16} />
          Atualizado agora
        </div>

        <button className="primary small">
          <Plus size={16} />
          Nova tarefa
        </button>
      </div>

      <div className="kanban-board">
        {columns.map((column, columnIndex) => (
          <section
            className={`kanban-column tone-${columnIndex}`}
            key={column.title}
          >
            <header>
              <strong>{column.title}</strong>
              <span>{column.items.length}</span>
            </header>

            {column.items.map((item, itemIndex) => (
              <article className="kanban-card" key={item}>
                <strong>{item}</strong>
                <small>
                  {itemIndex % 2
                    ? 'Responsável: Equipe'
                    : 'Responsável: Anderson'}
                </small>

                <div className="kanban-card-foot">
                  <span>
                    {itemIndex + 1}/{itemIndex + 3}
                  </span>
                  <div className="mini-avatar">AS</div>
                </div>
              </article>
            ))}

            <button className="add-card">
              <Plus size={15} />
              Adicionar item
            </button>
          </section>
        ))}
      </div>
    </div>
  )
}

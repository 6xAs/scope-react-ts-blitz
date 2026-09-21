import {
  ArrowLeft,
  Bell,
  Boxes,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Github,
  Info,
  LayoutGrid,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { FloatingWorkspaceTools } from '../components/FloatingWorkspaceTools'
import { projects, tasks } from '../data/mock'
import '../project-kanban.css'

type MockCard = {
  id: string
  title: string
  meta?: string
  category?: string
  priority?: 'Alta' | 'Média'
  label?: string
  avatar?: string
  github?: boolean
  activity?: string
}

type MockColumn = {
  title: string
  tone: 'neutral' | 'warning' | 'primary' | 'review' | 'success'
  cards: MockCard[]
}

const people = {
  lucas: 'https://i.pravatar.cc/96?img=12',
  ana: 'https://i.pravatar.cc/96?img=47',
  diego: 'https://i.pravatar.cc/96?img=14',
  clara: 'https://i.pravatar.cc/96?img=32',
}

const columns: MockColumn[] = [
  {
    title: 'Backlog',
    tone: 'neutral',
    cards: [
      {
        id: 'ID-101',
        title: 'Pesquisa de soluções existentes',
        category: 'Descoberta',
      },
      {
        id: 'ID-102',
        title: 'Levantamento de requisitos com usuários',
        category: 'Entrevistas',
      },
      {
        id: 'ID-103',
        title: 'Criar protótipo de interface',
        category: 'UI / UX',
      },
      {
        id: 'ID-104',
        title: 'Definir funcionalidades principais',
        category: 'Escopo',
      },
      {
        id: 'ID-105',
        title: 'Desenvolver autenticação',
        category: 'Segurança',
      },
      {
        id: 'ID-106',
        title: 'Implementar dashboard',
        category: 'Frontend',
      },
      {
        id: 'ID-107',
        title: 'Testes de usabilidade',
        category: 'QA',
      },
    ],
  },
  {
    title: 'A fazer',
    tone: 'warning',
    cards: [
      {
        id: 'ID-108',
        title: 'Requisitos da Calculadora',
        priority: 'Alta',
        avatar: people.lucas,
      },
      {
        id: 'ID-109',
        title: 'Como o sistema funciona',
        meta: 'Documentação',
        avatar: people.ana,
      },
      {
        id: 'ID-110',
        title: 'O que a ferramenta avalia',
        meta: 'Métricas e risco',
        avatar: people.diego,
      },
      {
        id: 'ID-112',
        title: 'Como surgiu a ideia',
        meta: 'Histórico & propósito',
      },
    ],
  },
  {
    title: 'Em andamento',
    tone: 'primary',
    cards: [
      {
        id: 'ID-113',
        title: 'Criação da interface inicial da calculadora e dashboard',
        label: 'Sprint ativa',
        priority: 'Alta',
        avatar: people.lucas,
        activity: 'Em desenvolvimento',
      },
      {
        id: 'ID-114',
        title: 'Códigos no GitHub',
        github: true,
        avatar: people.diego,
        activity: '3 commits hoje',
      },
    ],
  },
  {
    title: 'Revisão',
    tone: 'review',
    cards: [],
  },
  {
    title: 'Concluído',
    tone: 'success',
    cards: [
      {
        id: 'ID-099',
        title: 'Definição do problema institucional',
        category: 'Escopo aprovado',
        avatar: people.clara,
      },
    ],
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
    <div className="kanban-screen">
      <header className="kanban-topbar">
        <Link to={back} className="kanban-app-back">
          <ArrowLeft size={18} />
          <span>Voltar para aplicação</span>
        </Link>

        <div className="kanban-brand-chip">SCOPE</div>

        <div className="kanban-project-name">
          <strong>{isProject ? 'Projeto:' : 'Tarefa:'}</strong>
          <span>{title ?? 'Quadro de acompanhamento'}</span>
        </div>

        <div className="kanban-leader">
          <span className="kanban-mini-label">LÍDER</span>
          <img src={people.lucas} alt="Lucas Medeiros" />
          <strong>Lucas Medeiros</strong>
        </div>

        <div className="kanban-avatar-stack" aria-label="Equipe do projeto">
          <img src={people.ana} alt="Ana" />
          <img src={people.diego} alt="Diego" />
        </div>

        <button className="kanban-top-control" type="button">
          <Bell size={16} />
          Avisos
          <span className="kanban-control-count">1</span>
        </button>

        <div className="kanban-xp">
          <Star size={15} fill="currentColor" />
          <strong>25 / 630 XP</strong>
        </div>

        <div className="kanban-deadline">
          <CalendarDays size={16} />
          <div>
            <span>Prazo final</span>
            <strong>10 de dez de 2026</strong>
          </div>
        </div>

        <button className="kanban-icon-control" type="button" aria-label="Configurações">
          <Settings size={17} />
        </button>
      </header>

      <section className="kanban-description-bar">
        <div className="kanban-description-copy">
          <Info size={16} />
          <p>
            O projeto organiza entregas, responsáveis e etapas de acompanhamento em um
            fluxo único, permitindo uma leitura rápida do que está parado, em execução e
            pronto para validação.
          </p>
        </div>

        <div className="kanban-rating" aria-label="Avaliação do projeto">
          <Star size={16} fill="currentColor" />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
        </div>

        <div className="kanban-days-left">
          <Clock3 size={15} />
          Faltam 94 dias
        </div>
      </section>

      <section className="kanban-progress-row">
        <div className="kanban-progress-summary">
          <strong>Progresso geral</strong>
          <b>4%</b>
          <div className="kanban-progress-track">
            <span style={{ width: '4%' }} />
          </div>
          <span className="kanban-progress-done">
            <Check size={14} /> 1 concluído
          </span>
          <span className="kanban-progress-flow">20 em fluxo</span>
          <button type="button">Detalhes</button>
        </div>

        <label className="kanban-search">
          <Search size={17} />
          <input placeholder="Buscar cards, membros, etiquetas..." />
          <kbd>⌘K</kbd>
        </label>
      </section>

      <main className="kanban-workspace">
        <div className="kanban-board-full">
          {columns.map((column) => (
            <section
              className={`kanban-column-full kanban-tone-${column.tone} ${
                column.tone === 'primary' ? 'is-focused' : ''
              }`}
              key={column.title}
            >
              <header className="kanban-column-head">
                <div>
                  <span className="kanban-column-dot" />
                  <strong>{column.title}</strong>
                  <b>{column.cards.length}</b>
                </div>
                <button type="button" aria-label={`Opções de ${column.title}`}>
                  <MoreHorizontal size={18} />
                </button>
              </header>

              <div className="kanban-column-cards">
                {column.cards.length === 0 && (
                  <div className="kanban-empty-state">
                    <CheckCircle2 size={30} />
                    <strong>Nenhum item aguardando revisão</strong>
                    <span>Arraste itens concluídos para esta coluna.</span>
                  </div>
                )}

                {column.cards.map((card) => (
                  <article className="kanban-work-card" key={card.id}>
                    <strong>{card.title}</strong>

                    {card.label && (
                      <div className="kanban-card-tags">
                        <span className="kanban-tag kanban-tag-blue">{card.label}</span>
                        {card.priority && (
                          <span className="kanban-tag kanban-tag-red">
                            Prioridade {card.priority}
                          </span>
                        )}
                      </div>
                    )}

                    {!card.label && card.priority && (
                      <div className="kanban-card-tags">
                        <span className="kanban-tag kanban-tag-yellow">
                          {card.priority} prioridade
                        </span>
                      </div>
                    )}

                    {card.github && (
                      <div className="kanban-card-github">
                        <Github size={14} /> Repositório estruturado
                      </div>
                    )}

                    {card.activity && (
                      <div className="kanban-card-activity">
                        {card.github ? <Github size={13} /> : <Clock3 size={13} />}
                        {card.activity}
                      </div>
                    )}

                    {(card.meta || card.category || card.id || card.avatar) && (
                      <footer className="kanban-work-card-foot">
                        <span>{card.meta ?? card.category ?? card.id}</span>
                        {card.avatar ? (
                          <img src={card.avatar} alt="Responsável" />
                        ) : (
                          <small>{card.id}</small>
                        )}
                      </footer>
                    )}
                  </article>
                ))}
              </div>

              <div className="kanban-new-card">
                <span>Novo card...</span>
                <button type="button">
                  <Plus size={15} />
                  Adicionar card
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>

      <aside className="kanban-floating-tools" aria-label="Ferramentas do quadro">
        <button type="button" aria-label="Visão do quadro">
          <LayoutGrid size={17} />
        </button>
        <button type="button" aria-label="Documentos">
          <FileText size={17} />
        </button>
        <button type="button" aria-label="Arquivos">
          <Paperclip size={17} />
        </button>
        <button type="button" aria-label="Entregáveis">
          <Boxes size={17} />
        </button>
        <button type="button" aria-label="Equipe">
          <Users size={17} />
        </button>
      </aside>

      <button className="kanban-ai-button" type="button" aria-label="Assistente do projeto">
        <Sparkles size={19} />
      </button>

      <FloatingWorkspaceTools />
    </div>
  )
}

import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DoorOpen,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Users,
  Video,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import '../workspace-tools.css'

type Panel = 'agenda' | 'chat' | null

type CalendarEvent = {
  day: number
  title: string
  time?: string
  scope: 'Pessoal' | 'GSERV' | 'Coordenação' | 'Institucional'
  kind: 'project' | 'task' | 'meeting' | 'institutional'
}

const agendaScopes = ['Minha agenda', 'GSERV', 'Coordenação', 'Institucional']

const events: CalendarEvent[] = [
  {
    day: 21,
    title: 'Revisão do PDTIC 2024–2027',
    time: '09:00',
    scope: 'Coordenação',
    kind: 'project',
  },
  {
    day: 21,
    title: 'Validar protótipo do GLPI',
    time: '14:00',
    scope: 'Pessoal',
    kind: 'task',
  },
  {
    day: 22,
    title: 'Daily GSERV',
    time: '08:30',
    scope: 'GSERV',
    kind: 'meeting',
  },
  {
    day: 23,
    title: 'Comitê de Governança',
    time: '10:00',
    scope: 'Institucional',
    kind: 'institutional',
  },
  {
    day: 24,
    title: 'PDTIC · acompanhamento das iniciativas',
    time: '15:00',
    scope: 'Coordenação',
    kind: 'project',
  },
  {
    day: 25,
    title: 'Modernização do Datacenter',
    time: '11:00',
    scope: 'GSERV',
    kind: 'project',
  },
  {
    day: 28,
    title: 'Reunião de alinhamento · Portal',
    time: '09:30',
    scope: 'GSERV',
    kind: 'meeting',
  },
  {
    day: 30,
    title: 'Fechamento mensal',
    time: '16:30',
    scope: 'Institucional',
    kind: 'institutional',
  },
]

const calendarDays = [
  { day: 30, outside: true },
  { day: 31, outside: true },
  ...Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    outside: false,
  })),
  { day: 1, outside: true },
  { day: 2, outside: true },
  { day: 3, outside: true },
  { day: 4, outside: true },
  { day: 5, outside: true },
]

const members = [
  {
    id: 'lucas',
    name: 'Lucas Medeiros',
    role: 'Líder de projeto',
    status: 'online',
    avatar: 'https://i.pravatar.cc/100?img=12',
    unread: 2,
  },
  {
    id: 'ana',
    name: 'Ana Costa',
    role: 'Governança e planejamento',
    status: 'online',
    avatar: 'https://i.pravatar.cc/100?img=47',
    unread: 0,
  },
  {
    id: 'carla',
    name: 'Carla Mendes',
    role: 'Infraestrutura',
    status: 'há 8 min',
    avatar: 'https://i.pravatar.cc/100?img=32',
    unread: 1,
  },
  {
    id: 'diego',
    name: 'Diego Ribeiro',
    role: 'Desenvolvimento',
    status: 'há 22 min',
    avatar: 'https://i.pravatar.cc/100?img=14',
    unread: 0,
  },
]

const conversations = {
  lucas: [
    {
      from: 'other',
      text: 'Atualizei as iniciativas do PDTIC que dependem da nossa coordenação.',
      time: '12:42',
    },
    {
      from: 'me',
      text: 'Ótimo. Vou revisar antes da reunião de amanhã.',
      time: '12:46',
    },
    {
      from: 'other',
      text: 'Também deixei uma sala pré-reservada para 9h.',
      time: '12:48',
    },
  ],
  ana: [
    {
      from: 'other',
      text: 'A pauta da governança já está vinculada ao compromisso de quarta.',
      time: '11:18',
    },
    {
      from: 'me',
      text: 'Perfeito. Depois adicionamos os responsáveis de cada iniciativa.',
      time: '11:24',
    },
  ],
  carla: [
    {
      from: 'other',
      text: 'A equipe de infraestrutura confirmou a atualização do datacenter.',
      time: '10:05',
    },
  ],
  diego: [
    {
      from: 'other',
      text: 'Subi a última versão do protótipo para validação.',
      time: '09:31',
    },
  ],
} as const

export function FloatingWorkspaceTools() {
  const [panel, setPanel] = useState<Panel>(null)
  const [agendaScope, setAgendaScope] = useState(agendaScopes[0])
  const [selectedMember, setSelectedMember] = useState(members[0])
  const [roomBookingOpen, setRoomBookingOpen] = useState(false)

  const selectedMessages = useMemo(
    () =>
      conversations[
        selectedMember.id as keyof typeof conversations
      ] ?? conversations.lucas,
    [selectedMember],
  )

  const togglePanel = (nextPanel: Exclude<Panel, null>) => {
    setPanel((current) => (current === nextPanel ? null : nextPanel))
  }

  return (
    <>
      <div className="workspace-fab-group" aria-label="Atalhos de colaboração">
        <button
          type="button"
          className={`workspace-fab ${panel === 'agenda' ? 'active' : ''}`}
          onClick={() => togglePanel('agenda')}
        >
          <CalendarDays size={20} />
          <span>Agenda</span>
        </button>

        <button
          type="button"
          className={`workspace-fab ${panel === 'chat' ? 'active' : ''}`}
          onClick={() => togglePanel('chat')}
        >
          <MessageCircle size={20} />
          <span>Chat</span>
          <b className="workspace-fab-badge">3</b>
        </button>
      </div>

      {panel && (
        <div
          className="workspace-panel-backdrop"
          onClick={() => setPanel(null)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`workspace-panel workspace-panel-agenda ${
          panel === 'agenda' ? 'open' : ''
        }`}
        aria-hidden={panel !== 'agenda'}
      >
        <header className="workspace-panel-header">
          <div>
            <span className="workspace-panel-icon">
              <CalendarDays size={19} />
            </span>
            <div>
              <h2>Agenda</h2>
              <p>Projetos, tarefas, reuniões e compromissos institucionais.</p>
            </div>
          </div>

          <button
            type="button"
            className="workspace-close"
            onClick={() => setPanel(null)}
            aria-label="Fechar agenda"
          >
            <X size={19} />
          </button>
        </header>

        <div className="agenda-scope-tabs">
          {agendaScopes.map((scope) => (
            <button
              key={scope}
              type="button"
              className={agendaScope === scope ? 'active' : ''}
              onClick={() => setAgendaScope(scope)}
            >
              {scope}
            </button>
          ))}
        </div>

        <div className="agenda-toolbar">
          <div className="agenda-navigation">
            <button type="button" className="agenda-today">
              Hoje
            </button>
            <button type="button" aria-label="Mês anterior">
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Próximo mês">
              <ChevronRight size={18} />
            </button>
            <strong>Setembro de 2026</strong>
          </div>

          <button
            type="button"
            className="agenda-room-button"
            onClick={() => setRoomBookingOpen((current) => !current)}
          >
            <DoorOpen size={17} />
            Agendar sala
          </button>
        </div>

        <div className="agenda-layout">
          <section className="calendar-shell">
            <div className="calendar-weekdays">
              {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {calendarDays.map((date, index) => {
                const dayEvents = date.outside
                  ? []
                  : events.filter((event) => event.day === date.day)

                return (
                  <div
                    className={`calendar-cell ${
                      date.outside ? 'outside' : ''
                    } ${date.day === 21 && !date.outside ? 'today' : ''}`}
                    key={`${date.day}-${index}`}
                  >
                    <span className="calendar-day-number">{date.day}</span>

                    <div className="calendar-events">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          className={`calendar-event calendar-event-${event.kind}`}
                          key={`${event.day}-${event.title}`}
                          title={event.title}
                        >
                          {event.time && <small>{event.time}</small>}
                          <span>{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <aside className="agenda-side">
            <div className="agenda-side-card agenda-next-card">
              <span className="agenda-side-label">Próximos compromissos</span>

              <article>
                <div className="agenda-time-block">
                  <strong>09:00</strong>
                  <span>21 SET</span>
                </div>
                <div>
                  <strong>Revisão do PDTIC 2024–2027</strong>
                  <small>
                    <Users size={13} />
                    Coordenação · 7 participantes
                  </small>
                </div>
              </article>

              <article>
                <div className="agenda-time-block">
                  <strong>14:00</strong>
                  <span>21 SET</span>
                </div>
                <div>
                  <strong>Validar protótipo do GLPI</strong>
                  <small>
                    <Clock3 size={13} />
                    Tarefa vinculada
                  </small>
                </div>
              </article>

              <article>
                <div className="agenda-time-block">
                  <strong>10:00</strong>
                  <span>23 SET</span>
                </div>
                <div>
                  <strong>Comitê de Governança</strong>
                  <small>
                    <Building2 size={13} />
                    Agenda institucional
                  </small>
                </div>
              </article>
            </div>

            <div className="agenda-side-card">
              <div className="agenda-side-title">
                <div>
                  <span className="agenda-side-label">Salas de reunião</span>
                  <strong>Disponibilidade hoje</strong>
                </div>
                <DoorOpen size={19} />
              </div>

              <div className="meeting-room">
                <div>
                  <strong>Sala Inovação</strong>
                  <span>8 pessoas · TV · videoconferência</span>
                </div>
                <small>14:30 — 16:00</small>
              </div>

              <div className="meeting-room">
                <div>
                  <strong>Sala Estratégia</strong>
                  <span>12 pessoas · painel interativo</span>
                </div>
                <small>16:00 — 18:00</small>
              </div>
            </div>
          </aside>
        </div>

        {roomBookingOpen && (
          <div className="room-booking-mock">
            <header>
              <div>
                <DoorOpen size={18} />
                <div>
                  <strong>Agendar sala de reunião</strong>
                  <span>Reserva simulada vinculada à agenda.</span>
                </div>
              </div>
              <button type="button" onClick={() => setRoomBookingOpen(false)}>
                <X size={17} />
              </button>
            </header>

            <div className="room-booking-fields">
              <label>
                <span>Compromisso</span>
                <input value="Reunião de acompanhamento do PDTIC" readOnly />
              </label>
              <label>
                <span>Sala</span>
                <div className="mock-select">
                  Sala Inovação
                  <ChevronRight size={16} />
                </div>
              </label>
              <label>
                <span>Data e horário</span>
                <div className="mock-select">
                  22 set · 14:30 — 15:30
                  <Clock3 size={16} />
                </div>
              </label>
              <label>
                <span>Participantes</span>
                <div className="mock-select">
                  GSERV · 6 pessoas
                  <Users size={16} />
                </div>
              </label>
            </div>

            <footer>
              <span>
                <Video size={15} />
                Sala com videoconferência disponível
              </span>
              <button type="button" className="primary small">
                <Plus size={15} />
                Adicionar à agenda
              </button>
            </footer>
          </div>
        )}
      </aside>

      <aside
        className={`workspace-panel workspace-panel-chat ${
          panel === 'chat' ? 'open' : ''
        }`}
        aria-hidden={panel !== 'chat'}
      >
        <header className="workspace-panel-header">
          <div>
            <span className="workspace-panel-icon">
              <MessageCircle size={19} />
            </span>
            <div>
              <h2>Chat da equipe</h2>
              <p>Converse com membros dos projetos e da instituição.</p>
            </div>
          </div>

          <button
            type="button"
            className="workspace-close"
            onClick={() => setPanel(null)}
            aria-label="Fechar chat"
          >
            <X size={19} />
          </button>
        </header>

        <div className="chat-layout">
          <section className="chat-members">
            <label className="chat-search">
              <Search size={16} />
              <input placeholder="Buscar pessoa..." />
            </label>

            <div className="chat-members-title">
              <span>Membros</span>
              <button type="button">
                <MoreHorizontal size={17} />
              </button>
            </div>

            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                className={`chat-member ${
                  selectedMember.id === member.id ? 'active' : ''
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <span className="chat-avatar-wrap">
                  <img src={member.avatar} alt="" />
                  {member.status === 'online' && <i />}
                </span>

                <span>
                  <strong>{member.name}</strong>
                  <small>{member.role}</small>
                </span>

                {member.unread > 0 && <b>{member.unread}</b>}
              </button>
            ))}
          </section>

          <section className="chat-conversation">
            <header>
              <div>
                <img src={selectedMember.avatar} alt="" />
                <div>
                  <strong>{selectedMember.name}</strong>
                  <span>{selectedMember.status}</span>
                </div>
              </div>

              <button type="button" aria-label="Mais opções">
                <MoreHorizontal size={19} />
              </button>
            </header>

            <div className="chat-project-context">
              <span>Contexto atual</span>
              <strong>PDTIC 2024–2027 · Planejamento Estratégico</strong>
            </div>

            <div className="chat-messages">
              <div className="chat-day-divider">
                <span>Hoje</span>
              </div>

              {selectedMessages.map((message, index) => (
                <div
                  className={`chat-message ${message.from}`}
                  key={`${message.time}-${index}`}
                >
                  <p>{message.text}</p>
                  <span>{message.time}</span>
                </div>
              ))}
            </div>

            <footer className="chat-composer">
              <button type="button" className="chat-add">
                <Plus size={18} />
              </button>
              <input placeholder="Escreva uma mensagem..." />
              <button type="button" className="chat-send" aria-label="Enviar mensagem">
                <Send size={17} />
              </button>
            </footer>
          </section>
        </div>
      </aside>
    </>
  )
}

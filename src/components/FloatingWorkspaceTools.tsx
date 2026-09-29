import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DoorOpen,
  LayoutGrid,
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
type AgendaMode = 'agenda' | 'rooms'
type AgendaView = 'month' | 'week' | 'day'

type CalendarEvent = {
  day: number
  title: string
  time?: string
  scope: 'Minha agenda' | 'GSERV' | 'Coordenação' | 'Instituição' | 'Projetos em andamento'
  kind: 'project' | 'task' | 'meeting' | 'institutional'
}

const agendaScopes = ['Minha agenda', 'GSERV', 'Coordenação', 'Instituição', 'Projetos em andamento'] as const

const events: CalendarEvent[] = [
  {
    day: 21,
    title: 'Revisão do PDTIC 2024–2027',
    time: '09:00',
    scope: 'Projetos em andamento',
    kind: 'project',
  },
  {
    day: 21,
    title: 'Validar protótipo do GLPI',
    time: '14:00',
    scope: 'Minha agenda',
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
    scope: 'Instituição',
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
    scope: 'Projetos em andamento',
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
    scope: 'Instituição',
    kind: 'institutional',
  },
]


type RoomBooking = {
  id: string
  room: string
  day: number
  start: string
  end: string
  unit: string
  responsible: string
  title: string
  status: 'Em uso' | 'Reservada'
}

const rooms = [
  { id: 'inovacao', name: 'Sala Inovação', capacity: 8, resources: 'TV · videoconferência' },
  { id: 'estrategia', name: 'Sala Estratégia', capacity: 12, resources: 'painel interativo · videoconferência' },
  { id: 'colaboracao', name: 'Sala Colaboração', capacity: 6, resources: 'TV · quadro branco' },
]

const roomBookings: RoomBooking[] = [
  {
    id: 'room-01',
    room: 'Sala Inovação',
    day: 21,
    start: '09:00',
    end: '10:30',
    unit: 'GSERV',
    responsible: 'Anderson Seixas',
    title: 'Revisão do PDTIC 2024–2027',
    status: 'Em uso',
  },
  {
    id: 'room-02',
    room: 'Sala Estratégia',
    day: 21,
    start: '14:00',
    end: '15:30',
    unit: 'CGOV',
    responsible: 'Ana Costa',
    title: 'Comitê de Governança',
    status: 'Reservada',
  },
  {
    id: 'room-03',
    room: 'Sala Inovação',
    day: 22,
    start: '14:30',
    end: '16:00',
    unit: 'GSERV',
    responsible: 'Lucas Medeiros',
    title: 'Acompanhamento de projetos',
    status: 'Reservada',
  },
  {
    id: 'room-04',
    room: 'Sala Colaboração',
    day: 23,
    start: '10:00',
    end: '11:00',
    unit: 'COINFRA',
    responsible: 'Carla Mendes',
    title: 'Planejamento de infraestrutura',
    status: 'Reservada',
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
  const [agendaScope, setAgendaScope] = useState<(typeof agendaScopes)[number]>(agendaScopes[0])
  const [agendaMode, setAgendaMode] = useState<AgendaMode>('agenda')
  const [agendaView, setAgendaView] = useState<AgendaView>('month')
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].name)
  const [selectedMember, setSelectedMember] = useState(members[0])
  const [roomBookingOpen, setRoomBookingOpen] = useState(false)

  const visibleEvents = useMemo(
    () =>
      agendaScope === 'Minha agenda'
        ? events.filter((event) => event.scope === 'Minha agenda')
        : events.filter((event) => event.scope === agendaScope),
    [agendaScope],
  )

  const visibleRoomBookings = useMemo(
    () => roomBookings.filter((booking) => booking.room === selectedRoom),
    [selectedRoom],
  )

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
          aria-label="Agenda"
          className={`workspace-fab ${panel === 'agenda' ? 'active' : ''}`}
          onClick={() => togglePanel('agenda')}
        >
          <CalendarDays size={20} />
          <span>Agenda</span>
        </button>

        <button
          type="button"
          aria-label="Chat"
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
        <header className="workspace-panel-header agenda-premium-header">
          <div>
            <span className="workspace-panel-icon agenda-premium-icon">
              <CalendarDays size={23} />
            </span>
            <div>
              <h2>Agenda</h2>
              <p>Compromissos pessoais, equipes, projetos e uso dos espaços institucionais.</p>
            </div>
          </div>

          <button
            type="button"
            className="workspace-close"
            onClick={() => setPanel(null)}
            aria-label="Fechar agenda"
          >
            <X size={20} />
          </button>
        </header>

        <div className="agenda-mode-switch">
          <button
            type="button"
            className={agendaMode === 'agenda' ? 'active' : ''}
            onClick={() => setAgendaMode('agenda')}
          >
            <CalendarDays size={17} />
            Agenda geral
          </button>
          <button
            type="button"
            className={agendaMode === 'rooms' ? 'active' : ''}
            onClick={() => setAgendaMode('rooms')}
          >
            <DoorOpen size={17} />
            Salas de reunião
          </button>
        </div>

        {agendaMode === 'agenda' ? (
          <>
            <div className="agenda-scope-tabs agenda-scope-tabs-premium">
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

            <div className="agenda-toolbar agenda-toolbar-premium">
              <div className="agenda-navigation">
                <button type="button" className="agenda-today">
                  Hoje
                </button>
                <button type="button" aria-label="Período anterior">
                  <ChevronLeft size={19} />
                </button>
                <button type="button" aria-label="Próximo período">
                  <ChevronRight size={19} />
                </button>
                <strong>Setembro de 2026</strong>
              </div>

              <div className="agenda-view-switch" aria-label="Visualização da agenda">
                {(['day', 'week', 'month'] as AgendaView[]).map((view) => (
                  <button
                    key={view}
                    type="button"
                    className={agendaView === view ? 'active' : ''}
                    onClick={() => setAgendaView(view)}
                  >
                    {view === 'day' ? 'Dia' : view === 'week' ? 'Semana' : 'Mês'}
                  </button>
                ))}
              </div>
            </div>

            <div className="agenda-layout agenda-layout-premium">
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
                      : visibleEvents.filter((event) => event.day === date.day)

                    return (
                      <div
                        className={`calendar-cell ${date.outside ? 'outside' : ''} ${
                          date.day === 21 && !date.outside ? 'today' : ''
                        }`}
                        key={`${date.day}-${index}`}
                      >
                        <span className="calendar-day-number">{date.day}</span>

                        <div className="calendar-events">
                          {dayEvents.slice(0, 3).map((event) => (
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

              <aside className="agenda-side agenda-side-premium">
                <div className="agenda-side-card agenda-next-card">
                  <span className="agenda-side-label">Próximos compromissos</span>

                  {visibleEvents.slice(0, 4).map((event) => (
                    <article key={`${event.day}-${event.title}`}>
                      <div className="agenda-time-block">
                        <strong>{event.time ?? '—'}</strong>
                        <span>{event.day} SET</span>
                      </div>
                      <div>
                        <strong>{event.title}</strong>
                        <small>
                          <Users size={14} />
                          {event.scope}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="agenda-room-highlight"
                  onClick={() => setAgendaMode('rooms')}
                >
                  <span>
                    <DoorOpen size={20} />
                  </span>
                  <div>
                    <strong>Salas de reunião</strong>
                    <small>Veja ocupação atual, reservas e horários livres.</small>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </aside>
            </div>
          </>
        ) : (
          <section className="rooms-workspace">
            <div className="rooms-topbar">
              <div>
                <span className="rooms-eyebrow">Agenda de espaços</span>
                <h3>Salas de reunião</h3>
                <p>
                  Ocupação por gerência ou coordenação, responsável e faixa de horário.
                </p>
              </div>

              <button
                type="button"
                className="agenda-room-button rooms-primary-action"
                onClick={() => setRoomBookingOpen((current) => !current)}
              >
                <Plus size={17} />
                Nova reserva
              </button>
            </div>

            <div className="rooms-summary">
              <article className="room-now-card">
                <span className="room-status-dot" />
                <div>
                  <small>Em uso agora</small>
                  <strong>Sala Inovação</strong>
                  <p>GSERV · Anderson Seixas</p>
                </div>
                <time>09:00 — 10:30</time>
              </article>

              <article>
                <small>Próxima ocupação</small>
                <strong>Sala Estratégia</strong>
                <p>CGOV · Ana Costa</p>
                <time>14:00 — 15:30</time>
              </article>

              <article>
                <small>Disponíveis agora</small>
                <strong>1 sala</strong>
                <p>Sala Colaboração</p>
                <time>Livre até 10:00</time>
              </article>
            </div>

            <div className="rooms-controls">
              <div className="rooms-list">
                {rooms.map((room) => (
                  <button
                    type="button"
                    key={room.id}
                    className={selectedRoom === room.name ? 'active' : ''}
                    onClick={() => setSelectedRoom(room.name)}
                  >
                    <DoorOpen size={17} />
                    <span>
                      <strong>{room.name}</strong>
                      <small>{room.capacity} pessoas · {room.resources}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="agenda-view-switch">
                {(['day', 'week', 'month'] as AgendaView[]).map((view) => (
                  <button
                    key={view}
                    type="button"
                    className={agendaView === view ? 'active' : ''}
                    onClick={() => setAgendaView(view)}
                  >
                    {view === 'day' ? 'Dia' : view === 'week' ? 'Semana' : 'Mês'}
                  </button>
                ))}
              </div>
            </div>

            <div className="room-schedule-shell">
              <div className="room-schedule-head">
                <div>
                  <strong>{selectedRoom}</strong>
                  <span>Semana de 21 a 27 de setembro</span>
                </div>
                <div className="room-availability-legend">
                  <span><i className="busy" /> Ocupada</span>
                  <span><i className="free" /> Disponível</span>
                </div>
              </div>

              <div className="room-week-grid">
                {[21, 22, 23, 24, 25].map((day) => {
                  const bookings = visibleRoomBookings.filter((booking) => booking.day === day)
                  return (
                    <div className="room-day-column" key={day}>
                      <header>
                        <span>{['SEG', 'TER', 'QUA', 'QUI', 'SEX'][day - 21]}</span>
                        <strong>{day}</strong>
                      </header>

                      <div className="room-day-body">
                        {bookings.map((booking) => (
                          <article className="room-booking-block" key={booking.id}>
                            <small>{booking.start} — {booking.end}</small>
                            <strong>{booking.unit}</strong>
                            <span>{booking.title}</span>
                            <em>{booking.responsible}</em>
                            <b>{booking.status}</b>
                          </article>
                        ))}

                        <div className="room-free-slot">
                          <Clock3 size={14} />
                          <span>Horários livres disponíveis</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rooms-bookings-list">
              <div className="rooms-bookings-title">
                <div>
                  <span className="rooms-eyebrow">Reservas da semana</span>
                  <h4>Quem vai ocupar a sala</h4>
                </div>
                <LayoutGrid size={20} />
              </div>

              {visibleRoomBookings.map((booking) => (
                <article key={booking.id}>
                  <div className="room-booking-date">
                    <strong>{booking.day}</strong>
                    <span>SET</span>
                  </div>
                  <div>
                    <strong>{booking.title}</strong>
                    <small>{booking.unit} · responsável: {booking.responsible}</small>
                  </div>
                  <time>{booking.start} — {booking.end}</time>
                  <span className={booking.status === 'Em uso' ? 'room-state live' : 'room-state'}>
                    {booking.status}
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}

        {roomBookingOpen && (
          <div className="room-booking-mock room-booking-premium">
            <header>
              <div>
                <DoorOpen size={20} />
                <div>
                  <strong>Reservar sala de reunião</strong>
                  <span>Vincule a reserva à unidade, responsável e compromisso.</span>
                </div>
              </div>
              <button type="button" onClick={() => setRoomBookingOpen(false)}>
                <X size={18} />
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
                  {selectedRoom}
                  <ChevronRight size={16} />
                </div>
              </label>
              <label>
                <span>Unidade responsável</span>
                <div className="mock-select">
                  GSERV
                  <Building2 size={16} />
                </div>
              </label>
              <label>
                <span>Responsável</span>
                <div className="mock-select">
                  Anderson Seixas
                  <Users size={16} />
                </div>
              </label>
              <label>
                <span>Data e horário</span>
                <div className="mock-select">
                  22 set · 14:30 — 15:30
                  <Clock3 size={16} />
                </div>
              </label>
            </div>

            <footer>
              <span>
                <Video size={16} />
                Recursos da sala exibidos antes da confirmação
              </span>
              <button type="button" className="primary small">
                <Plus size={15} />
                Confirmar reserva
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

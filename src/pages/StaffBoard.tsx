import {
  BadgeCheck,
  Building2,
  Filter,
  Search,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import '../staff-board.css'

type StaffStatus = 'Ativo' | 'Férias' | 'Afastado'

type StaffMember = {
  id: string
  name: string
  role: string
  unit: string
  unitLabel: string
  bond: string
  status: StaffStatus
  avatar: string
}

const members: StaffMember[] = [
  {
    id: 'staff-01',
    name: 'Anderson Seixas',
    role: 'Desenvolvimento e Soluções Digitais',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    bond: 'Servidor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 'staff-02',
    name: 'Lucas Medeiros',
    role: 'Gestão de Serviços de TIC',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    bond: 'Servidor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: 'staff-03',
    name: 'Ana Costa',
    role: 'Governança e Planejamento',
    unit: 'SETIC-CGDI',
    unitLabel: 'Comissão de Governo Digital',
    bond: 'Servidor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
  {
    id: 'staff-04',
    name: 'Carla Mendes',
    role: 'Infraestrutura e Operações',
    unit: 'SETIC-COINFRA',
    unitLabel: 'Coordenação de Infraestrutura',
    bond: 'Servidor',
    status: 'Férias',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: 'staff-05',
    name: 'Diego Ribeiro',
    role: 'Desenvolvimento de Sistemas',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    bond: 'Comissionado',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=14',
  },
  {
    id: 'staff-06',
    name: 'Fernanda Lima',
    role: 'Segurança da Informação',
    unit: 'SETIC-GAB',
    unitLabel: 'Gabinete da SETIC',
    bond: 'Servidor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=49',
  },
  {
    id: 'staff-07',
    name: 'Marcos Almeida',
    role: 'Gestão de Mudanças',
    unit: 'SETIC-CGM',
    unitLabel: 'Comissão de Gestão de Mudanças',
    bond: 'Servidor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    id: 'staff-08',
    name: 'Juliana Pereira',
    role: 'Processos e Qualidade',
    unit: 'SETIC-GSERV',
    unitLabel: 'Gerência de Serviços',
    bond: 'Servidor',
    status: 'Afastado',
    avatar: 'https://i.pravatar.cc/100?img=45',
  },
]

const unitOptions = [
  'Todas as unidades',
  'SETIC-GSERV',
  'SETIC-CGDI',
  'SETIC-CGM',
  'SETIC-COINFRA',
  'SETIC-GAB',
]

const statusOptions = ['Todos os status', 'Ativo', 'Férias', 'Afastado']

export function StaffBoard() {
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState(unitOptions[0])
  const [status, setStatus] = useState(statusOptions[0])

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return members.filter((member) => {
      const matchesQuery =
        !normalizedQuery ||
        member.name.toLowerCase().includes(normalizedQuery) ||
        member.role.toLowerCase().includes(normalizedQuery) ||
        member.unit.toLowerCase().includes(normalizedQuery)

      const matchesUnit = unit === unitOptions[0] || member.unit === unit
      const matchesStatus = status === statusOptions[0] || member.status === status

      return matchesQuery && matchesUnit && matchesStatus
    })
  }, [query, status, unit])

  const activeCount = members.filter((member) => member.status === 'Ativo').length
  const unitCount = new Set(members.map((member) => member.unit)).size

  return (
    <div className="staff-board-page">
      <div className="title-row staff-title-row">
        <div>
          <h1>Quadro de Servidores</h1>
          <p>
            Relação institucional de membros, lotações e funções vinculadas à SETIC.
          </p>
        </div>

        <div className="staff-directory-badge">
          <UsersRound size={18} />
          <span>Diretório institucional</span>
        </div>
      </div>

      <section className="staff-summary">
        <article>
          <span className="staff-summary-icon">
            <UsersRound size={18} />
          </span>
          <div>
            <strong>{members.length}</strong>
            <span>Membros cadastrados</span>
          </div>
        </article>

        <article>
          <span className="staff-summary-icon">
            <UserRoundCheck size={18} />
          </span>
          <div>
            <strong>{activeCount}</strong>
            <span>Em atividade</span>
          </div>
        </article>

        <article>
          <span className="staff-summary-icon">
            <Building2 size={18} />
          </span>
          <div>
            <strong>{unitCount}</strong>
            <span>Unidades representadas</span>
          </div>
        </article>
      </section>

      <section className="staff-directory">
        <div className="staff-directory-toolbar">
          <label className="staff-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar servidor, função ou unidade..."
            />
          </label>

          <div className="staff-filter">
            <Filter size={15} />
            <select value={unit} onChange={(event) => setUnit(event.target.value)}>
              {unitOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="staff-filter">
            <BadgeCheck size={15} />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {statusOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="staff-directory-head" aria-hidden="true">
          <span>Servidor</span>
          <span>Unidade / Lotação</span>
          <span>Vínculo</span>
          <span>Situação</span>
        </div>

        <div className="staff-list">
          {filteredMembers.map((member) => (
            <article className="staff-row" key={member.id}>
              <div className="staff-person">
                <img src={member.avatar} alt="" />
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>

              <div className="staff-unit">
                <strong>{member.unit}</strong>
                <span>{member.unitLabel}</span>
              </div>

              <div className="staff-bond">
                <span>{member.bond}</span>
              </div>

              <div className="staff-status-wrap">
                <span
                  className={`staff-status ${member.status
                    .toLowerCase()
                    .replace('é', 'e')}`}
                >
                  <i />
                  {member.status}
                </span>
              </div>
            </article>
          ))}

          {filteredMembers.length === 0 && (
            <div className="staff-empty">
              <UsersRound size={30} />
              <strong>Nenhum membro encontrado.</strong>
              <span>Ajuste a busca ou os filtros para visualizar outros servidores.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

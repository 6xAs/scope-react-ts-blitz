import {
  BarChart3,
  Bell,
  CheckSquare2,
  FolderKanban,
  Home,
  Link2,
  Search,
  Settings,
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { buildGlobalSearchIndex, searchGlobalIndex } from '../search/globalSearch'
import type { GlobalSearchResult } from '../search/globalSearch'
import '../interoperability.css'
import { FloatingWorkspaceTools } from './FloatingWorkspaceTools'

const nav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/atribuicoes', label: 'Acompanhamentos', icon: Link2 },
  { to: '/tarefas', label: 'Tarefas', icon: CheckSquare2 },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
]

export function AppShell() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchIndex, setSearchIndex] = useState<GlobalSearchResult[]>([])
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    buildGlobalSearchIndex().then(setSearchIndex)
  }, [])

  const searchResults = useMemo(
    () => searchGlobalIndex(searchIndex, searchQuery),
    [searchIndex, searchQuery],
  )

  const openResult = (result: GlobalSearchResult) => {
    if (result.external) {
      window.open(result.href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(result.href)
    }

    setSearchQuery('')
    setSearchFocused(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
          </div>

          <div>
            <strong>Scope</strong>
            <small>Gestão Institucional</small>
          </div>
        </div>

        <nav className="side-nav">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? 'side-link active' : 'side-link'
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="side-divider" />

        <a className="side-link" href="#">
          <Settings size={20} />
          <span>Administração</span>
        </a>

        <div className="sidebar-note">
          <div className="mini-art">▰</div>
          <strong>Mais eficiência para grandes resultados.</strong>
          <small>Organize. Acompanhe. Conquiste.</small>
        </div>
      </aside>

      <main className="main-column">
        <header className="topbar">
          <div className="global-search-shell">
            <label className="search global-search-input">
              <Search size={18} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
                placeholder="Buscar projetos, SEI, GLPI, serviços..."
                aria-label="Busca global"
              />
            </label>

            {searchFocused && searchQuery.trim().length >= 2 && (
              <div className="global-search-results">
                <div className="global-search-head">
                  <span>Busca no Scope</span>
                  <small>{searchResults.length} resultados</small>
                </div>

                {searchResults.map((result) => (
                  <button
                    type="button"
                    key={result.id}
                    className="global-search-result"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => openResult(result)}
                  >
                    <div>
                      <strong>{result.title}</strong>
                      <small>{result.description}</small>
                    </div>
                    <span>
                      <b>{result.type}</b>
                      <small>{result.source}</small>
                    </span>
                  </button>
                ))}

                {searchResults.length === 0 && (
                  <div className="global-search-empty">
                    Nenhum resultado encontrado.
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="icon-button">
            <Bell size={20} />
            <span className="dot" />
          </button>

          <div className="profile">
            <div className="avatar">AS</div>
            <div>
              <strong>Anderson Seixas</strong>
              <small>GSERV · SETIC/RO</small>
            </div>
          </div>
        </header>

        <section className="page-wrap">
          <Outlet />
        </section>

        <FloatingWorkspaceTools />
      </main>
    </div>
  )
}

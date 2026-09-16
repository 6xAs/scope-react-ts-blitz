import { BarChart3, Bell, CheckSquare2, FolderKanban, Home, Link2, Search, Settings } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/atribuicoes', label: 'Atribuições Vinculadas', icon: Link2 },
  { to: '/tarefas', label: 'Tarefas', icon: CheckSquare2 },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">S</div><div><strong>Scope</strong><small>Gestão Institucional</small></div></div>
        <nav className="side-nav">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="side-divider" />
        <button className="side-link ghost"><Settings size={19} /><span>Administração</span></button>
        <div className="sidebar-note"><strong>Mais eficiência para grandes resultados.</strong><small>Organize. Acompanhe. Conquiste.</small></div>
      </aside>
      <main className="main-column">
        <header className="topbar">
          <label className="search"><Search size={18} /><input placeholder="Buscar no sistema..." /></label>
          <button className="icon-button"><Bell size={19} /><span className="dot" /></button>
          <div className="profile"><div className="avatar">AS</div><div><strong>Anderson Seixas</strong><small>GSERV · SETIC/RO</small></div></div>
        </header>
        <section className="page-wrap"><Outlet /></section>
      </main>
    </div>
  )
}

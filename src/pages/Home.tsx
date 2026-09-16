import { ArrowRight, ExternalLink, FolderKanban, Link2, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assignments, projects, tasks } from '../data/mock'

export function Home() {
  return (
    <div className="page-stack">
      <div className="page-heading"><div><h1>Visão geral</h1><p>Acompanhe o que merece sua atenção agora.</p></div></div>

      <section className="home-grid">
        <div className="panel span-2">
          <div className="section-head"><div><span className="eyeless-label">Projetos em destaque</span><h2>Principais projetos</h2></div><Link to="/projetos">Ver todos <ArrowRight size={16}/></Link></div>
          <div className="project-mini-grid">{projects.slice(0,2).map(p=><Link className="project-mini" key={p.id} to={`/kanban/projeto/${p.id}`}><img src={p.image} alt=""/><div><small>{p.status}</small><strong>{p.title}</strong><span>{p.event}</span></div></Link>)}</div>
        </div>

        <div className="panel">
          <div className="section-head"><div><span className="eyeless-label">Atalhos</span><h2>Prioridades</h2></div></div>
          <div className="quick-list">
            <Link to="/tarefas"><ListChecks size={18}/><span><strong>{tasks.length} tarefas recentes</strong><small>Ver atividades da equipe</small></span></Link>
            <Link to="/projetos"><FolderKanban size={18}/><span><strong>{projects.length} projetos ativos</strong><small>Acessar projetos e Kanbans</small></span></Link>
            <Link to="/atribuicoes"><Link2 size={18}/><span><strong>{assignments.length} atribuições vinculadas</strong><small>Abrir sistemas externos</small></span></Link>
          </div>
        </div>

        <div className="panel span-2">
          <div className="section-head"><div><span className="eyeless-label">Equipe</span><h2>Tarefas recentes</h2></div><Link to="/tarefas">Ver tarefas <ArrowRight size={16}/></Link></div>
          <div className="compact-list">{tasks.slice(0,3).map(t=><Link key={t.id} to={`/kanban/tarefa/${t.id}`}><span className="status-dot"/><div><strong>{t.title}</strong><small>{t.event} · {t.when}</small></div><ArrowRight size={16}/></Link>)}</div>
        </div>

        <div className="panel">
          <div className="section-head"><div><span className="eyeless-label">Sistemas externos</span><h2>Atribuições</h2></div></div>
          <div className="compact-list">{assignments.slice(0,2).map(a=><a key={a.id} href={a.externalUrl} target="_blank" rel="noreferrer"><div><strong>{a.source} · {a.title}</strong><small>{a.event}</small></div><ExternalLink size={16}/></a>)}</div>
        </div>
      </section>
    </div>
  )
}

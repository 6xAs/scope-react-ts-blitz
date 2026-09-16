import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTabs } from '../components/PageTabs'
import { projects } from '../data/mock'

const tabs = ['Últimas Movimentações','Meus Projetos','Em Andamento','Planejamento','Concluídos']

export function Projects(){
  const [active,setActive]=useState(tabs[0])
  const visible = active==='Em Andamento' ? projects.filter(p=>p.status==='Em andamento') : active==='Planejamento' ? projects.filter(p=>p.status==='Planejamento') : projects
  return <div className="page-stack">
    <div className="page-heading"><div><h1>Projetos</h1><p>Veja as movimentações mais recentes e acesse o Kanban de cada projeto.</p></div></div>
    <PageTabs items={tabs} active={active} onChange={setActive}/>
    <div className="project-grid">{visible.slice(0,4).map(p=><Link className="project-card" key={p.id} to={`/kanban/projeto/${p.id}`}><img src={p.image} alt=""/><div className="project-card-body"><small>{p.status}</small><strong>{p.title}</strong><span>{p.event}</span><div><time>{p.when}</time><ArrowRight size={17}/></div></div></Link>)}</div>
  </div>
}

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTabs } from '../components/PageTabs'
import { tasks } from '../data/mock'

const tabs = ['Últimas Movimentações','Minhas Tarefas','Em Andamento','Pendentes','Concluídas']

export function Tasks(){
  const [active,setActive]=useState(tabs[0])
  const visible = active==='Em Andamento' ? tasks.filter(t=>t.status==='Em andamento') : active==='Pendentes' ? tasks.filter(t=>t.status==='Pendente') : tasks
  return <div className="page-stack">
    <div className="page-heading"><div><h1>Tarefas</h1><p>Visualize o que mudou e entre no Kanban quando precisar agir.</p></div></div>
    <PageTabs items={tabs} active={active} onChange={setActive}/>
    <div className="recent-grid">{visible.slice(0,4).map(t=><Link className="movement-card task-card" key={t.id} to={`/kanban/tarefa/${t.id}`}><span className="status-dot"/><div className="movement-body"><strong>{t.title}</strong><span>{t.event}</span><small>{t.when}</small></div><ArrowRight size={17}/></Link>)}</div>
  </div>
}

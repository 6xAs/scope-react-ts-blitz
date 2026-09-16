import { ArrowLeft, Plus, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { kanbanColumns, projects, tasks } from '../data/mock'

export function Kanban(){
  const { kind,id } = useParams()
  const isProject = kind === 'projeto'
  const title = isProject ? projects.find(p=>p.id===id)?.title ?? 'Projeto' : tasks.find(t=>t.id===id)?.title ?? 'Tarefa'
  const back = isProject ? '/projetos' : '/tarefas'
  return <div className="page-stack kanban-page">
    <div className="kanban-top">
      <div className="kanban-title"><Link to={back} className="back-button"><ArrowLeft size={18}/></Link><div><small>{isProject?'Projeto':'Tarefa'}</small><h1>{title}</h1></div></div>
      <div className="kanban-actions"><label className="kanban-search"><Search size={17}/><input placeholder="Buscar cards ou membros..."/></label><button className="primary-button"><Plus size={17}/> Novo card</button></div>
    </div>
    <div className="kanban-board">{kanbanColumns.map((col,i)=><section className="kanban-column" key={col.title}><header><strong>{col.title}</strong><span>{col.cards.length}</span></header><div className="kanban-cards">{col.cards.map((card,j)=><article className="kanban-card" key={card}><div className="card-tag">{i===3?'Concluído':i===2?'Revisão':'Atividade'}</div><strong>{card}</strong><p>{j%2===0?'Acompanhar andamento e registrar próximos passos.':'Validar com a equipe responsável.'}</p><footer><div className="mini-avatar">AS</div><small>{j+1} comentário{j? 's':''}</small></footer></article>)}</div></section>)}</div>
  </div>
}

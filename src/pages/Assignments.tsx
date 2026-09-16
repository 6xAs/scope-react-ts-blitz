import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { PageTabs } from '../components/PageTabs'
import { assignments } from '../data/mock'

const tabs = ['Últimas Movimentações','Processos SEI','Chamados GLPI','Demandas Internas']

export function Assignments(){
  const [active,setActive]=useState(tabs[0])
  const visible = active==='Processos SEI' ? assignments.filter(a=>a.source==='SEI') : active==='Chamados GLPI' ? assignments.filter(a=>a.source==='GLPI') : assignments
  return <div className="page-stack">
    <div className="page-heading"><div><h1>Atribuições Vinculadas</h1><p>Acompanhe movimentações e acesse diretamente os sistemas externos.</p></div></div>
    <PageTabs items={tabs} active={active} onChange={setActive}/>
    <div className="recent-grid">{visible.slice(0,4).map(a=><a className="movement-card" key={a.id} href={a.externalUrl} target="_blank" rel="noreferrer"><div className="source-badge">{a.source}</div><div className="movement-body"><strong>{a.title}</strong><span>{a.event}</span><small>{a.when}</small></div><ExternalLink size={17}/></a>)}</div>
  </div>
}

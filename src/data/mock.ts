export type Assignment = { id:string; source:string; title:string; event:string; when:string; externalUrl:string }
export type Task = { id:string; title:string; event:string; when:string; status:string }
export type Project = { id:string; title:string; event:string; when:string; status:string; image:string }

export const assignments: Assignment[] = [
  { id:'sei-001', source:'SEI', title:'Processo 0024.001234/2026-11', event:'Nova movimentação registrada no processo.', when:'há 18 min', externalUrl:'https://sei.ro.gov.br/' },
  { id:'glpi-147', source:'GLPI', title:'Chamado #14728', event:'Chamado atualizado pela equipe responsável.', when:'há 1 h', externalUrl:'https://glpi.sistemas.ro.gov.br/' },
  { id:'sei-002', source:'SEI', title:'Processo 0024.004812/2026-44', event:'Documento encaminhado para análise.', when:'ontem', externalUrl:'https://sei.ro.gov.br/' },
]

export const tasks: Task[] = [
  { id:'task-1', title:'Revisar arquitetura do Scope', event:'Card atualizado por Anderson.', when:'há 12 min', status:'Em andamento' },
  { id:'task-2', title:'Mapear integrações institucionais', event:'Nova observação adicionada.', when:'há 2 h', status:'Pendente' },
  { id:'task-3', title:'Validar fluxo do Kanban', event:'Responsável alterado.', when:'ontem', status:'Em andamento' },
]

export const projects: Project[] = [
  { id:'scope', title:'Expansão do Scope', event:'Nova etapa adicionada ao planejamento.', when:'há 25 min', status:'Em andamento', image:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
  { id:'wiki', title:'Wiki SETIC', event:'Documentação atualizada pela equipe.', when:'há 3 h', status:'Em andamento', image:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  { id:'portal', title:'Portal do Cidadão', event:'Projeto recebeu nova atividade.', when:'ontem', status:'Planejamento', image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80' },
]

export const kanbanColumns = [
  { title:'A fazer', cards:['Mapear requisitos','Validar responsáveis','Definir critérios de aceite'] },
  { title:'Em andamento', cards:['Construir fluxo principal','Revisar arquitetura'] },
  { title:'Em revisão', cards:['Validar protótipo com a equipe'] },
  { title:'Concluído', cards:['Criar estrutura inicial do projeto'] },
]

export type IntegrationSource =
  | 'SCOPE'
  | 'SEI'
  | 'GLPI'
  | 'PORTAL_SERVIDOR'
  | 'ALPHA'
  | 'INTERNO'

export type IntegrationLevel = 'launch' | 'read' | 'action'

export type WorkItemKind =
  | 'atribuicao'
  | 'solicitacao'
  | 'atendimento'

export type WorkItemStatus =
  | 'Em análise'
  | 'Concluído'
  | 'Em andamento'
  | 'Pendente'

export type WorkItem = {
  id: string
  externalId?: string
  source: IntegrationSource
  kind: WorkItemKind
  title: string
  description: string
  status: WorkItemStatus
  owner: string
  updated: string
  attention?: boolean
  externalUrl?: string
  actionLabel?: string
  capabilities: IntegrationLevel[]
  metadata?: Record<string, string | number | boolean | null>
}

export type ServiceCatalogItem = {
  id: string
  source: IntegrationSource
  title: string
  description: string
  category:
    | 'RH'
    | 'Acessos'
    | 'Tecnologia'
    | 'Documentos'
    | 'Licenças'
    | 'Atendimento'
    | 'Outros'
  externalUrl: string
  capabilities: IntegrationLevel[]
}

export interface IntegrationAdapter {
  source: IntegrationSource
  listWorkItems(): Promise<WorkItem[]>
  listServices(): Promise<ServiceCatalogItem[]>
}

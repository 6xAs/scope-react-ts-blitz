import { projects, tasks } from '../data/mock'
import { getUnifiedServiceCatalog, getUnifiedWorkItems, sourceLabel } from '../integrations'

export type GlobalSearchResult = {
  id: string
  type: 'Projeto' | 'Tarefa' | 'Acompanhamento' | 'Serviço'
  title: string
  description: string
  source: string
  href: string
  external: boolean
  keywords: string
}

export async function buildGlobalSearchIndex(): Promise<GlobalSearchResult[]> {
  const [workItems, services] = await Promise.all([
    getUnifiedWorkItems(),
    getUnifiedServiceCatalog(),
  ])

  return [
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      type: 'Projeto' as const,
      title: project.title,
      description: project.subtitle,
      source: 'Scope',
      href: '/projetos',
      external: false,
      keywords: `${project.title} ${project.subtitle} projeto scope`.toLowerCase(),
    })),
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      type: 'Tarefa' as const,
      title: task.title,
      description: task.description,
      source: 'Scope',
      href: '/tarefas',
      external: false,
      keywords: `${task.title} ${task.description} tarefa scope`.toLowerCase(),
    })),
    ...workItems.map((item) => ({
      id: `work-${item.id}`,
      type: 'Acompanhamento' as const,
      title: item.title,
      description: item.description,
      source: sourceLabel(item.source),
      href: item.externalUrl ?? '/atribuicoes',
      external: Boolean(item.externalUrl),
      keywords: [
        item.title,
        item.description,
        item.owner,
        sourceLabel(item.source),
        item.externalId ?? '',
      ].join(' ').toLowerCase(),
    })),
    ...services.map((service) => ({
      id: `service-${service.id}`,
      type: 'Serviço' as const,
      title: service.title,
      description: service.description,
      source: sourceLabel(service.source),
      href: service.externalUrl,
      external: true,
      keywords: [
        service.title,
        service.description,
        service.category,
        sourceLabel(service.source),
        ...(service.keywords ?? []),
      ].join(' ').toLowerCase(),
    })),
  ]
}

export function searchGlobalIndex(
  index: GlobalSearchResult[],
  query: string,
): GlobalSearchResult[] {
  const term = query.trim().toLowerCase()
  if (term.length < 2) return []

  return index
    .filter((item) => item.keywords.includes(term))
    .slice(0, 8)
}

import { projects, tasks } from '../data/mock'
import { getUnifiedWorkItems, sourceLabel } from '../integrations'
import type { WorkItemStatus } from '../integrations/types'

export type ActivityKind = 'project' | 'task' | 'integration'

export type UnifiedActivity = {
  id: string
  kind: ActivityKind
  title: string
  description: string
  status: string
  timeLabel: string
  sourceLabel: string
  href?: string
  external?: boolean
  sortMinutes: number
}

function relativeMinutes(label: string) {
  const normalized = label.toLowerCase()

  if (normalized.includes('agora')) return 0
  if (normalized.includes('ontem')) return 24 * 60

  const value = Number(normalized.match(/\d+/)?.[0] ?? 9999)

  if (normalized.includes('min')) return value
  if (normalized.includes('hora') || normalized.includes(' h')) return value * 60
  if (normalized.includes('dia')) return value * 24 * 60

  return 9999 * 60
}

export async function getUnifiedActivityFeed(): Promise<UnifiedActivity[]> {
  const integrations = await getUnifiedWorkItems()

  const external: UnifiedActivity[] = integrations.map((item) => ({
    id: `integration-${item.id}`,
    kind: 'integration',
    title: item.title,
    description: item.description,
    status: item.status as WorkItemStatus,
    timeLabel: item.updated,
    sourceLabel: sourceLabel(item.source),
    href: item.externalUrl,
    external: true,
    sortMinutes: relativeMinutes(item.updated),
  }))

  const internal: UnifiedActivity[] = [
    ...projects.slice(0, 2).map((project) => ({
      id: `project-${project.id}`,
      kind: 'project' as const,
      title: project.title,
      description: `Status alterado para ${project.status.toLowerCase()}`,
      status: project.status,
      timeLabel: project.updated,
      sourceLabel: 'Scope',
      href: `/projetos`,
      external: false,
      sortMinutes: relativeMinutes(project.updated),
    })),
    {
      id: `task-${tasks[0].id}`,
      kind: 'task',
      title: tasks[0].title,
      description: 'Nova atualização registrada na tarefa.',
      status: tasks[0].status,
      timeLabel: 'há 1 dia',
      sourceLabel: 'Scope',
      href: '/tarefas',
      external: false,
      sortMinutes: 24 * 60,
    },
  ]

  return [...external, ...internal]
    .sort((a, b) => a.sortMinutes - b.sortMinutes)
    .slice(0, 5)
}

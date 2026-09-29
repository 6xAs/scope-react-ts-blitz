import { integrationAdapters } from './adapters/mockAdapters'
import type { ServiceCatalogItem, WorkItem } from './types'

export async function getUnifiedWorkItems(): Promise<WorkItem[]> {
  const groups = await Promise.all(
    integrationAdapters.map((adapter) => adapter.listWorkItems()),
  )

  return groups.flat()
}

export async function getUnifiedServiceCatalog(): Promise<ServiceCatalogItem[]> {
  const groups = await Promise.all(
    integrationAdapters.map((adapter) => adapter.listServices()),
  )

  return groups.flat()
}

export function sourceLabel(
  source: WorkItem['source'] | ServiceCatalogItem['source'],
) {
  const labels = {
    SCOPE: 'Scope',
    SEI: 'SEI',
    GLPI: 'GLPI',
    PORTAL_SERVIDOR: 'Portal',
    ALPHA: 'Alpha',
    INTERNO: 'Interno',
  }

  return labels[source]
}

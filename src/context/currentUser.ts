import type { IntegrationSource } from '../integrations/types'

export type UserRole =
  | 'servidor'
  | 'gestor'
  | 'alpha_attendant'

export type UserContext = {
  id: string
  name: string
  unit: string
  roles: UserRole[]
  seiUnits: string[]
  enabledSources: IntegrationSource[]
}

export const currentUser: UserContext = {
  id: 'anderson-seixas',
  name: 'Anderson Seixas',
  unit: 'SETIC-GSERV',
  roles: ['servidor', 'gestor', 'alpha_attendant'],
  seiUnits: ['SETIC-GSERV', 'SETIC-CGDI', 'SETIC-CGM', 'SETIC-COMPIDBMPBC'],
  enabledSources: ['SCOPE', 'SEI', 'GLPI', 'PORTAL_SERVIDOR', 'ALPHA', 'INTERNO'],
}

export function hasRole(role: UserRole) {
  return currentUser.roles.includes(role)
}

export function hasSource(source: IntegrationSource) {
  return currentUser.enabledSources.includes(source)
}

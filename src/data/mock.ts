export type Project = {
  id: string
  title: string
  subtitle: string
  status: 'Em andamento' | 'Planejamento' | 'Em análise' | 'Concluído'
  progress: number
  updated: string
  image: string
  hasExternal?: boolean
  externalUrl?: string
  attention?: {
    reason: string
    staleDays: number
    participationPercent: number
    activeMembers: number
    teamSize: number
    pendingMilestones: number
  }
}

export type Task = {
  id: string
  title: string
  description: string
  status: 'Em andamento' | 'Pendente' | 'Concluída'
  priority: 'Alta' | 'Média' | 'Baixa'
  owner: string
  date: string
}

export type Assignment = {
  id: string
  title: string
  subtitle: string
  source: 'SEI' | 'GLPI' | 'Interno'
  status: 'Em análise' | 'Concluído' | 'Em andamento' | 'Pendente'
  owner: string
  updated: string
  externalUrl: string
}

export const projects: Project[] = [
  {
    id: 'pdtic-2024-2027',
    title: 'PDTIC - Plano Diretor de Tecnologia da Informação e Comunicação',
    subtitle: 'Planejamento Estratégico e Governança · 2024–2027',
    status: 'Em andamento',
    progress: 68,
    updated: 'há 1 hora',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    hasExternal: true,
    externalUrl:
      'https://wiki.setic.ro.gov.br/pdfs/compliance/pdtic_2024-2027_rev1.3-1.pdf',
  },
  {
    id: 'visao-computacional',
    title: 'Visão Computacional',
    subtitle: 'Pesquisa e desenvolvimento',
    status: 'Em andamento',
    progress: 70,
    updated: 'há 2 horas',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    hasExternal: true,
  },
  {
    id: 'infovia-candeias',
    title: 'Infovia - Passando cabo em Candeias',
    subtitle: 'Infraestrutura de rede',
    status: 'Planejamento',
    progress: 25,
    updated: 'há 9 dias',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    hasExternal: true,
    attention: {
      reason: 'Baixa movimentação e pouca participação da equipe nas últimas etapas.',
      staleDays: 9,
      participationPercent: 29,
      activeMembers: 2,
      teamSize: 7,
      pendingMilestones: 2,
    },
  },
  {
    id: 'portal-institucional',
    title: 'Novo Portal Institucional',
    subtitle: 'Comunicação e Tecnologia',
    status: 'Em andamento',
    progress: 60,
    updated: 'há 6 dias',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    attention: {
      reason: 'Poucos membros registraram atividade e há entregas aguardando avanço.',
      staleDays: 6,
      participationPercent: 17,
      activeMembers: 1,
      teamSize: 6,
      pendingMilestones: 1,
    },
  },
  {
    id: 'datacenter',
    title: 'Modernização do Datacenter',
    subtitle: 'Tecnologia da Informação',
    status: 'Concluído',
    progress: 100,
    updated: 'há 3 dias',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    hasExternal: true,
  },
]

export const tasks: Task[] = [
  {
    id: 'api-quadro',
    title: 'Revisar documentação da API',
    description:
      'João Andrade atualizou a documentação conforme os novos endpoints.',
    status: 'Em andamento',
    priority: 'Alta',
    owner: 'João Andrade',
    date: '28/03/2024',
  },
  {
    id: 'glpi-prototipo',
    title: 'Validar protótipo do GLPI',
    description:
      'Carla Mendes solicitou a revisão do protótipo para homologação.',
    status: 'Pendente',
    priority: 'Média',
    owner: 'Carla Mendes',
    date: '27/03/2024',
  },
  {
    id: 'equipamentos',
    title: 'Instalação de novos equipamentos',
    description:
      'Pedro Alves iniciou a tarefa de configuração dos equipamentos do laboratório.',
    status: 'Em andamento',
    priority: 'Média',
    owner: 'Pedro Alves',
    date: '25/03/2024',
  },
  {
    id: 'seguranca-acessos',
    title: 'Análise de segurança dos acessos',
    description:
      'Fernanda Lima solicitou a revisão dos perfis de acesso da rede.',
    status: 'Concluída',
    priority: 'Baixa',
    owner: 'Fernanda Lima',
    date: '22/03/2024',
  },
]

export const assignments: Assignment[] = [
  {
    id: 'sei-1234',
    title: 'Processo SEI 0001234/2024-56',
    subtitle: 'Contratação de serviço de nuvem',
    source: 'SEI',
    status: 'Em análise',
    owner: 'Ana Costa (Unidade de TI)',
    updated: 'há 2 horas',
    externalUrl: 'https://sei.ro.gov.br/',
  },
  {
    id: 'glpi-4587',
    title: 'Chamado #4587',
    subtitle: 'Instalação de equipamentos',
    source: 'GLPI',
    status: 'Concluído',
    owner: 'João Andrade (Suporte)',
    updated: 'há 4 horas',
    externalUrl: 'https://glpi-project.org/',
  },
  {
    id: 'link-internet',
    title: 'Instalação de link de internet',
    subtitle: 'Unidade Administrativa',
    source: 'Interno',
    status: 'Em andamento',
    owner: 'Carla Mendes (Infraestrutura)',
    updated: 'há 1 dia',
    externalUrl: 'https://www.rondonia.ro.gov.br/',
  },
  {
    id: 'sei-9876',
    title: 'Processo SEI 0009876/2024-12',
    subtitle: 'Aquisição de notebooks',
    source: 'SEI',
    status: 'Pendente',
    owner: 'Marcos Lima (Compras)',
    updated: 'há 1 dia',
    externalUrl: 'https://sei.ro.gov.br/',
  },
]

import type {
  IntegrationAdapter,
  IntegrationSource,
  ServiceCatalogItem,
  WorkItem,
} from '../types'

type AdapterSeed = {
  source: IntegrationSource
  items: WorkItem[]
  services: ServiceCatalogItem[]
}

class MockIntegrationAdapter implements IntegrationAdapter {
  source: IntegrationSource

  constructor(private seed: AdapterSeed) {
    this.source = seed.source
  }

  async listWorkItems() {
    return this.seed.items
  }

  async listServices() {
    return this.seed.services
  }
}

export const seiAdapter = new MockIntegrationAdapter({
  source: 'SEI',
  items: [
    {
      id: 'sei-0024-001234',
      externalId: '0024.001234/2026-11',
      source: 'SEI',
      kind: 'atribuicao',
      title: 'Processo 0024.001234/2026-11',
      description: 'Contratação de solução de monitoramento de serviços',
      status: 'Em análise',
      owner: 'Anderson Seixas · SETIC-GSERV',
      updated: 'há 18 min',
      attention: false,
      externalUrl: 'https://sei.ro.gov.br/',
      actionLabel: 'Abrir no SEI',
      capabilities: ['launch', 'read'],
    },
    {
      id: 'sei-0024-009112',
      externalId: '0024.009112/2026-73',
      source: 'SEI',
      kind: 'atribuicao',
      title: 'Processo 0024.009112/2026-73',
      description: 'Resposta técnica para contratação de serviço de TIC',
      status: 'Em análise',
      owner: 'Anderson Seixas · SETIC-GSERV',
      updated: 'há 8 dias',
      attention: true,
      metadata: {
        context: 'Mesa SEI · SETIC-GSERV',
        reason: 'Prazo vencido e sem movimentação relevante.',
        stale: 'Sem movimentação há 8 dias',
        deadline: '17/09/2026',
      },
      externalUrl: 'https://sei.ro.gov.br/',
      actionLabel: 'Abrir no SEI',
      capabilities: ['launch', 'read'],
    },
  ],
  services: [],
})

export const glpiAdapter = new MockIntegrationAdapter({
  source: 'GLPI',
  items: [
    {
      id: 'glpi-15284',
      externalId: '15284',
      source: 'GLPI',
      kind: 'atribuicao',
      title: 'Chamado #15284',
      description: 'Validação de indisponibilidade recorrente de serviço',
      status: 'Pendente',
      owner: 'Equipe GSERV',
      updated: 'há 6 dias',
      attention: true,
      metadata: {
        context: 'Fila de atendimento · GSERV',
        reason: 'Chamado próximo do limite esperado de atendimento.',
        stale: 'Sem movimentação há 6 dias',
        deadline: '19/09/2026',
      },
      externalUrl: 'https://glpi.sistemas.ro.gov.br/',
      actionLabel: 'Abrir no GLPI',
      capabilities: ['launch', 'read'],
    },
    {
      id: 'glpi-4587',
      externalId: '4587',
      source: 'GLPI',
      kind: 'atribuicao',
      title: 'Chamado #4587',
      description: 'Instalação de equipamentos',
      status: 'Concluído',
      owner: 'João Andrade · Suporte',
      updated: 'há 4 horas',
      externalUrl: 'https://glpi.sistemas.ro.gov.br/',
      actionLabel: 'Abrir no GLPI',
      capabilities: ['launch', 'read'],
    },
  ],
  services: [
    {
      id: 'glpi-suporte-ti',
      source: 'GLPI',
      title: 'Suporte de TI',
      description: 'Abra um chamado para atendimento técnico.',
      category: 'Tecnologia',
      externalUrl: 'https://glpi.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['suporte', 'chamado', 'computador', 'erro', 'ti'],
      featured: true,
      actionLabel: 'Abrir chamado',
    },
    {
      id: 'glpi-vpn',
      source: 'GLPI',
      title: 'Solicitar acesso VPN',
      description: 'Solicite ou regularize acesso remoto à rede institucional.',
      category: 'Acessos',
      externalUrl: 'https://glpi.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['vpn', 'remoto', 'rede', 'acesso'],
      featured: true,
      actionLabel: 'Solicitar',
    },
    {
      id: 'glpi-equipamentos',
      source: 'GLPI',
      title: 'Equipamentos e estação de trabalho',
      description: 'Solicite atendimento para computador, monitor ou periféricos.',
      category: 'Tecnologia',
      externalUrl: 'https://glpi.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['equipamento', 'computador', 'monitor', 'periférico', 'estação'],
      actionLabel: 'Abrir chamado',
    },
  ],
})

export const portalServidorAdapter = new MockIntegrationAdapter({
  source: 'PORTAL_SERVIDOR',
  items: [
    {
      id: 'portal-ferias-2027',
      source: 'PORTAL_SERVIDOR',
      kind: 'solicitacao',
      title: 'Marcação anual de férias',
      description: 'Férias programadas para o próximo exercício',
      status: 'Concluído',
      owner: 'RH Setorial',
      updated: 'há 1 dia',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      actionLabel: 'Ver no Portal',
      capabilities: ['launch'],
    },
    {
      id: 'portal-acesso-sei',
      source: 'PORTAL_SERVIDOR',
      kind: 'solicitacao',
      title: 'Solicitação de acesso ao SEI',
      description: 'Pedido de acesso para desempenho das funções',
      status: 'Em análise',
      owner: 'RH Setorial',
      updated: 'há 2 dias',
      attention: true,
      metadata: {
        context: 'Portal do Servidor · RH Setorial',
        reason: 'Solicitação funcional aguardando análise.',
        stale: 'Sem atualização há 2 dias',
        deadline: '—',
      },
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      actionLabel: 'Ver no Portal',
      capabilities: ['launch'],
    },
  ],
  services: [
    {
      id: 'portal-ferias',
      source: 'PORTAL_SERVIDOR',
      title: 'Marcação anual de férias',
      description: 'Programe suas férias para o próximo exercício.',
      category: 'RH',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['férias', 'ferias', 'marcação', 'programação'],
      featured: true,
      actionLabel: 'Solicitar',
      availabilityLabel: 'Conforme período anual de marcação',
    },
    {
      id: 'portal-banco-horas',
      source: 'PORTAL_SERVIDOR',
      title: 'Folga - banco de horas',
      description: 'Solicite utilização do saldo disponível no banco de horas.',
      category: 'RH',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['banco de horas', 'folga', 'compensação', 'saldo'],
      featured: true,
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-acesso-sei',
      source: 'PORTAL_SERVIDOR',
      title: 'Acesso ao SEI',
      description: 'Solicite habilitação de acesso ao Sistema Eletrônico de Informações.',
      category: 'Acessos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['sei', 'acesso', 'sistema eletrônico', 'habilitação'],
      featured: true,
      actionLabel: 'Solicitar acesso',
    },
    {
      id: 'portal-alterar-orgao-sei',
      source: 'PORTAL_SERVIDOR',
      title: 'Alterar órgão de acesso no SEI',
      description: 'Solicite alteração do órgão ou unidade vinculada ao seu acesso SEI.',
      category: 'Acessos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['sei', 'órgão', 'orgao', 'unidade', 'alterar acesso'],
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-acesso-sistemas',
      source: 'PORTAL_SERVIDOR',
      title: 'Acesso a sistemas do Poder Executivo',
      description: 'Solicite acesso a sistemas institucionais disponíveis para o seu perfil.',
      category: 'Acessos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['sistemas', 'acesso', 'permissão', 'permissao'],
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-ficha-financeira',
      source: 'PORTAL_SERVIDOR',
      title: 'Ficha financeira',
      description: 'Solicite cópia da ficha financeira do servidor.',
      category: 'Documentos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['ficha financeira', 'financeiro', 'documento', 'rendimentos'],
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-senha-contracheque',
      source: 'PORTAL_SERVIDOR',
      title: 'Senha de contracheque / Cédula C',
      description: 'Solicite emissão ou recuperação de senha para documentos financeiros.',
      category: 'Documentos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['contracheque', 'cédula c', 'cedula c', 'senha', 'holerite'],
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-alterar-senha-contracheque',
      source: 'PORTAL_SERVIDOR',
      title: 'Alterar senha do contracheque',
      description: 'Atualize a senha utilizada para acesso ao contracheque.',
      category: 'Documentos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['contracheque', 'senha', 'alterar senha'],
      actionLabel: 'Alterar',
    },
    {
      id: 'portal-certidao-negativa-cgr',
      source: 'PORTAL_SERVIDOR',
      title: 'Certidão negativa CGR',
      description: 'Solicite emissão de certidão negativa junto à Controladoria.',
      category: 'Documentos',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['certidão', 'certidao', 'cgr', 'negativa', 'controladoria'],
      actionLabel: 'Solicitar',
    },
    {
      id: 'portal-licenca-medica-curta',
      source: 'PORTAL_SERVIDOR',
      title: 'Licença médica de curta duração',
      description: 'Inicie solicitação de afastamento médico de curta duração.',
      category: 'Licenças',
      externalUrl: 'https://portaldoservidor.sistemas.ro.gov.br/',
      capabilities: ['launch'],
      keywords: ['licença médica', 'licenca medica', 'atestado', 'afastamento', 'saúde'],
      actionLabel: 'Solicitar',
    },
  ]
})

export const alphaAdapter = new MockIntegrationAdapter({
  source: 'ALPHA',
  items: [
    {
      id: 'alpha-1932',
      externalId: '1932',
      source: 'ALPHA',
      kind: 'atendimento',
      title: 'Atendimento #1932',
      description: 'Solicitação de atendimento ao cidadão',
      status: 'Pendente',
      owner: 'Fila da unidade',
      updated: 'há 38 min',
      attention: true,
      metadata: {
        context: 'Alpha · Fila da unidade',
        reason: 'Atendimento aguardando ação da unidade.',
        stale: 'Recebido há 38 min',
        deadline: 'Hoje',
      },
      externalUrl: 'https://alpha.sistemas.ro.gov.br/',
      actionLabel: 'Atender no Alpha',
      capabilities: ['launch', 'read'],
    },
  ],
  services: [],
})

export const internoAdapter = new MockIntegrationAdapter({
  source: 'INTERNO',
  items: [
    {
      id: 'interno-inventario-servicos',
      source: 'INTERNO',
      kind: 'atribuicao',
      title: 'Atualização do inventário de serviços',
      description: 'Consolidar informações pendentes das coordenações',
      status: 'Em andamento',
      owner: 'Anderson Seixas · SETIC-GSERV',
      updated: 'há 5 dias',
      attention: true,
      metadata: {
        context: 'Demanda interna · SETIC-GSERV',
        reason: 'Demanda com baixa movimentação recente.',
        stale: 'Sem movimentação há 5 dias',
        deadline: '20/09/2026',
      },
      externalUrl: 'https://www.rondonia.ro.gov.br/',
      actionLabel: 'Abrir demanda',
      capabilities: ['launch'],
    },
  ],
  services: [],
})

export const integrationAdapters: IntegrationAdapter[] = [
  seiAdapter,
  glpiAdapter,
  portalServidorAdapter,
  alphaAdapter,
  internoAdapter,
]

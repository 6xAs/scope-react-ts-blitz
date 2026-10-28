import {
  Activity,
  BadgeCheck,
  Building2,
  Database,
  KeyRound,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
} from 'lucide-react'
import '../dashboard-pages.css'

const modules = [
  { label: 'Projetos', value: 92 },
  { label: 'Tarefas', value: 88 },
  { label: 'Acompanhamentos', value: 81 },
  { label: 'Agenda', value: 74 },
  { label: 'Quadro de Servidores', value: 86 },
]

const units = [
  { name: 'SETIC-GSERV', members: 12, active: true },
  { name: 'SETIC-CGDI', members: 7, active: true },
  { name: 'SETIC-CGM', members: 5, active: true },
  { name: 'SETIC-COINFRA', members: 9, active: true },
]

export function Administration() {
  return (
    <div className="dashboard-page">
      <div className="title-row dashboard-title-row">
        <div>
          <h1>Administração</h1>
          <p>
            Configuração institucional, acessos, integrações e visão geral da operação.
          </p>
        </div>

        <span className="dashboard-period">Ambiente de demonstração</span>
      </div>

      <section className="dashboard-kpis admin-kpis">
        <article>
          <span className="dashboard-kpi-icon">
            <UsersRound size={19} />
          </span>
          <div>
            <small>Usuários cadastrados</small>
            <strong>48</strong>
            <span className="dashboard-kpi-trend positive">41 ativos</span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon">
            <Building2 size={19} />
          </span>
          <div>
            <small>Unidades configuradas</small>
            <strong>9</strong>
            <span className="dashboard-kpi-trend neutral">4 com gestão ativa</span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon">
            <KeyRound size={19} />
          </span>
          <div>
            <small>Perfis de acesso</small>
            <strong>6</strong>
            <span className="dashboard-kpi-trend neutral">Admin · Gestor · Membro</span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon">
            <ShieldCheck size={19} />
          </span>
          <div>
            <small>Conformidade simulada</small>
            <strong>94%</strong>
            <span className="dashboard-kpi-trend positive">Ambiente estável</span>
          </div>
        </article>
      </section>

      <section className="dashboard-grid-main">
        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Módulos</span>
              <h2>Nível de configuração</h2>
            </div>
            <SlidersHorizontal size={18} />
          </div>

          <div className="progress-list">
            {modules.map((module) => (
              <div className="progress-list-item" key={module.label}>
                <div>
                  <strong>{module.label}</strong>
                  <span>{module.value}%</span>
                </div>
                <div className="dashboard-progress">
                  <span style={{ width: `${module.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Ambiente</span>
              <h2>Serviços e integrações</h2>
            </div>
            <Activity size={18} />
          </div>

          <div className="integration-list">
            <div>
              <span className="integration-icon">
                <Database size={16} />
              </span>
              <div>
                <strong>Base institucional</strong>
                <small>Dados mockados do Scope</small>
              </div>
              <b className="integration-status online">Disponível</b>
            </div>

            <div>
              <span className="integration-icon">
                <BadgeCheck size={16} />
              </span>
              <div>
                <strong>SEI</strong>
                <small>Acompanhamento externo simulado</small>
              </div>
              <b className="integration-status simulated">Simulado</b>
            </div>

            <div>
              <span className="integration-icon">
                <Settings2 size={16} />
              </span>
              <div>
                <strong>GLPI</strong>
                <small>Fila operacional mockada</small>
              </div>
              <b className="integration-status simulated">Simulado</b>
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid-secondary admin-secondary">
        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Unidades</span>
              <h2>Estrutura habilitada</h2>
            </div>
            <Building2 size={18} />
          </div>

          <div className="admin-unit-list">
            {units.map((unit) => (
              <div key={unit.name}>
                <span className="admin-unit-dot" />
                <div>
                  <strong>{unit.name}</strong>
                  <small>{unit.members} membros vinculados</small>
                </div>
                <b>Ativa</b>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Governança</span>
              <h2>Controles administrativos</h2>
            </div>
            <ShieldCheck size={18} />
          </div>

          <div className="admin-control-list">
            <div>
              <span>Política de acesso por perfil</span>
              <strong>Configurada</strong>
            </div>
            <div>
              <span>Auditoria de movimentações</span>
              <strong>Ativa</strong>
            </div>
            <div>
              <span>Revisão periódica de permissões</span>
              <strong>Mensal</strong>
            </div>
            <div>
              <span>Retenção de histórico</span>
              <strong>24 meses</strong>
            </div>
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Capacidade</span>
              <h2>Uso institucional</h2>
            </div>
            <Database size={18} />
          </div>

          <div className="metric-stack">
            <div>
              <span>Usuários ativos</span>
              <strong>41 / 60</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <span>Projetos simultâneos</span>
              <strong>18 / 30</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '60%' }} />
              </div>
            </div>
            <div>
              <span>Armazenamento lógico</span>
              <strong>37%</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '37%' }} />
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

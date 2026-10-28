import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Gauge,
  Link2,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import '../dashboard-pages.css'

const monthlyActivity = [
  { month: 'Mai', value: 46 },
  { month: 'Jun', value: 58 },
  { month: 'Jul', value: 52 },
  { month: 'Ago', value: 67 },
  { month: 'Set', value: 73 },
  { month: 'Out', value: 81 },
]

const areaPerformance = [
  { label: 'GSERV', value: 84 },
  { label: 'Governança', value: 71 },
  { label: 'Infraestrutura', value: 64 },
  { label: 'Desenvolvimento', value: 78 },
  { label: 'Segurança', value: 69 },
]

const projectHealth = [
  { label: 'Saudáveis', value: 58, tone: 'good' },
  { label: 'Atenção', value: 27, tone: 'warning' },
  { label: 'Críticos', value: 15, tone: 'danger' },
]

export function Reports() {
  return (
    <div className="dashboard-page">
      <div className="title-row dashboard-title-row">
        <div>
          <h1>Relatórios</h1>
          <p>
            Visão consolidada de execução, participação e saúde operacional do Scope.
          </p>
        </div>

        <span className="dashboard-period">Outubro de 2026 · dados simulados</span>
      </div>

      <section className="dashboard-kpis">
        <article>
          <span className="dashboard-kpi-icon">
            <FolderKanban size={19} />
          </span>
          <div>
            <small>Projetos acompanhados</small>
            <strong>18</strong>
            <span className="dashboard-kpi-trend positive">
              <TrendingUp size={13} />
              +12% no período
            </span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon">
            <CheckCircle2 size={19} />
          </span>
          <div>
            <small>Tarefas concluídas</small>
            <strong>126</strong>
            <span className="dashboard-kpi-trend positive">
              <TrendingUp size={13} />
              +18% no período
            </span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon">
            <Link2 size={19} />
          </span>
          <div>
            <small>Acompanhamentos ativos</small>
            <strong>42</strong>
            <span className="dashboard-kpi-trend neutral">SEI · GLPI · Internos</span>
          </div>
        </article>

        <article>
          <span className="dashboard-kpi-icon warning">
            <AlertTriangle size={19} />
          </span>
          <div>
            <small>Itens em atenção</small>
            <strong>11</strong>
            <span className="dashboard-kpi-trend warning">4 acima do prazo</span>
          </div>
        </article>
      </section>

      <section className="dashboard-grid-main">
        <article className="dashboard-card dashboard-chart-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Atividade institucional</span>
              <h2>Movimentações registradas</h2>
            </div>
            <span className="dashboard-chip">Últimos 6 meses</span>
          </div>

          <div className="bar-chart" aria-label="Gráfico mockado de movimentações mensais">
            {monthlyActivity.map((item) => (
              <div className="bar-chart-item" key={item.month}>
                <div className="bar-chart-value">{item.value}</div>
                <div className="bar-chart-track">
                  <span style={{ height: `${item.value}%` }} />
                </div>
                <small>{item.month}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Saúde dos projetos</span>
              <h2>Distribuição atual</h2>
            </div>
            <Gauge size={19} />
          </div>

          <div className="health-ring-wrap">
            <div className="health-ring">
              <div>
                <strong>73%</strong>
                <span>saúde média</span>
              </div>
            </div>

            <div className="health-legend">
              {projectHealth.map((item) => (
                <div key={item.label}>
                  <i className={item.tone} />
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid-secondary">
        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Desempenho por área</span>
              <h2>Execução planejada</h2>
            </div>
            <BarChart3 size={18} />
          </div>

          <div className="progress-list">
            {areaPerformance.map((area) => (
              <div className="progress-list-item" key={area.label}>
                <div>
                  <strong>{area.label}</strong>
                  <span>{area.value}%</span>
                </div>
                <div className="dashboard-progress">
                  <span style={{ width: `${area.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Participação</span>
              <h2>Engajamento institucional</h2>
            </div>
            <UsersRound size={18} />
          </div>

          <div className="metric-stack">
            <div>
              <span>Servidores ativos no mês</span>
              <strong>34 / 41</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '83%' }} />
              </div>
            </div>
            <div>
              <span>Projetos com atualização semanal</span>
              <strong>13 / 18</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '72%' }} />
              </div>
            </div>
            <div>
              <span>Tarefas movimentadas no prazo</span>
              <strong>89%</strong>
              <div className="dashboard-progress compact">
                <span style={{ width: '89%' }} />
              </div>
            </div>
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-head">
            <div>
              <span className="dashboard-eyebrow">Tempo de resposta</span>
              <h2>Demandas acompanhadas</h2>
            </div>
            <Clock3 size={18} />
          </div>

          <div className="report-stat-list">
            <div>
              <span>SEI</span>
              <strong>1d 6h</strong>
              <small>tempo médio até nova movimentação</small>
            </div>
            <div>
              <span>GLPI</span>
              <strong>4h 18m</strong>
              <small>tempo médio de atualização</small>
            </div>
            <div>
              <span>Demandas internas</span>
              <strong>9h 42m</strong>
              <small>tempo médio de resposta</small>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

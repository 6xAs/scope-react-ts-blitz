import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Assignments } from './pages/Assignments'
import { Home } from './pages/Home'
import { Kanban } from './pages/Kanban'
import { Projects } from './pages/Projects'
import { Tasks } from './pages/Tasks'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/atribuicoes" element={<Assignments />} />
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/kanban/:kind/:id" element={<Kanban />} />
        <Route
          path="/relatorios"
          element={
            <div className="empty-page">
              <h1>Relatórios</h1>
              <p>Área reservada para a próxima etapa do protótipo.</p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

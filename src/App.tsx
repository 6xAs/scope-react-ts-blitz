import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Administration } from './pages/Administration'
import { Assignments } from './pages/Assignments'
import { Home } from './pages/Home'
import { Kanban } from './pages/Kanban'
import { Projects } from './pages/Projects'
import { Reports } from './pages/Reports'
import { StaffBoard } from './pages/StaffBoard'
import { Tasks } from './pages/Tasks'

export default function App() {
  return (
    <Routes>
      <Route path="/kanban/:kind/:id" element={<Kanban />} />

      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/atribuicoes" element={<Assignments />} />
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/quadro-servidores" element={<StaffBoard />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/administracao" element={<Administration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

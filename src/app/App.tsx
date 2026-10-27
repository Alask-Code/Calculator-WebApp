import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Shell } from '../components/Shell'
const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })))
const CalculatorPage = lazy(() =>
  import('../pages/CalculatorPage').then((m) => ({ default: m.CalculatorPage })),
)
export default function App() {
  return (
    <Suspense
      fallback={
        <div className="wrap loading" role="status">
          Carregando calculadora…
        </div>
      }
    >
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="calculadora/:id" element={<CalculatorPage />} />
          <Route
            path="*"
            element={
              <div className="wrap not-found">
                <span className="eyebrow">404 · OPS!</span>
                <h1>Essa página não existe.</h1>
                <a className="button primary" href="/Calculator-WebApp/">
                  Voltar ao início
                </a>
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Calculator, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { usePreferences } from '../store/usePreferences'
import { AdCard } from './AdCard'
export function Shell() {
  const [open, setOpen] = useState(false)
  const [showAd, setShowAd] = useState(true)
  const theme = usePreferences((state) => state.theme)
  const toggleTheme = usePreferences((state) => state.toggleTheme)
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#171b23' : '#f4f5f7')
  }, [theme])
  useEffect(() => {
    if (showAd) {
      return
    }
    const timer = window.setTimeout(() => setShowAd(true), 60_000)
    return () => window.clearTimeout(timer)
  }, [showAd])
  return (
    <div className="desktop w-full" data-theme={theme}>
      <header className="site-header w-full">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <Calculator size={19} />
          </span>
          <span>
            calcula<span className="brand-dot">.</span>
          </span>
        </Link>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar navegação' : 'Abrir navegação'}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Início
          </NavLink>
          <a href="#ferramentas" onClick={() => setOpen(false)}>
            Calculadoras
          </a>
          <a href="#sobre" onClick={() => setOpen(false)}>
            Sobre
          </a>
          <a href="#faq-home" onClick={() => setOpen(false)}>
            Dúvidas
          </a>
        </nav>
        <a className="header-cta" href="#ferramentas">
          <Search size={16} /> Encontrar ferramenta
        </a>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer w-full">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <Calculator size={17} />
          </span>
          <span>
            calcula<span className="brand-dot">.</span>
          </span>
        </Link>
        <span>Feito para deixar as contas mais simples.</span>
        <span>© 2026 Calcula · Resultados são estimativas</span>
      </footer>
      {showAd && <AdCard onClose={() => setShowAd(false)} />}
    </div>
  )
}

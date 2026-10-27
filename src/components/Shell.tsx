import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Calculator, Menu, Search, X } from 'lucide-react'
export function Shell() {
  const [open, setOpen] = useState(false)
  return (
    <div className="desktop">
      <div className="window-bar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>Calcula — ferramentas para o dia a dia</span>
        <div className="window-controls">
          <span>−</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <Calculator size={19} />
          </span>
          <span>
            calcula<span className="brand-dot">.</span>
          </span>
        </Link>
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
      <footer className="footer">
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
    </div>
  )
}

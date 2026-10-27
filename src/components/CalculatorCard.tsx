import { Link } from 'react-router-dom'
import { ArrowUpRight, Star } from 'lucide-react'
import type { Calculator } from '../lib/calculations'
import { usePreferences } from '../store/usePreferences'
export function CalculatorCard({ item }: { item: Calculator }) {
  const favorite = usePreferences((s) => s.favorites.includes(item.id))
  const toggle = usePreferences((s) => s.toggleFavorite)
  return (
    <article className="calc-card">
      <div className="card-top">
        <span className={`calc-icon ${item.color}`}>{item.icon}</span>
        <button
          className={`icon-button favorite ${favorite ? 'selected' : ''}`}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorite}
          onClick={() => toggle(item.id)}
        >
          <Star size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <span className="eyebrow">{item.category}</span>
      <h3>{item.title}</h3>
      <p>{item.short}</p>
      <Link className="card-link" to={`/calculadora/${item.id}`}>
        Abrir calculadora <ArrowUpRight size={16} />
      </Link>
    </article>
  )
}

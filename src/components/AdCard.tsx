import { X } from 'lucide-react'

type AdCardProps = {
  onClose: () => void
}

export function AdCard({ onClose }: AdCardProps) {
  return (
    <aside className="ad-overlay" aria-label="Anúncio demonstrativo">
      <div className="ad-overlay-top">
        <span>
          <i /> Anúncio demonstrativo
        </span>
        <button
          className="ad-overlay-close"
          onClick={onClose}
          aria-label="Fechar anúncio"
          title="Fechar"
        >
          <X size={15} />
        </button>
      </div>
      <iframe
        className="ad-overlay-frame"
        src="https://asiafilm.org/4/e6790653517715244517e6cfb0050faf"
        title="Conteúdo do anúncio"
      />
      <p className="ad-overlay-footnote">Prévia ilustrativa · sem conteúdo externo</p>
    </aside>
  )
}

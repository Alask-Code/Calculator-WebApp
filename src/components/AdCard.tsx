import { X } from 'lucide-react'

type AdCardProps = {
  onClose: () => void
}

export function AdCard({ onClose }: AdCardProps) {
  return (
    <aside className="ad-overlay" aria-label="Anúncio demonstrativo">
      <div className="ad-overlay-top">
        <span>
          <i /> Anúncios de Terceiros
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
        src="https://araplhn.org/4/b175bd1f254a44ccae4fc193be9cfe0d"
        title="Conteúdo do anúncio"
      />
      <p className="ad-overlay-footnote">Possível conteudo explicito</p>
    </aside>
  )
}

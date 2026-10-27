import { usePreferences } from '../store/usePreferences'
import { X } from 'lucide-react'

type AdCardProps = {
  title: string
  description: string
  onClose: () => void
  accent?: string
}

function createMockAd(title: string, description: string, accent: string, theme: 'light' | 'dark') {
  const darkTheme =
    theme === 'dark'
      ? 'body{background:#202632;color:#e8ebf2}.ad{background:linear-gradient(125deg,#252d3a 15%,#202a40)}.label{color:#a7afbf}.title{color:#f0f2f7}.description{color:#c0c6d2}'
      : ''
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
    *{box-sizing:border-box}body{margin:0;background:#f6f7fb;color:#22283a;font:14px Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}.ad{height:100%;min-height:126px;padding:18px;display:flex;align-items:center;gap:16px;background:linear-gradient(125deg,#fff 15%,#f3f5ff)}.badge{width:43px;height:43px;flex:0 0 43px;display:grid;place-items:center;border-radius:14px;background:${accent};color:#fff;font-size:21px;font-weight:700}.copy{min-width:0}.label{margin:0 0 5px;color:#7c8493;font-size:9px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase}.title{margin:0;color:#202638;font-size:16px;font-weight:700;line-height:1.2}.description{margin:6px 0 0;color:#737b8b;font-size:11px;line-height:1.45}.cta{display:inline-block;margin-top:9px;padding:7px 10px;border-radius:7px;background:${accent};color:white;font-size:10px;font-weight:700}
    @media(max-width:460px){.ad{min-height:118px;padding:13px;gap:11px}.badge{width:36px;height:36px;flex-basis:36px;border-radius:11px}.title{font-size:14px}.description{font-size:10px}}
  ${darkTheme}</style></head><body><div class="ad"><div class="badge" aria-hidden="true">✦</div><div class="copy"><p class="label">Demonstração de anúncio</p><h2 class="title">${title}</h2><p class="description">${description}</p><span class="cta">Exemplo de chamada</span></div></div></body></html>`
}

export function AdCard({ title, description, onClose, accent = '#586fe2' }: AdCardProps) {
  const theme = usePreferences((state) => state.theme)
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
        title={`Anúncio demonstrativo: ${title}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox=""
        srcDoc={createMockAd(title, description, accent, theme)}
      />
      <p className="ad-overlay-footnote">Prévia ilustrativa · sem conteúdo externo</p>
    </aside>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Delete, Check, Copy, RotateCcw, ShieldAlert } from 'lucide-react'
import {
  budget,
  calculators,
  compoundInterest,
  energyConsumption,
  money,
  number,
  percentage,
  profitMargin,
} from '../lib/calculations'
import type { CalculatorId } from '../lib/calculations'
import { CalculatorCard } from '../components/CalculatorCard'

type Field = {
  key: string
  label: string
  unit?: string
  initial: number
  min?: number
  max?: number
  step?: number
  hint?: string
}
const fields: Record<CalculatorId, Field[]> = {
  porcentagem: [
    { key: 'base', label: 'Valor base', unit: 'R$', initial: 240, min: 0, step: 0.01 },
    { key: 'rate', label: 'Porcentagem', unit: '%', initial: 15, min: 0, max: 1000, step: 0.1 },
  ],
  'juros-compostos': [
    { key: 'principal', label: 'Valor inicial', unit: 'R$', initial: 1000, min: 0, step: 0.01 },
    { key: 'rate', label: 'Taxa mensal', unit: '%', initial: 1, min: 0, max: 100, step: 0.01 },
    { key: 'periods', label: 'Prazo', unit: 'meses', initial: 12, min: 1, max: 120, step: 1 },
    { key: 'monthly', label: 'Aporte mensal', unit: 'R$', initial: 0, min: 0, step: 0.01 },
  ],
  'margem-de-lucro': [
    { key: 'cost', label: 'Custo do produto', unit: 'R$', initial: 90, min: 0, step: 0.01 },
    { key: 'sale', label: 'Preço de venda', unit: 'R$', initial: 150, min: 0, step: 0.01 },
  ],
  'consumo-de-energia': [
    { key: 'watts', label: 'Potência', unit: 'W', initial: 100, min: 0, step: 1 },
    { key: 'hours', label: 'Uso diário', unit: 'h/dia', initial: 8, min: 0, max: 24, step: 0.5 },
    { key: 'days', label: 'Dias no mês', unit: 'dias', initial: 30, min: 1, max: 31, step: 1 },
    {
      key: 'tariff',
      label: 'Tarifa de energia',
      unit: 'R$/kWh',
      initial: 0.85,
      min: 0,
      step: 0.01,
    },
  ],
  orcamento: [
    { key: 'income', label: 'Renda mensal', unit: 'R$', initial: 5000, min: 0, step: 0.01 },
    { key: 'needs', label: 'Necessidades', unit: 'R$', initial: 2500, min: 0, step: 0.01 },
    { key: 'wants', label: 'Desejos', unit: 'R$', initial: 1500, min: 0, step: 0.01 },
    { key: 'savings', label: 'Investimentos', unit: 'R$', initial: 1000, min: 0, step: 0.01 },
  ],
}

export function CalculatorPage() {
  const { id } = useParams()
  const calc = calculators.find((item) => item.id === id)
  if (!calc) {
    return (
      <div className="not-found wrap">
        <h1>Calculadora não encontrada</h1>
        <Link to="/">Voltar ao início</Link>
      </div>
    )
  }
  return <CalculatorDetail key={calc.id} id={calc.id} />
}

function CalculatorDetail({ id }: { id: CalculatorId }) {
  const calc = calculators.find((item) => item.id === id)!
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields[id].map((field) => [field.key, String(field.initial)])),
  )
  const [activeKey, setActiveKey] = useState(fields[id][0].key)
  const [copied, setCopied] = useState(false)
  const activeField = fields[id].find((field) => field.key === activeKey) ?? fields[id][0]
  const values = Object.fromEntries(
    fields[id].map((field) => [field.key, Number(drafts[field.key]) || 0]),
  ) as Record<string, number>
  const activeInvalid =
    values[activeField.key] < (activeField.min ?? 0) ||
    (activeField.max !== undefined && values[activeField.key] > activeField.max)
  const update = (key: string, value: string) =>
    setDrafts((current) => ({ ...current, [key]: value }))
  const reset = () =>
    setDrafts(Object.fromEntries(fields[id].map((field) => [field.key, String(field.initial)])))

  const pressKey = (key: string) => {
    const current = drafts[activeField.key] || '0'
    if (key === 'clear') {
      return update(activeField.key, '0')
    }
    if (key === 'backspace') {
      return update(activeField.key, current.length > 1 ? current.slice(0, -1) : '0')
    }
    if (key === 'sign') {
      return update(activeField.key, current.startsWith('-') ? current.slice(1) : `-${current}`)
    }
    if (key === '.') {
      return update(activeField.key, current.includes('.') ? current : `${current}.`)
    }
    update(activeField.key, current === '0' ? key : `${current}${key}`)
  }

  const result = useMemo(() => {
    switch (id) {
      case 'porcentagem': {
        const amount = percentage(values.base, values.rate)
        return {
          primary: money(amount),
          label: `${number(values.rate)}% de ${money(values.base)}`,
          extra: [
            ['Valor original', money(values.base)],
            ['Percentual', `${number(values.rate)}%`],
            ['Com acréscimo', money(values.base + amount)],
            ['Com desconto', money(values.base - amount)],
          ],
        }
      }
      case 'juros-compostos': {
        const estimate = compoundInterest(
          values.principal,
          values.rate,
          values.periods,
          values.monthly,
        )
        return {
          primary: money(estimate.future),
          label: 'Montante ao final do período',
          extra: [
            ['Total investido', money(estimate.invested)],
            ['Rendimento estimado', money(estimate.interest)],
            ['Taxa mensal', `${number(values.rate)}%`],
            ['Prazo', `${number(values.periods, 0)} meses`],
          ],
        }
      }
      case 'margem-de-lucro': {
        const margin = profitMargin(values.cost, values.sale)
        return {
          primary: money(margin.profit),
          label: 'Lucro bruto por unidade',
          extra: [
            ['Margem de lucro', `${number(margin.margin)}%`],
            ['Markup sobre custo', `${number(margin.markup)}%`],
            ['Custo', money(values.cost)],
            ['Preço de venda', money(values.sale)],
          ],
          warning: values.sale < values.cost ? 'O preço de venda está abaixo do custo.' : '',
        }
      }
      case 'consumo-de-energia': {
        const estimate = energyConsumption(values.watts, values.hours, values.days, values.tariff)
        return {
          primary: money(estimate.cost),
          label: 'Custo mensal estimado',
          extra: [
            ['Consumo estimado', `${number(estimate.kwh)} kWh`],
            ['Tarifa utilizada', `${money(values.tariff)}/kWh`],
            ['Potência', `${number(values.watts, 0)} W`],
            ['Período', `${number(values.days, 0)} dias`],
          ],
        }
      }
      case 'orcamento': {
        const plan = budget(values.income, values.needs, values.wants, values.savings)
        return {
          primary: money(plan.balance),
          label: plan.balance >= 0 ? 'Saldo disponível' : 'Valor acima da renda',
          extra: [
            ['Necessidades', `${money(values.needs)} · ${number(plan.needsPct)}%`],
            ['Desejos', `${money(values.wants)} · ${number(plan.wantsPct)}%`],
            ['Objetivos', `${money(values.savings)} · ${number(plan.savingsPct)}%`],
            ['Total planejado', money(plan.total)],
          ],
          warning: plan.balance < 0 ? 'As despesas planejadas ultrapassam a renda informada.' : '',
        }
      }
    }
  }, [
    id,
    values.base,
    values.rate,
    values.principal,
    values.periods,
    values.monthly,
    values.cost,
    values.sale,
    values.watts,
    values.hours,
    values.days,
    values.tariff,
    values.income,
    values.needs,
    values.wants,
    values.savings,
  ])

  const invalid = fields[id].some(
    (field) =>
      values[field.key] < (field.min ?? 0) ||
      (field.max !== undefined && values[field.key] > field.max),
  )
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${calc.title}: ${result.primary} — ${result.label}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  useEffect(() => {
    document.title = `${calc.title} — Calcula`
    document.querySelector('meta[name="description"]')?.setAttribute('content', calc.description)
    return () => {
      document.title = 'Calcula — ferramentas para o dia a dia'
    }
  }, [calc])

  const related = calculators.filter((item) => item.id !== id).slice(0, 3)
  const keypad = [
    '7',
    '8',
    '9',
    'backspace',
    '4',
    '5',
    '6',
    'sign',
    '1',
    '2',
    '3',
    'clear',
    '0',
    '.',
    '00',
    'enter',
  ]
  return (
    <div className="calculator-page">
      <div className="wrap">
        <div className="breadcrumbs">
          <Link to="/">
            <ArrowLeft size={15} /> Todas as calculadoras
          </Link>
          <span>/</span>
          <span>{calc.title}</span>
        </div>
        <section className="calc-intro">
          <div>
            <span className="eyebrow">{calc.category.toUpperCase()} · CALCULADORA GRATUITA</span>
            <h1>{calc.title}</h1>
            <p>{calc.description}</p>
          </div>
          <span className={`calc-icon large ${calc.color}`}>{calc.icon}</span>
        </section>
        <div className="calculator-layout">
          <section
            className="form-panel calculator-machine"
            aria-label={`Calculadora de ${calc.title}`}
          >
            <div className="machine-titlebar">
              <span>{calc.title}</span>
              <button
                className="machine-reset"
                onClick={reset}
                aria-label="Restaurar valores padrão"
                title="Restaurar valores padrão"
              >
                <RotateCcw size={15} />
              </button>
            </div>
            <div className="machine-screen">
              <label htmlFor="active-value">
                {activeField.label}
                <span>{activeField.unit}</span>
              </label>
              <div className="machine-input-row">
                <span className="machine-currency">{activeField.unit === 'R$' ? 'R$' : ''}</span>
                <input
                  id="active-value"
                  type="number"
                  inputMode="decimal"
                  min={activeField.min ?? 0}
                  max={activeField.max}
                  step={activeField.step ?? 'any'}
                  value={drafts[activeField.key]}
                  aria-invalid={activeInvalid}
                  onChange={(event) => update(activeField.key, event.target.value)}
                />
                <span className="machine-unit">
                  {activeField.unit === 'R$' ? '' : activeField.unit}
                </span>
              </div>
              <span className="machine-hint">Toque em um campo abaixo para editar</span>
            </div>
            <div className="machine-fields" aria-label="Campos da calculadora">
              {fields[id].map((field) => {
                const fieldInvalid =
                  values[field.key] < (field.min ?? 0) ||
                  (field.max !== undefined && values[field.key] > field.max)
                return (
                  <button
                    key={field.key}
                    className={`machine-field ${field.key === activeField.key ? 'active' : ''} ${fieldInvalid ? 'field-error' : ''}`}
                    onClick={() => setActiveKey(field.key)}
                    aria-pressed={field.key === activeField.key}
                  >
                    <span>{field.label}</span>
                    <strong>
                      {field.unit === 'R$'
                        ? money(values[field.key])
                        : `${number(values[field.key])} ${field.unit ?? ''}`}
                    </strong>
                  </button>
                )
              })}
            </div>
            <div className="machine-keypad" aria-label="Teclado numérico">
              {keypad.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`key ${key === 'enter' ? 'key-enter' : ''} ${['backspace', 'clear', 'sign'].includes(key) ? 'key-function' : ''}`}
                  aria-label={
                    {
                      backspace: 'Apagar último dígito',
                      clear: 'Limpar campo selecionado',
                      sign: 'Inverter sinal',
                      enter: 'Selecionar próximo campo',
                      '.': 'Separador decimal',
                    }[key] ?? key
                  }
                  onClick={() =>
                    key === 'enter'
                      ? setActiveKey(
                          fields[id][
                            (fields[id].findIndex((field) => field.key === activeField.key) + 1) %
                              fields[id].length
                          ].key,
                        )
                      : pressKey(key)
                  }
                >
                  {key === 'backspace' ? (
                    <Delete size={18} />
                  ) : key === 'clear' ? (
                    'AC'
                  ) : key === 'sign' ? (
                    '±'
                  ) : key === 'enter' ? (
                    '↵'
                  ) : key === '.' ? (
                    ','
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
            {invalid && (
              <p className="machine-error" role="alert">
                Confira os campos destacados e os limites indicados.
              </p>
            )}
            <p className="privacy-note">
              <ShieldAlert size={15} /> Seus dados são calculados apenas neste dispositivo.
            </p>
          </section>
          <section className="result-panel" aria-live="polite">
            <div className="result-label">RESULTADO ESTIMADO</div>
            <div className="result-value">{result.primary}</div>
            <p className="result-description">{result.label}</p>
            {result.warning && <p className="warning">{result.warning}</p>}
            <div className="result-divider" />
            <dl className="result-details">
              {result.extra.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <button className="button copy-button" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}{' '}
              {copied ? 'Copiado!' : 'Copiar resultado'}
            </button>
          </section>
        </div>
        <section className="explainer-grid">
          <article className="info-panel">
            <span className="eyebrow">ENTENDA O CÁLCULO</span>
            <h2>Como funciona</h2>
            <p>{calc.description}</p>
            <div className="formula">
              <span>FÓRMULA UTILIZADA</span>
              <strong>{calc.formula}</strong>
            </div>
          </article>
          <article className="info-panel example-panel">
            <span className="eyebrow">EXEMPLO PRÁTICO</span>
            <h2>Na prática</h2>
            <p>{calc.example}</p>
            <div className="assumption">
              <strong>Premissas</strong>
              <span>
                Estimativa matemática com os valores informados. Arredondamentos podem ocorrer.
              </span>
            </div>
          </article>
        </section>
        <section className="detail-faq">
          <span className="eyebrow">DÚVIDAS FREQUENTES</span>
          <h2>Sobre {calc.title.toLowerCase()}</h2>
          <div>
            {calc.faq.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span>+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="related">
          <div className="section-head">
            <div>
              <span className="eyebrow">CONTINUE POR AQUI</span>
              <h2>Outras calculadoras</h2>
            </div>
            <Link to="/" className="text-button">
              Ver todas <ArrowLeft className="flip" size={15} />
            </Link>
          </div>
          <div className="card-grid">
            {related.map((item) => (
              <CalculatorCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        <p className="disclaimer">
          Os resultados são estimativas informativas e não substituem orientação financeira,
          contábil ou técnica profissional quando necessária.
        </p>
      </div>
    </div>
  )
}

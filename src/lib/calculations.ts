export const money = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number.isFinite(v) ? v : 0,
  )
export const number = (v: number, d = 2) =>
  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: d }).format(Number.isFinite(v) ? v : 0)
export function percentage(base: number, rate: number) {
  return (base * rate) / 100
}
export function compoundInterest(principal: number, rate: number, periods: number, monthly = 0) {
  const factor = (1 + rate / 100) ** periods
  const future =
    principal * factor + (rate === 0 ? monthly * periods : monthly * ((factor - 1) / (rate / 100)))
  return {
    future,
    invested: principal + monthly * periods,
    interest: future - principal - monthly * periods,
  }
}
export function profitMargin(cost: number, sale: number) {
  return {
    profit: sale - cost,
    margin: sale > 0 ? ((sale - cost) / sale) * 100 : 0,
    markup: cost > 0 ? ((sale - cost) / cost) * 100 : 0,
  }
}
export function energyConsumption(watts: number, hours: number, days: number, tariff: number) {
  const kwh = (watts / 1000) * hours * days
  return { kwh, cost: kwh * tariff }
}
export function budget(income: number, needs: number, wants: number, savings: number) {
  const total = needs + wants + savings
  return {
    total,
    balance: income - total,
    needsPct: income ? (needs / income) * 100 : 0,
    wantsPct: income ? (wants / income) * 100 : 0,
    savingsPct: income ? (savings / income) * 100 : 0,
  }
}
export type CalculatorId =
  'porcentagem' | 'juros-compostos' | 'margem-de-lucro' | 'consumo-de-energia' | 'orcamento'
export type Calculator = {
  id: CalculatorId
  title: string
  short: string
  description: string
  category: string
  icon: string
  color: string
  formula: string
  example: string
  faq: { q: string; a: string }[]
}
export const calculators: Calculator[] = [
  {
    id: 'porcentagem',
    title: 'Porcentagem',
    short: 'Descubra quanto representa uma porcentagem de qualquer valor.',
    description: 'Calcule percentuais, descontos e acréscimos de forma rápida.',
    category: 'Matemática',
    icon: '%',
    color: 'violet',
    formula: 'Resultado = valor × porcentagem ÷ 100',
    example: '15% de R$ 200,00 corresponde a R$ 30,00.',
    faq: [
      {
        q: 'Como calcular uma porcentagem?',
        a: 'Multiplique o valor pela porcentagem e divida o resultado por 100.',
      },
      {
        q: 'Como calcular um desconto?',
        a: 'Subtraia o valor percentual do preço original para encontrar o preço final.',
      },
    ],
  },
  {
    id: 'juros-compostos',
    title: 'Juros compostos',
    short: 'Projete o crescimento do seu dinheiro ao longo do tempo.',
    description: 'Simule o valor futuro de um investimento com aportes mensais.',
    category: 'Finanças',
    icon: '↗',
    color: 'blue',
    formula: 'Montante = capital × (1 + taxa)ᵗ + aportes capitalizados',
    example: 'R$ 1.000 a 1% ao mês por 12 meses, sem aportes, chega a aproximadamente R$ 1.126,83.',
    faq: [
      {
        q: 'O que são juros compostos?',
        a: 'São juros calculados sobre o saldo acumulado, incluindo os juros de períodos anteriores.',
      },
      {
        q: 'A taxa deve ser mensal ou anual?',
        a: 'Use taxa mensal quando o prazo for informado em meses. Converta a taxa para a mesma unidade do prazo.',
      },
    ],
  },
  {
    id: 'margem-de-lucro',
    title: 'Margem de lucro',
    short: 'Entenda seu lucro e a margem sobre o preço de venda.',
    description: 'Compare custo e preço de venda para conhecer margem e markup.',
    category: 'Negócios',
    icon: '◒',
    color: 'orange',
    formula: 'Lucro = venda − custo · Margem = lucro ÷ venda × 100',
    example:
      'Um produto vendido por R$ 150 com custo de R$ 90 gera R$ 60 de lucro e margem de 40%.',
    faq: [
      {
        q: 'Margem e markup são iguais?',
        a: 'Não. Margem divide o lucro pelo preço de venda; markup divide pelo custo.',
      },
      {
        q: 'O resultado considera impostos?',
        a: 'Não. Inclua impostos, taxas e despesas no custo para estimar uma margem mais realista.',
      },
    ],
  },
  {
    id: 'consumo-de-energia',
    title: 'Consumo de energia',
    short: 'Estime o gasto mensal dos seus aparelhos elétricos.',
    description: 'Calcule consumo em kWh e custo mensal aproximado por aparelho.',
    category: 'Casa',
    icon: 'ϟ',
    color: 'green',
    formula: 'Consumo = potência (kW) × horas/dia × dias · Custo = kWh × tarifa',
    example: 'Um aparelho de 100 W ligado por 8 horas ao dia consome 24 kWh em 30 dias.',
    faq: [
      {
        q: 'Onde encontro a potência do aparelho?',
        a: 'Procure a etiqueta de eficiência ou a especificação técnica do fabricante.',
      },
      {
        q: 'A tarifa é o valor total da conta?',
        a: 'Use o preço por kWh da sua conta. O cálculo não considera bandeiras e cobranças fixas.',
      },
    ],
  },
  {
    id: 'orcamento',
    title: 'Planejamento de orçamento',
    short: 'Organize sua renda entre necessidades, desejos e objetivos.',
    description: 'Distribua a renda mensal e visualize quanto sobra ou falta.',
    category: 'Finanças',
    icon: '▤',
    color: 'pink',
    formula: 'Saldo = renda − (necessidades + desejos + objetivos)',
    example:
      'A regra 50/30/20 sugere destinar 50% a necessidades, 30% a desejos e 20% a objetivos.',
    faq: [
      {
        q: 'O que entra em necessidades?',
        a: 'Moradia, alimentação básica, transporte, saúde e contas essenciais.',
      },
      {
        q: 'A regra 50/30/20 é obrigatória?',
        a: 'Não. É uma referência flexível; ajuste as categorias à sua realidade.',
      },
    ],
  },
]

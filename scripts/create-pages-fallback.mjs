import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = 'dist'
const html = await readFile(join(root, 'index.html'), 'utf8')
const routes = [
  [
    'calculadora/porcentagem',
    'Porcentagem',
    'Calcule percentuais, descontos e acréscimos de forma rápida.',
  ],
  [
    'calculadora/juros-compostos',
    'Juros compostos',
    'Projete o valor futuro de um investimento com juros compostos e aportes mensais.',
  ],
  [
    'calculadora/margem-de-lucro',
    'Margem de lucro',
    'Calcule lucro, margem de lucro e markup do seu produto.',
  ],
  [
    'calculadora/consumo-de-energia',
    'Consumo de energia',
    'Estime o consumo em kWh e o custo mensal dos seus aparelhos.',
  ],
  [
    'calculadora/orcamento',
    'Planejamento de orçamento',
    'Organize a renda mensal entre necessidades, desejos e objetivos.',
  ],
]

// GitHub Pages serves 404.html for deep links. Keep the requested URL so
// BrowserRouter can render the route and route metadata can be set on load.
await copyFile(join(root, 'index.html'), join(root, '404.html'))
for (const [route, title, description] of routes) {
  const directory = join(root, route)
  await mkdir(directory, { recursive: true })
  const page = html
    .replace(
      '<title>Calcula — ferramentas para o dia a dia</title>',
      `<title>${title} — Calcula</title>`,
    )
    .replace(
      'content="Calculadoras gratuitas para decisões do dia a dia: porcentagem, juros compostos, margem, energia e orçamento."',
      `content="${description}"`,
    )
  await writeFile(join(directory, 'index.html'), page)
}

const owner = process.env.GITHUB_REPOSITORY_OWNER
if (owner) {
  const sitemapPath = join(root, 'sitemap.xml')
  const sitemap = await readFile(sitemapPath, 'utf8')
  await writeFile(sitemapPath, sitemap.replaceAll('GITHUB_OWNER', owner))
  await writeFile(
    join(root, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: https://${owner}.github.io/Calculator-WebApp/sitemap.xml\n`,
  )
}

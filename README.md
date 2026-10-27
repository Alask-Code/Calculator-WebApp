# Calcula — portal de calculadoras

Portal estático em React, TypeScript e Vite, com Tailwind CSS, React Router e Zustand. As operações são executadas no navegador e não há API, conta ou serviço de backend.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Qualidade de código

O ESLint verifica TypeScript, React Hooks e regras de código seguro; o Prettier padroniza o formato.

```bash
npm run lint
npm run format
npm run format:check
```

O workflow do GitHub executa as verificações de formatação e lint antes de compilar e publicar.

## GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica o diretório `dist` automaticamente após um push para `main`. Em **Settings → Pages**, selecione **GitHub Actions** como origem. O endereço base do Vite está configurado para o repositório `Calculator-WebApp`. O build prepara rotas independentes e uma página de fallback para links profundos no GitHub Pages.

Se o nome do repositório mudar, atualize o `base` em `vite.config.ts` e o caminho usado pelo script `scripts/create-pages-fallback.mjs`. O workflow preenche o proprietário real do repositório no `robots.txt` e no `sitemap.xml`.

## Ferramentas incluídas

- Porcentagem, desconto e acréscimo.
- Juros compostos com aportes mensais.
- Margem de lucro e markup.
- Consumo e custo de energia.
- Planejamento de orçamento baseado em renda.

Favoritos e preferências são armazenados somente no `localStorage` e podem ser removidos pelo usuário nas configurações de armazenamento do navegador. Valores dos formulários não são persistidos.

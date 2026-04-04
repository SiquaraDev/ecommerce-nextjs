# 🛍️ Siquara Store

Uma aplicação de e-commerce moderna construída com Next.js 15, com design limpo, responsivo e suporte a modo escuro.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Funcionalidades

- 🌓 Modo escuro/claro com detecção da preferência do sistema e sem flash ao carregar
- 🛒 Carrinho de compras completo com controle de quantidade
- 🔍 Busca de produtos em tempo real
- 📦 Ordenação de produtos (A-Z, Z-A, preço)
- 🏷️ Ofertas diárias que atualizam todo dia à meia-noite
- 📂 Produtos organizados por categoria com navegação sticky
- 📱 Totalmente responsivo — mobile, tablet e desktop
- ⚡ Renderização no servidor com Next.js App Router
- 🔄 ISR (Regeneração Estática Incremental) para dados de produtos

## 🚀 Como começar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
git clone https://github.com/seu-usuario/siquara-store.git
cd siquara-store
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
REVALIDATE_SECRET=seu_secret_aleatorio_aqui
```

Para gerar um secret seguro:

```bash
openssl rand -base64 32
```

### Rodando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para produção

```bash
npm run build
npm start
```

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── (store)/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── offers/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── revalidate-deals/
│   │       └── route.ts
│   ├── not-found.tsx
│   └── layout.tsx
├── components/
│   ├── cart/
│   │   ├── CartItemWidget.tsx
│   │   ├── CartTotal.tsx
│   │   └── EmptyCart.tsx
│   ├── product/
│   │   ├── CategoryContent.tsx
│   │   ├── OffersContent.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductSort.tsx
│   └── template/
│       ├── Cart.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Logo.tsx
│       ├── Page.tsx
│       └── Providers.tsx
└── data/
    ├── contexts/
    │   ├── CartContext.tsx
    │   ├── DealsContext.tsx
    │   └── SearchContext.tsx
    ├── hooks/
    │   ├── useCart.ts
    │   └── useTheme.ts
    ├── model/
    │   ├── CartItem.ts
    │   └── Product.ts
    └── services/
        └── ProductService.ts
```

## 🌐 Deploy

Este projeto é otimizado para a [Vercel](https://vercel.com).

### Configuração na Vercel

1. Suba o repositório para o GitHub
2. Importe o projeto na Vercel
3. Adicione a variável `REVALIDATE_SECRET` em **Settings → Environment Variables**
4. Faça o deploy

O `vercel.json` configura um cron job que revalida as ofertas todo dia à meia-noite (UTC):

```json
{
    "crons": [
        {
            "path": "/api/revalidate-deals?secret={{REVALIDATE_SECRET}}",
            "schedule": "0 0 * * *"
        }
    ]
}
```

## 🛠️ Tecnologias utilizadas

| Tecnologia    | Finalidade                              |
| ------------- | --------------------------------------- |
| Next.js 15    | Framework principal                     |
| TypeScript    | Tipagem estática                        |
| Tailwind CSS  | Estilização                             |
| DummyJSON API | Dados dos produtos                      |
| Google Fonts  | Tipografia (DM Sans + Playfair Display) |

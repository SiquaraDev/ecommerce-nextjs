# 📚 Siquara Store — Documentação

## Índice

1. [Visão geral da arquitetura](#visão-geral-da-arquitetura)
2. [Páginas](#páginas)
3. [Componentes](#componentes)
4. [Camada de dados](#camada-de-dados)
5. [Temas](#temas)
6. [Sistema de ofertas](#sistema-de-ofertas)
7. [Rotas de API](#rotas-de-api)

---

## Visão geral da arquitetura

O Siquara Store utiliza o App Router do Next.js 15 com um grupo de rotas `(store)` que engloba todas as páginas da loja. Esse grupo compartilha um layout responsável por buscar as ofertas no servidor e injetá-las na árvore de contextos via `Providers`.

```
Requisição
  └── app/layout.tsx              # Layout raiz — fontes, script do modo escuro
        └── (store)/layout.tsx    # Busca as ofertas, envolve com Providers
              └── page / cart / categories / offers
```

A busca de dados acontece no nível do servidor (Server Components assíncronos), enquanto a interatividade (carrinho, busca, tema) é gerenciada no cliente via React Context e hooks customizados.

---

## Páginas

### `/` — Home

**Arquivo:** `src/app/(store)/page.tsx`

Server Component que busca todos os produtos e renderiza um banner hero seguido do `ProductSort`. O banner usa fundo escuro fixo (`#1a1714`) para manter consistência nos modos claro e escuro.

### `/categories` — Categorias

**Arquivo:** `src/app/(store)/categories/page.tsx`

Server Component que busca todos os produtos e os passa para `CategoryContent`. Os produtos são agrupados por categoria no lado do cliente.

### `/offers` — Ofertas

**Arquivo:** `src/app/(store)/offers/page.tsx`

Server Component que busca todos os produtos e os passa para `OffersContent`. As ofertas ativas são determinadas cruzando com o `DealsContext`.

### `/cart` — Carrinho

**Arquivo:** `src/app/(store)/cart/page.tsx`

Client Component que lê o estado do carrinho via `CartContext` e renderiza `CartItemWidget` para cada item ao lado do `CartTotal`. Se o carrinho estiver vazio, renderiza `EmptyCart`. O botão de busca no header é ocultado nessa página.

### `not-found` — Página 404

**Arquivo:** `src/app/not-found.tsx`

Renderizada automaticamente pelo Next.js para qualquer rota não encontrada. Totalmente responsiva com links para a home e para categorias.

---

## Componentes

### Template

#### `Header.tsx`

Barra de navegação sticky no topo. Destaca a rota ativa usando `usePathname`. Contém:

- Logo
- Links de navegação desktop (Home, Categories, Offers) com estado ativo
- Botão de busca com toggle (oculto em `/cart`)
- Botão de alternar modo escuro (via `useTheme`)
- Botão do carrinho
- Menu hamburguer mobile com campo de busca

Estilo do link ativo (desktop): sublinhado laranja via `border-b-2 border-[var(--brand)]`
Estilo do link ativo (mobile): texto laranja com fundo sutil

#### `Footer.tsx`

Rodapé simples com texto de copyright centralizado. O ano é gerado dinamicamente com `new Date().getFullYear()`. Renderizado dentro do `Page.tsx` para aparecer em todas as páginas.

#### `Page.tsx`

Wrapper de layout usado por todas as páginas. Renderiza `Header`, um `<main>` centralizado e o `Footer`. Aceita a prop `hideHeader` para páginas que renderizam o próprio header (ex: `CategoryContent`).

#### `Logo.tsx`

Logo da marca com ícone SVG triangular e o nome "siquara.". Linka para `/`.

#### `Cart.tsx`

Botão do carrinho que leva para `/cart`. Exibe um badge com a quantidade de itens quando o carrinho não está vazio. O texto é ocultado em telas pequenas.

#### `Providers.tsx`

Compõe `DealsProvider`, `SearchProvider` e `CartProvider` em um único wrapper usado pelo `(store)/layout.tsx`.

---

### Produto

#### `ProductCard.tsx`

Card que exibe thumbnail, título, descrição e preço do produto. Se o produto estiver em oferta (presente no `DealsContext`), exibe o preço com desconto e o original riscado. O botão de adicionar ao carrinho aciona o `useCart`.

#### `ProductSort.tsx`

Renderiza um cabeçalho, contagem de produtos, um dropdown de ordenação customizado e uma grade responsiva de produtos. Suporta ordenação por A-Z, Z-A, menor e maior preço. Filtra resultados em tempo real com base na busca do `SearchContext`.

Opções de ordenação:
| Valor | Rótulo |
|---|---|
| `none` | Sort by |
| `az` | A-Z |
| `za` | Z-A |
| `asc` | Lowest price |
| `desc` | Highest price |

#### `CategoryContent.tsx`

Client Component que agrupa produtos por categoria e renderiza uma nav sticky secundária abaixo do header principal para navegar entre categorias. Usa `IntersectionObserver` para destacar a categoria ativa durante o scroll.

#### `OffersContent.tsx`

Renderiza um banner temático e passa as ofertas para `ProductSort` com o título "Daily deals".

---

### Carrinho

#### `CartItemWidget.tsx`

Exibe um item do carrinho com imagem, título, descrição, preço unitário e subtotal. Inclui controles de incremento e decremento. Aplica descontos de oferta se o produto estiver no `DealsContext`.

#### `CartTotal.tsx`

Sidebar de resumo do pedido mostrando subtotal, frete (sempre grátis) e total. Contém o botão de finalizar compra e o botão de esvaziar carrinho.

#### `EmptyCart.tsx`

Placeholder exibido quando o carrinho não tem itens, com link para explorar produtos.

---

## Camada de dados

### Serviços

#### `ProductService.ts`

Todas as chamadas à API [DummyJSON](https://dummyjson.com).

| Função            | Cache             | Descrição                                                                |
| ----------------- | ----------------- | ------------------------------------------------------------------------ |
| `fetchProducts`   | `revalidate: 60`  | Busca todos os produtos                                                  |
| `fetchCategories` | `revalidate: 60`  | Busca a lista de categorias                                              |
| `fetchDeals`      | `tags: ["deals"]` | Busca e seleciona deterministicamente 15–25 produtos como ofertas do dia |

A função `fetchDeals` usa um algoritmo pseudo-aleatório com seed baseado no dia atual para garantir que todos os usuários vejam as mesmas ofertas no mesmo dia:

```ts
const seed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const seededRandom = (i: number) => {
    const x = Math.sin(seed + i) * 10000;
    return x - Math.floor(x);
};
```

---

### Contextos

#### `CartContext`

Gerencia o estado do carrinho (array de `CartItem`). Expõe `items`, `itemsQuantity`, `add`, `remove`, `clear`.

#### `DealsContext`

Recebe `dealIds` (array de IDs de produtos) do servidor via `(store)/layout.tsx` e os expõe como um `Set<number>` para buscas em O(1).

#### `SearchContext`

Gerencia a string de busca global. Expõe `query` e `setQuery`. Consumido por `ProductSort` e `CategoryContent` para filtrar produtos em tempo real.

---

### Hooks

#### `useCart.ts`

Hook de conveniência que consome o `CartContext`.

#### `useTheme.ts`

Gerencia o modo escuro/claro. Na montagem, lê o `localStorage` (preferência do usuário) ou usa `prefers-color-scheme` como fallback. Ao alternar, adiciona/remove a classe `dark` no `<html>` e persiste a escolha no `localStorage`.

```ts
// Ordem de prioridade:
// 1. Valor no localStorage ('dark' | 'light')
// 2. prefers-color-scheme do sistema operacional
```

---

### Modelos

#### `Product.ts`

```ts
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
    category: string;
}
```

#### `CartItem.ts`

```ts
interface CartItem {
    product: Product;
    quantity: number;
}
```

---

## Temas

As variáveis CSS são definidas no `globals.css` para os modos claro e escuro.

| Variável           | Claro     | Escuro    |
| ------------------ | --------- | --------- |
| `--brand`          | `#e8572a` | `#e8572a` |
| `--surface`        | `#ffffff` | `#1c1917` |
| `--surface-2`      | `#f8f7f5` | `#231f1d` |
| `--surface-3`      | `#f0ede8` | `#2c2725` |
| `--border`         | `#e8e4de` | `#3a3330` |
| `--text-primary`   | `#1a1714` | `#f5f0eb` |
| `--text-secondary` | `#6b6560` | `#a89f99` |
| `--text-muted`     | `#a39e99` | `#6b6560` |
| `--success`        | `#2d7a4f` | `#4ade80` |

O modo escuro é ativado adicionando a classe `dark` ao `<html>`. Para evitar o flash de conteúdo sem estilo (FOUC), um script inline síncrono em `app/layout.tsx` é executado antes de qualquer renderização:

```html
<script>
    (function () {
        var saved = localStorage.getItem("theme");
        var prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        if (saved === "dark" || (!saved && prefersDark)) {
            document.documentElement.classList.add("dark");
        }
    })();
</script>
```

---

## Sistema de ofertas

As ofertas diárias são computadas no servidor em `fetchDeals` e injetadas no cliente via `DealsContext`. O sistema garante:

- Todos os usuários veem as **mesmas ofertas** no mesmo dia (seed determinístico)
- As ofertas mudam **todo dia à meia-noite UTC** via Vercel Cron
- Entre 15 e 25 produtos são selecionados por dia

### Fluxo de revalidação

```
Vercel Cron (00:00 UTC)
  → GET /api/revalidate-deals?secret=xxx
    → revalidateTag("deals")
      → Next.js invalida o cache de fetchDeals
        → Próxima requisição reconstrói as ofertas
```

---

## Rotas de API

### `GET /api/revalidate-deals`

**Arquivo:** `src/app/api/revalidate-deals/route.ts`

Protegida por um token secret comparado com a variável de ambiente `REVALIDATE_SECRET`. Retorna `401` se o secret estiver ausente ou incorreto. Ao ser chamada com sucesso, invalida a tag `"deals"` forçando a revalidação das ofertas na próxima requisição.

**Parâmetros de query:**
| Parâmetro | Tipo | Descrição |
|---|---|---|
| `secret` | `string` | Token de autenticação — deve corresponder ao `REVALIDATE_SECRET` |

**Respostas:**
| Status | Corpo | Descrição |
|---|---|---|
| `200` | `{ "revalidated": true }` | Revalidação executada com sucesso |
| `401` | `{ "error": "Unauthorized" }` | Secret inválido ou ausente |

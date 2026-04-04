import Product from "@/data/model/Product";

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch("https://dummyjson.com/products?limit=0", {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Falha ao buscar produtos");
    const data = await res.json();
    return data.products as Product[];
}

export async function fetchCategories(): Promise<string[]> {
    const res = await fetch("https://dummyjson.com/products/category-list", {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Falha ao buscar categorias");
    return res.json();
}

export async function fetchDeals(): Promise<Product[]> {
    const res = await fetch("https://dummyjson.com/products?limit=0", {
        next: { revalidate: 7200 }, // 2 horas
    });
    if (!res.ok) throw new Error("Falha ao buscar ofertas");
    const data = await res.json();
    const products: Product[] = data.products;

    // Seed baseada no bloco de 2h atual — mesma seed = mesmo resultado
    const seed = Math.floor(Date.now() / (1000 * 60 * 60 * 2));
    const seededRandom = (i: number) => {
        const x = Math.sin(seed + i) * 10000;
        return x - Math.floor(x);
    };

    const shuffled = [...products].sort(
        (_, __, i = Math.random()) => seededRandom(products.indexOf(_)) - 0.5,
    );
    const count = 15 + (seed % 11); // entre 15 e 25, consistente por bloco
    return shuffled.slice(0, count).map((p) => ({ ...p, onSale: true }));
}

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

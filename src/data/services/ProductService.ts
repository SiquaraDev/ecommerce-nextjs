import Product from "@/data/model/Product";

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch("https://dummyjson.com/products?limit=150", {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Falha ao buscar produtos");
    const data = await res.json();
    return data.products as Product[];
}

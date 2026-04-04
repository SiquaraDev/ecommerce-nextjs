"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Product from "../model/Product";
import CartItem from "../model/CartItem";

interface CartContextProps {
    items: CartItem[];
    itemsQuantity: number;
    add: (item: Product) => void;
    remove: (item: Product) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextProps>({} as any);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Carrega do localStorage na inicialização
    useEffect(() => {
        try {
            const saved = localStorage.getItem("cart");
            if (saved) setItems(JSON.parse(saved));
        } catch {}
        setLoaded(true);
    }, []);

    // Salva no localStorage sempre que mudar
    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items, loaded]);

    function add(product: Product) {
        const i = items.findIndex((i) => i.product.id === product.id);
        if (i === -1) {
            setItems([...items, { product, quantity: 1 }]);
        } else {
            const newItems = [...items];
            newItems[i].quantity++;
            setItems(newItems);
        }
    }

    function remove(item: Product) {
        const newItems = items
            .map((i) => {
                if (i.product.id === item.id) i.quantity--;
                return i;
            })
            .filter((i) => i.quantity > 0);
        setItems(newItems);
    }

    function clear() {
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                add,
                remove,
                clear,
                get itemsQuantity() {
                    return items.reduce((total, i) => total + i.quantity, 0);
                },
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;

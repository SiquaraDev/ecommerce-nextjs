"use client";
import { createContext, useContext, useState } from "react";
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

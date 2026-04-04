import { useEffect, useState } from "react";

export default function useTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const isDark = saved === "dark" || (!saved && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    function toggle() {
        setDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    }

    return { dark, toggle };
}

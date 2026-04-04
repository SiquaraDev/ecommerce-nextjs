import Cart from "./Cart";
import Logo from "./Logo";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)]">
            <div className="w-full max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                <Logo />

                <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                    <a
                        href="/"
                        className="hover:text-[var(--text-primary)] transition-colors"
                    >
                        Início
                    </a>
                    <a
                        href="#"
                        className="hover:text-[var(--text-primary)] transition-colors"
                    >
                        Categorias
                    </a>
                    <a
                        href="#"
                        className="hover:text-[var(--text-primary)] transition-colors"
                    >
                        Ofertas
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        Buscar
                    </button>
                    <Cart />
                </div>
            </div>
        </header>
    );
}

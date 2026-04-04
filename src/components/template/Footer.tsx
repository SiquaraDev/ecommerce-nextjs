export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex items-center justify-center">
                <p className="text-sm text-[var(--text-muted)]">
                    © {new Date().getFullYear()} SiquaraDev. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}

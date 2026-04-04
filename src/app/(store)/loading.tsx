export default function Loading() {
    return (
        <div className="flex gap-6 flex-wrap mt-10 px-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="w-56 h-72 rounded-2xl bg-[var(--surface)] animate-pulse"
                />
            ))}
        </div>
    );
}

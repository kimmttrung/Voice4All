export default function Placeholder({ title, description }) {
    return (
        <section className="container mx-auto py-16">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
                {description && (
                    <p className="mt-4 text-muted-foreground">{description}</p>
                )}
                <p className="mt-6 text-sm text-muted-foreground">
                    This page is a placeholder. Ask to generate its full design and functionality.
                </p>
            </div>
        </section>
    );
}

import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { useI18n } from "./lib/i18n";
import { cn } from "./lib/utils";

function useTheme() {
    const [theme, setTheme] = useState(() =>
        localStorage.getItem("v4a.theme") || "light",
    );
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("v4a.theme", theme);
    }, [theme]);
    return { theme, setTheme };
}

function LanguageSwitcher() {
    const { locale, setLocale } = useI18n();
    return (
        <div className="flex items-center gap-1 rounded-full bg-accent px-1 py-1 text-xs">
            {["vi", "en", "jp"].map((l) => (
                <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={cn(
                        "rounded-full px-2 py-1",
                        locale === l ? "bg-primary text-primary-foreground" : "text-foreground/70",
                    )}
                    aria-pressed={locale === l}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default function Header() {
    const { t } = useI18n();
    const { theme, setTheme } = useTheme();
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-violet-600 grid place-items-center text-white font-extrabold">V</div>
                    <span className="text-lg font-extrabold tracking-tight">Voice4All</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <NavItem to="/" label={t("home")} active={pathname === "/"} />
                    <NavItem to="/features" label={t("features")} active={pathname.startsWith("/features")} />
                    <NavItem to="/about" label={t("about")} active={pathname.startsWith("/about")} />
                </nav>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <Button
                        variant="ghost"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="hidden sm:inline-flex"
                    >
                        {theme === "dark" ? "🌙" : "☀️"}
                    </Button>
                    <div className="hidden sm:flex items-center gap-2">
                        <Link to="/login" className="text-sm font-medium hover:underline">
                            {t("login")}
                        </Link>
                        <Link to="/signup">
                            <Button size="sm" className="rounded-full">{t("signup")}</Button>
                        </Link>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}

function NavItem({ to, label, active }) {
    return (
        <NavLink
            to={to}
            className={cn(
                "text-foreground/80 hover:text-foreground transition-colors",
                active && "text-foreground font-semibold",
            )}
        >
            {label}
        </NavLink>
    );
}

function MobileMenu() {
    const { t } = useI18n();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, []);
    return (
        <div className="md:hidden">
            <Button size="icon" variant="outline" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((v) => !v)}>
                ☰
            </Button>
            {open && (
                <div id="mnav" className="absolute right-2 mt-2 w-56 rounded-lg border bg-background p-2 shadow-xl">
                    <div className="flex flex-col gap-1">
                        <Link className="px-3 py-2 rounded hover:bg-accent" to="/" onClick={() => setOpen(false)}>{t("home")}</Link>
                        <Link className="px-3 py-2 rounded hover:bg-accent" to="/features" onClick={() => setOpen(false)}>{t("features")}</Link>
                        <Link className="px-3 py-2 rounded hover:bg-accent" to="/about" onClick={() => setOpen(false)}>{t("about")}</Link>
                        <div className="h-px bg-border my-1" />
                        <Link className="px-3 py-2 rounded hover:bg-accent" to="/login" onClick={() => setOpen(false)}>{t("login")}</Link>
                        <Link className="px-3 py-2 rounded bg-primary text-primary-foreground" to="/signup" onClick={() => setOpen(false)}>{t("signup")}</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

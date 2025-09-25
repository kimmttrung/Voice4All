import { Link } from "react-router-dom";
import { useI18n } from "./lib/i18n";
import { Facebook, Youtube, Github, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const { t } = useI18n();
    return (
        <footer className="border-t mt-16" id="contact">
            <div className="container mx-auto py-10 grid gap-6 md:grid-cols-3 text-sm">
                {/* Logo + intro */}
                <div>
                    <div className="flex items-center gap-2 font-extrabold text-lg">
                        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-600 to-violet-600 grid place-items-center text-white">V</div>
                        Voice4All
                    </div>
                    <p className="mt-3 text-muted-foreground max-w-sm">
                        {"Speak, sign, or type. Instant translation to voice, text, or sign avatar."}
                    </p>
                    <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            My Đình, Cầu Giấy, Hà Nội
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <a href="mailto:voice4all@gmail.com" className="hover:underline">
                                voice4all@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="grid gap-2">
                    <Link className="hover:underline" to="/about">{t("footer_about")}</Link>
                    <a className="hover:underline" href="#contact">{t("footer_contact")}</a>
                    <a className="hover:underline" href="#privacy">{t("footer_privacy")}</a>
                    <a className="hover:underline" href="#terms">{t("footer_terms")}</a>
                </nav>

                {/* Social + copyright */}
                <div className="flex flex-col items-start md:items-end gap-3 text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Facebook className="h-5 w-5" /></a>
                        <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
                        <a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
                    </div>
                    <div>© {new Date().getFullYear()} Voice4All. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}
